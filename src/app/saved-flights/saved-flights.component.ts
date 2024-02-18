import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Flight } from '../models/flight';
import { Auth } from '@angular/fire/auth';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorPopupComponent } from '../error-popup/error-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { SplashComponent } from '../splash/splash.component';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'saved-flights',
  standalone: true,
  imports: [
    CommonModule,
    SplashComponent,
    HttpClientModule,
    MatTableModule, 
    MatSortModule,],
  templateUrl: './saved-flights.component.html',
  styleUrl: './saved-flights.component.scss'
})
export class SavedFlightsComponent implements OnChanges {
  splashActive = false;

  @Input() reload: boolean = false;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  fullFlightList: [] = [];
  dataSource!: MatTableDataSource<Flight>;

  displayedColumns: string[] = [
    'airline',
    'flightNumber',
    'arrivalDate',
    'arrivalTime',
    'numOfGuests',
    'comments'
  ];

  constructor(private afAuth: Auth, private http: HttpClient, private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reload']) {
      this.splashActive = true;
      this.getSavedFlights();
    }
  }
  
  getSavedFlights() {
    this.http.get<any>('https://flight-tracker-demo-468c7-default-rtdb.firebaseio.com/flights.json').subscribe(
      data => {
        this.fullFlightList = data;

        // Convert into array
        let tempData: Flight[] = [];
        for (let key in this.fullFlightList) {
          tempData.push(this.fullFlightList[key]);
        }

        // Filter by current user
        this.filterByCurrentUser(tempData);
      },
      error => {
        this.displayError(error);
      }
    );
  }

  filterByCurrentUser(data: Flight[]) {
    data = data.filter(flight => flight.user === this.afAuth.currentUser?.email);

    this.dataSource = new MatTableDataSource(data);
    // Sort data after table source is created
    this.dataSource.sort = this.sort;

    // Clear loading spinner
    this.splashActive = false;
  }

  displayDate(fullDate: string) {
    return fullDate.split('T')[0];
  }

  displayError(error: any) {
    // Clear loading spinner
    this.splashActive = false;

    // Display error
    this.dialog.open(ErrorPopupComponent, { width: '500px', data: { message: error } });
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
