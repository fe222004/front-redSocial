import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navar',
  templateUrl: './navar.component.html',
  styleUrl: './navar.component.scss',
})
export class NavarComponent {
  private readonly authService: AuthService = inject(AuthService);

  constructor(private router: Router) {
  }

  navigateToProfile() {
    const userId = this.authService.getUserId(); // Get user ID from AuthService
    console.log(userId);
    if (userId) {
      this.router.navigate(['/pages/user/profile', userId]); // Pass user ID as a route parameter
    } else {
    }
  }
}
