import { Component } from '@angular/core';
import { routes } from '../../../app.routes';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule, JsonPipe, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  standalone:true
})
export class SidebarComponent {
 menu = routes.filter(r => r.data && r.data['isModule']);

 isOpen = false; // for mobile menu toggle
 constructor(){
  console.log(this.menu)
 }
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
