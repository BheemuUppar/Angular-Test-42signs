import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isLoginPage: boolean = false;
  constructor(private authService:AuthService, private router:Router){
   this.router.events.subscribe(event => {
        if(this.router.url.endsWith('/login')){
            this.isLoginPage = true
        }else{
          this.isLoginPage = false
        }
    });
  }
  sidebarOpen = true;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout(){
    this.authService.logout()
  }
}
