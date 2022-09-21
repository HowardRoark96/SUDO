import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  styleUrls: ['page-not-found.component.scss'],
  templateUrl: 'page-not-found.component.html'
})
export class PageNotFoundComponent {
  constructor(
    private router: Router
  ) { }

  onBtnClick() {
    this.router.navigate(['main']);
  }
}
