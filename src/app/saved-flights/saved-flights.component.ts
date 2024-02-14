import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Flight } from '../models/flight';
import { Auth } from '@angular/fire/auth';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'saved-flights',
  standalone: true,
  imports: [MatTableModule, HttpClientModule],
  templateUrl: './saved-flights.component.html',
  styleUrl: './saved-flights.component.scss'
})
export class SavedFlightsComponent {

  fullFlightList: [] = [];
  dataSource: Flight[] = [];

  displayedColumns: string[] = [
    'airline',
    'flightNumber',
    'arrivalDate',
    'arrivalTime',
    'numOfGuests',
    'comments'
  ];

  constructor(private afAuth: Auth, private http: HttpClient ) { }

  ngOnInit() {
    this.getSavedFlights();
  }
  
  getSavedFlights() {
    this.http.get<any>('https://flight-tracker-demo-468c7-default-rtdb.firebaseio.com/flights.json').subscribe(
      data => {
        this.fullFlightList = data;

        // Convert into array
        this.dataSource = [];
        for (let key in this.fullFlightList) {
          this.dataSource.push(this.fullFlightList[key]);
        }

        // Filter by current user
        this.filterByCurrentUser();
      }
    );
  }

  filterByCurrentUser() {
    this.dataSource = this.dataSource.filter(flight => flight.user === this.afAuth.currentUser?.email);
  }

  displayDate(fullDate: string) {
    return fullDate.split('T')[0];
  }
}
