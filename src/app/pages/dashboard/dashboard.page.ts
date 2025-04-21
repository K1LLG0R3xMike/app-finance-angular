import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})

export class DashboardPage {
  data = [
    { day: '23', value: 30000 },
    { day: '24', value: 31000 },
    { day: '25', value: 33000 },
    { day: '26', value: 35000 },
    { day: '27', value: 37000 },
    { day: '28', value: 39000 },
    { day: '29', value: 42000 },
    { day: '30', value: 47000 }
  ];

  constructor(private router: Router) {}

  async handleLogout() {
    try {
      await signOut(getAuth());
      console.log('User logged out successfully');
      this.router.navigateByUrl('/signin');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out');
    }
  }
}
