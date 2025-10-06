import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './core/gaurds/auth.guard';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard]
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path:'todo',
        loadComponent: ()=>import('./modules/todo/todo.component').then(c => c.TodoComponent),
        canActivate:[authGuard],
        data:{
            isModule:true,
             moduleName:'Todo Application'
        },
        
     
    },
    {
        path:'weather',
        loadComponent: ()=>import('./modules/weather/weather.component').then(c => c.WeatherComponent),
        canActivate:[authGuard],
        data:{
            isModule:true,
            moduleName:'Weather Application'
        },
    },
    {
        path:'mapRouting',
        loadComponent: ()=>import('./modules/map-routing/map-routing.component').then(c => c.MapRoutingComponent),
        canActivate:[authGuard],
        data:{
            isModule:true,
             moduleName:'Map Routing'
        },
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
