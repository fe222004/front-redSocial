import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../components/auth/service/auth.service';
import { LanguageConstants } from '../../../constants/language-constants';
import { TranslationService } from '../../../services/translation.service';

@Component({
  selector: 'app-navar',
  templateUrl: './navar.component.html',
  styleUrl: './navar.component.scss',
})
export class NavarComponent {
  private readonly authService: AuthService = inject(AuthService);

  showMenuI: boolean = false;
  currentLanguage: 'en' | 'es' = 'es';
  languages = LanguageConstants;
  userName: string | null = '';
  userLastName: string | null = '';
  avatar: String | null = '';
  showMenu: boolean = false;

  constructor(private router: Router, private translationService: TranslationService,) {
  }

  navigateToProfile() {
    const userId = this.authService.getUserId(); // Get user ID from AuthService
    console.log(userId);
    if (userId) {
      this.router.navigate(['/pages/user/profile', userId]); // Pass user ID as a route parameter
    } else {
    }
  }

  
  changeLanguage(language: 'en' | 'es', event: Event) {
    event.preventDefault();
    this.translationService.setLanguage(language);
    this.currentLanguage = language;
    this.closeMenu();
  }

  toggleMenuA(): void {
    this.showMenu = !this.showMenu;
  }

  toggleMenuI(): void {
    this.showMenuI = !this.showMenuI;
  }

  closeMenu(): void {
    this.showMenuI = false;
  }

  getFlagUrl(language: 'en' | 'es'): string {
    return LanguageConstants[language];
  }
}
