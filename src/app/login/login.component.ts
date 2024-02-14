import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

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

  constructor(private afAuth: Auth, private router: Router) { }

  /**
   * Logs in an user account associated with the specified email address and password.
   * 
   * Redirects to the dashboard after successful login.
   *
   */
  async login() {
    try {
      const userCredential = await signInWithEmailAndPassword(this.afAuth, this.email, this.password);
      console.log('User successfully logged in:', userCredential.user);
      this.router.navigate(['/dashboard']); // Navigate to dashboard after successful login
    } catch (error) {
      console.error('Error logging in:', error);
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
      const userCredential = await createUserWithEmailAndPassword(this.afAuth, this.email, this.password);
      console.log('User successfully created and logged in:', userCredential);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error creating account:', error);
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

}
