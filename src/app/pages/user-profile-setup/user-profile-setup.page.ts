import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { auth, db } from '../../../environments/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-user-profile-setup',
  templateUrl: './user-profile-setup.page.html',
  styleUrls: ['./user-profile-setup.page.scss'],
  standalone: false,
})
export class UserProfileSetupPage {
  fullName = '';
  phoneNumber = '';
  country = '';
  monthlyIncome = '';
  birthDate = '';
  gender = '';

  constructor(private router: Router) {}

  async handleSaveProfile() {
    const user = auth.currentUser;
    if (!user) {
      alert('No user logged in');
      return;
    }

    const userProfile = {
      fullName: this.fullName,
      phoneNumber: this.phoneNumber,
      country: this.country,
      monthlyIncome: this.monthlyIncome,
      birthDate: this.birthDate,
      gender: this.gender,
      photoURL: user.photoURL || 'default-profile.png',
    };

    try {
      await setDoc(doc(db, 'users', user.uid), userProfile);
      console.log('Profile saved successfully:', userProfile);
      alert('Profile saved successfully!');
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile');
    }
  }
}
