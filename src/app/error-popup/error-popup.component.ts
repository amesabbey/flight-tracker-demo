import { Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-popup',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './error-popup.component.html',
  styleUrl: './error-popup.component.scss'
})
export class ErrorPopupComponent {

  message: string;

  constructor(public dialogRef: MatDialogRef<ErrorPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: { message: string },) {
    this.message = data.message;
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
