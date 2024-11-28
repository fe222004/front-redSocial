import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { TranslationService } from '../../../services/translation.service';
import { LanguageConstants } from '../../../constants/language-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`:host ::ng-deep .pi-eye, :host ::ng-deep .pi-eye-slash { transform: scale(1.6); margin-right: 1rem; color: var(--primary-color) !important; }`]
})
export class LoginComponent {
  loginForm: FormGroup;
  showMenuI: boolean = false;
  currentLanguage: 'en' | 'es' = 'es';
  languages = LanguageConstants;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private translationService: TranslationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  get email(): AbstractControl {
    return this.loginForm.controls['email'];
  }

  get password(): AbstractControl {
    return this.loginForm.controls['password'];
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        response => {
          console.log('Login successful:', response);
          this.router.navigate(['/pages/dashboard']);
        },
        error => {
          console.error('Login failed:', error);
          alert('Login failed');
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }

  navigate() {
    this.router.navigate(['/pages/register']);
  }

  toggleMenuI(): void {
    this.showMenuI = !this.showMenuI;
  }

  closeMenu(): void {
    this.showMenuI = false;
  }

  changeLanguage(language: 'en' | 'es', event: Event) {
    event.preventDefault();
    this.translationService.setLanguage(language);
    this.currentLanguage = language;
    this.closeMenu();
  }

  getFlagUrl(language: 'en' | 'es'): string {
    return LanguageConstants[language];
  }
}
