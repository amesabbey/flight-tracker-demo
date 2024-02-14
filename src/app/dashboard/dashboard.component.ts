import { Component } from '@angular/core';
import { FlightFormComponent } from "../flight-form/flight-form.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [FlightFormComponent]
})
export class DashboardComponent {

}
