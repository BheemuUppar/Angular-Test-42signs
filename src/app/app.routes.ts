import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './core/gaurds/auth.guard';

export const routes: Routes = [
 {
    path:'home',
    component:HomeComponent,
    canActivate:[authGuard]
 },
 {
    path:"login",
    component:LoginComponent
 },
 {
 path:'**',
 redirectTo:'home'
 }
];
