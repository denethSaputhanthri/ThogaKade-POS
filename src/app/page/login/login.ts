import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username: string = '';
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  onSubmit() {
    console.log('Form submitted:', {
      username: this.username,
      email: this.email,
      password: this.password
    });
    // Add your authentication logic here
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  signInWithGoogle() {
    console.log('Sign in with Google');
    // Add Google authentication logic
  }

  signInWithApple() {
    console.log('Sign in with Apple');
    // Add Apple authentication logic
  }
}
