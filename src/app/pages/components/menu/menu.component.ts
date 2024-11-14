import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})


export class MenuComponent{

  private allSideMenu!: NodeListOf<HTMLAnchorElement>;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a') as NodeListOf<HTMLAnchorElement>;
    
    this.initializeMenu();
  }

  private initializeMenu(): void {
    this.allSideMenu.forEach(item => {
      const li = item.parentElement as HTMLLIElement;

      item.addEventListener('click', () => {
        this.allSideMenu.forEach(i => {
          const parent = i.parentElement as HTMLLIElement;
          parent.classList.remove('active');
        });
        li.classList.add('active');
      });
    });
  }



  logout(): void {
    this.authService.logout(); // Llama al método logout del AuthService para eliminar el token y otros datos de sesión
    this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión u otra página según tu aplicación
  }
}
