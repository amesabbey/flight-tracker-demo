import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';
import { Flight } from '../models/flight';

@Component({
  selector: 'flight-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule,
    HttpClientModule,
  ],
  templateUrl: './flight-form.component.html',
  styleUrl: './flight-form.component.scss'
})
export class FlightFormComponent {

  airlineControl = new FormControl();
  arrivalDateControl = new FormControl();
  arrivalTimeControl = new FormControl();
  flightNumberControl = new FormControl();
  numOfGuestsControl = new FormControl();
  commentsControl = new FormControl();

  formGroup = this.formBuilder.group({
    airlineControl: this.airlineControl,
    arrivalDateControl: this.arrivalDateControl,
    arrivalTimeControl: this.arrivalTimeControl,
    flightNumberControl: this.flightNumberControl,
    numOfGuestsControl: this.numOfGuestsControl,
    commentsControl: this.commentsControl,
  });

  constructor(private formBuilder: FormBuilder, private afAuth: Auth, private http: HttpClient ) { }
  
  clearForm() {
    this.airlineControl.reset();
    this.arrivalDateControl.reset();
    this.arrivalTimeControl.reset();
    this.flightNumberControl.reset();
    this.numOfGuestsControl.reset();
    this.commentsControl.reset();
  }

  createFlightObject() {
    const email = this.afAuth.currentUser?.email;

    if (!email) {
      console.error('User is not logged in');
      return;
    }

    const flight: Flight = {
      user: email,
      airline: this.airlineControl.value,
      arrivalDate: this.arrivalDateControl.value,
      arrivalTime: this.arrivalTimeControl.value,
      flightNumber: this.flightNumberControl.value,
      numOfGuests: this.numOfGuestsControl.value,
      comments: this.commentsControl.value
    };
    
    this.addFlightToDatabase(flight);
  }

  addFlightToDatabase(flight: Flight) {
    this.http.post('https://flight-tracker-demo-468c7-default-rtdb.firebaseio.com/flights.json', flight).subscribe(
      responseData => {
        console.log(responseData);
      }
    );
  }

}
