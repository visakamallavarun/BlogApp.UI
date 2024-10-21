import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/features/auth/models/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user?: User;

  constructor(private authService: AuthService,
    private router: Router) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          console.log('Navigated to:', event.url);
        }
      });
  }

  ngOnInit(): void {
    this.authService.user()
    .subscribe({
      next: (response) => {
        this.user = response;
      }
    });

    this.user = this.authService.getUser();

  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}
