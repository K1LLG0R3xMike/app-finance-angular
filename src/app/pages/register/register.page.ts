import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../environments/firebaseConfig';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,

})
export class RegisterPage {
  email = '';
  password = '';
  confirmPassword = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(private router: Router) {}

  async handleRegister() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
      console.log('User registered:', userCredential);
      alert('Registration successful!');
      this.router.navigate(['/user-profile-setup']);
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed! Please try again.');
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
