// Component should create successfully.
// Should toggle sidebar when toggleSidebar() is called.
// Should call authService.logout() when logout() is called.
// Should set isLoginPage true when router URL ends with /login.
// Should set isLoginPage false for other routes;

import { ComponentFixture, TestBed } from "@angular/core/testing"
import { NavigationEnd, provideRouter, Router, RouterEvent, RouterLink, RouterOutlet } from "@angular/router"
import { SidebarComponent } from "./shared/components/sidebar/sidebar.component"
import { AuthService } from "./core/services/auth.service"
import { Subject } from "rxjs"
import { AppComponent } from "./app.component"
import { Component, NO_ERRORS_SCHEMA } from "@angular/core";

describe("App component" ,  ()=>{


  let component:AppComponent;
  let fixture : ComponentFixture<AppComponent>;
  let authSevriceMock :jasmine.SpyObj<AuthService>
  let router :Router
beforeEach(async ()=>{
  // setup for testing
 // declare mocks for services
let routerEvents$ = new Subject<RouterEvent>();

  authSevriceMock  = jasmine.createSpyObj('AuthService', ['logout'])
//  let routerServiceMock = jasmine.createSpyObj('Router', [], {url:'/login', events:routerEvents$.asObservable()})

 await TestBed.configureTestingModule({
  imports:[RouterOutlet, SidebarComponent, RouterLink,],
  providers:[
    {provide:AuthService, useValue: authSevriceMock},
    // {provide:Router, useValue: routerServiceMock},
    provideRouter([])
    
  ],

  
  schemas: [NO_ERRORS_SCHEMA]
 }).compileComponents();
 /**
  * Fixture is used  for interacting with a component and its corresponding rendered element within a testing environment. 
  * It acts as a bridge between your test code and the component you are testing, 
  * allowing you to examine its state, interact with its template, 
  * and trigger lifecycle hooks and change detection.
  */
  fixture = TestBed.createComponent(AppComponent);
  component = fixture.componentInstance
  router   =  TestBed.inject(Router)
})
it("Component Should create successfully" , ()=>{
   expect(component).toBeTruthy()
});

it("Should set sidebaropen  property  to true when its false" , ()=>{
component.sidebarOpen = false;
component.toggleSidebar();
fixture.detectChanges();
expect(component.sidebarOpen).toBeTrue();

})
it("Should set sidebaropen  property  to false when its true" , ()=>{
component.sidebarOpen = true;
component.toggleSidebar();
fixture.detectChanges();
expect(component.sidebarOpen).toBeFalse();

});

it("should set isLoginPage = true when router url ends with /login" , ()=>{
//spy on router properties
spyOnProperty(router, 'url').and.returnValue('/login');
(router.events as Subject<any>).next(new NavigationEnd(1, '/login','/login'));
fixture.detectChanges();
expect(component.isLoginPage).toBe(true);

})
it("should set isLoginPage = false when router url ends with other than /home" , ()=>{
//spy on router properties
spyOnProperty(router, 'url').and.returnValue('/home');
(router.events as Subject<any>).next(new NavigationEnd(1, '/home','/home'));
fixture.detectChanges();
expect(component.isLoginPage).toBe(false);

});

it("Should call authService.logout() when logout() is called" , ()=>{
component.logout()
expect(authSevriceMock.logout).toHaveBeenCalled()
})

it("should hide sidebar on login page" , ()=>{
   component.isLoginPage = true;
   fixture.detectChanges();
  let sidebarEle = fixture.nativeElement.querySelector('app-sidebar');
expect(sidebarEle).toBe(null)

})

})