import { Component } from '@angular/core';
import { AuthService } from '../../auth-module/shared-module/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  styleUrls: ['main.component.scss'],
  templateUrl: 'main.component.html'
})
export class MainComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  onLogoutClick() {
    this.authService.logout().then(() => this.router.navigate(['login']));
  }

  onGameClick() {
    this.router.navigate(['game']);
  }

  onStatisticClick() {
    this.router.navigate(['statistic']);
  }

  onMainClick() {
    this.router.navigate(['main']);
  }
}
