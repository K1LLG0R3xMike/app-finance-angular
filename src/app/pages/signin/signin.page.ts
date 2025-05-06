import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword, signInWithPopup,signInWithRedirect , GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../../../environments/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  standalone: false,

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
        this.router.navigate(['/tabs/tab1']);
      } else {
        this.router.navigate(['/user-profile-setup']);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed! Please check your credentials.');
    }
  }

  // async handleGoogleLogin() {
  //   const provider = new GoogleAuthProvider();
  //   try {
  //     const result = await signInWithRedirect(auth, provider);
  //     const user = result.user;
  //
  //     const userDocRef = doc(db, 'users', user.uid);
  //     const userDoc = await getDoc(userDocRef);
  //
  //     if (userDoc.exists()) {
  //       this.router.navigate(['/tabs/tab1']);
  //     } else {
  //       const userProfile = {
  //         fullName: user.displayName || '',
  //         email: user.email || '',
  //         photoURL: user.photoURL || 'default-profile.png',
  //       };
  //
  //       await setDoc(userDocRef, userProfile);
  //       this.router.navigate(['/user-profile-setup']);
  //     }
  //   } catch (error) {
  //     console.error('Error with Google login:', error);
  //     alert('Google login failed! Try again.');
  //   }
  // }
  async handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    try {
   
      await signInWithRedirect(auth, provider); // Esto redirige, la ejecución se corta aquí
    } catch (error) {
      console.error('Error with Google login:', error);
      alert('Google login failed! Try again.');
    }
  }
}
