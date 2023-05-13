import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  username = localStorage.getItem('user');

  constructor(
    private breakpointObserver: BreakpointObserver,
    public router: Router
  ) {}

  onHomeClick(): void {
    this.router.navigate(['movies']);
  }

  onProfileClick(): void {
    this.router.navigate(['profile']);
  }

  onLogoutClick(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}