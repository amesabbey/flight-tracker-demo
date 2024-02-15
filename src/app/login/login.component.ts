import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorPopupComponent } from '../error-popup/error-popup.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginView: boolean = true;
  createAccountView: boolean = true;

  email: string = '';
  password: string = '';

  constructor(private afAuth: Auth, private router: Router, public dialog: MatDialog) { }

  /**
   * Logs in an user account associated with the specified email address and password.
   * 
   * Redirects to the dashboard after successful login.
   *
   */
  async login() {
    try {
      await signInWithEmailAndPassword(this.afAuth, this.email, this.password);
      this.router.navigate(['/dashboard']); // Navigate to dashboard after successful login
    } catch (error) {
      this.displayError(error);
    }
  }

  /**
   * Creates a new user account associated with the specified email address and password.
   *
   * On successful creation of the user account, this user will also be signed in to your application.
   *
   * User account creation can fail if the account already exists or the password is invalid.
   *
   * Note: The email address acts as a unique identifier for the user and enables an email-based
   * password reset. This function will create a new user account and set the initial user password.
   *
   */
  async createUser() {
    try {
      await createUserWithEmailAndPassword(this.afAuth, this.email, this.password);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.displayError(error);
    }
  }

  /** 
   * Clears and resets the forms 
   */
  clearForm() {
    this.email = '';
    this.password = '';
    this.loginView = true;
    this.createAccountView = true;
  }

  displayError(error: any) {
    this.dialog.open(ErrorPopupComponent, { width: '500px', data: { message: error } });
  }

}
