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
import { ErrorPopupComponent } from '../error-popup/error-popup.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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

  constructor(
    private formBuilder: FormBuilder, 
    private afAuth: Auth, 
    private http: HttpClient, 
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FlightFormComponent> ) { }
  
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
      this.displayError('User is not logged in');
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
    this.sendFlightInfoPayload();
  }

  addFlightToDatabase(flight: Flight) {
    this.http.post('https://flight-tracker-demo-468c7-default-rtdb.firebaseio.com/flights.json', flight).subscribe(
      responseData => {
        console.log(responseData);
      },
      error => {
        this.displayError(error);
      }      
    );
  }

  sendFlightInfoPayload() {
    const flightInfo: FlightInfoPayload = {
      airline: this.airlineControl.value,
      arrivalDate: this.arrivalDateControl.value,
      arrivalTime: this.arrivalTimeControl.value,
      flightNumber: this.flightNumberControl.value,
      numOfGuests: this.numOfGuestsControl.value,
      comments: this.commentsControl.value
    };

    this.http.post('https://us-central1-crm-sdk.cloudfunctions.net/flightInfoChallenge', flightInfo).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  displayError(error: any) {
    this.dialog.open(ErrorPopupComponent, { width: '500px', data: { message: error } });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}

export interface FlightInfoPayload {
  airline: string;
  arrivalDate: Date;
  arrivalTime: string;
  flightNumber: string;
  numOfGuests: number;
  comments?: string;
}