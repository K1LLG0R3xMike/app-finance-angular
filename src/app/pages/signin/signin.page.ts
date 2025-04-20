import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../../../environments/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SignInPage {
  email = '';
  password = '';

  constructor(private router: Router) {}

  async handleLogin() {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/user-profile-setup']);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed! Please check your credentials.');
    }
  }

  async handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        this.router.navigate(['/dashboard']);
      } else {
        const userProfile = {
          fullName: user.displayName || '',
          email: user.email || '',
          photoURL: user.photoURL || 'default-profile.png',
        };

        await setDoc(userDocRef, userProfile);
        this.router.navigate(['/user-profile-setup']);
      }
    } catch (error) {
      console.error('Error with Google login:', error);
      alert('Google login failed! Try again.');
    }
  }
}
