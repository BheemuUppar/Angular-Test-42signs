import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  username = 'User'; 

  constructor(private router: Router) {}

  navigateTo(module: string) {
    this.router.navigate([module]);
  }
}
