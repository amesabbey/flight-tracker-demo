import { Component } from '@angular/core';
import { FlightFormComponent } from "../flight-form/flight-form.component";
import { SavedFlightsComponent } from "../saved-flights/saved-flights.component";
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SplashComponent } from '../splash/splash.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [
        FlightFormComponent, 
        SavedFlightsComponent, 
        MatButtonModule,
        MatIconModule
    ]
})
export class DashboardComponent {
    refresh: boolean = false;

    constructor(private afAuth: Auth, private router: Router, private _snackBar: MatSnackBar, public dialog: MatDialog) {}

    openAddFlightDialog() {
        const dialogRef = this.dialog.open(FlightFormComponent, { width: '600px', height: '700px' });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._snackBar.open('Flight successfully added!', 'Close', {duration: 5000, verticalPosition: 'top'});
                this.refresh = !this.refresh;
            }
        });
    }

    logout() {
        this.afAuth.signOut();
        this.router.navigate(['/login']);
    }

}
