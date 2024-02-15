import { Component } from '@angular/core';
import { FlightFormComponent } from "../flight-form/flight-form.component";
import { SavedFlightsComponent } from "../saved-flights/saved-flights.component";
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [
        FlightFormComponent, 
        SavedFlightsComponent, 
        MatButtonModule
    ]
})
export class DashboardComponent {

    constructor(private afAuth: Auth, private router: Router, public dialog: MatDialog) {}

    openAddFlightDialog() {
        const dialogRef = this.dialog.open(FlightFormComponent, { width: '600px', height: '600px' });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    logout() {
        this.afAuth.signOut();
        this.router.navigate(['/login']);
    }

}
