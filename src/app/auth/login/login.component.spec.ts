/**
 * 
 *  initialy form should be invalid
 *  username validation 
 *  passwoord validation 
 *  form validation
 *  onSubmit method should call authService login method
 * 
 *  on successful login, token should be stored in localStorage
 *  on successful login, should navigate to home
 *  on failed login, snackbarService error method should be called
 *  
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { Router } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
 let component  : LoginComponent;
 let fixture : ComponentFixture<LoginComponent>;

let authServicemock :any
let snackbarServiceMock : any
let routereMock : any
 beforeEach(async ()=>{
   authServicemock = {
    'login':jasmine.createSpy('login')
  };
  snackbarServiceMock  = {'success' : jasmine.createSpy('success'), 'error' : jasmine.createSpy('error')}
  routereMock  =  {'navigateByUrl':jasmine.createSpy('navigateByUrl')}
   await TestBed.configureTestingModule({
    imports:[CommonModule, ReactiveFormsModule],
    providers:[{
       provide :AuthService, useValue: authServicemock
    }, 
     FormBuilder,
    {provide:SnackbarService , useValue:snackbarServiceMock},
     {provide:Router , useValue:routereMock},
      provideHttpClient()]
   }).compileComponents();

   fixture = TestBed.createComponent(LoginComponent);
   component  = fixture.componentInstance ;
   

 });
 
      it("Should create the LoginComponent", ()=>{
       expect(component).toBeTruthy()
      });
      
      it("intially form should be invalid", ()=>{
        expect(component.loginForm.valid).toBeFalse()
      })

      it("username validation" , ()=>{
          component.loginForm.setValue({"username":'', "password":''})
          expect(component.loginForm.get('username')?.invalid).toBe(true);
          component.loginForm.setValue({"username":'admin', "password":''})
          expect(component.loginForm.get('username')?.invalid).toBe(false);
      })
      it("password validation" , ()=>{
          component.loginForm.setValue({"password":'', "username":'admin'})
          expect(component.loginForm.get('password')?.invalid).toBe(true);
          component.loginForm.setValue({"password":'admin', "username":'admin'})
          expect(component.loginForm.get('password')?.invalid).toBe(true);
          
          component.loginForm.setValue({"password":'admin123', "username":'admin'})
          expect(component.loginForm.get('password')?.valid).toBe(true);
      })

      it("Should call AUthSevrice login() on Submit", ()=>{
        component.loginForm.setValue({username:"admin", password:"admin@123"});
        (authServicemock.login as any).and.returnValue(of({token:"dummy token"}));
        component.onSubmit();
        expect(authServicemock.login).toHaveBeenCalled();
        expect(authServicemock.login).toHaveBeenCalledWith(component.loginForm.value.username , component.loginForm.value.password);

      })
      it("Should call Snackbar success() on login success, store token and navigate to home page", ()=>{
        component.loginForm.setValue({username:"admin", password:"admin@123"});
         (authServicemock.login as any).and.returnValue(of({accessToken:"dummy token"}));
        component.onSubmit();
        expect(snackbarServiceMock.success).toHaveBeenCalled();
        expect(snackbarServiceMock.success).toHaveBeenCalledWith("Login successful!");

        expect(routereMock.navigateByUrl).toHaveBeenCalledWith("home");
        expect(routereMock.navigateByUrl).toHaveBeenCalled();

        expect(localStorage.getItem('token')).toBe('dummy token')

      })
      it("Should call Snackbar error() on login error", ()=>{
        component.loginForm.setValue({username:"admin", password:"admin@123"});
          // let obj = {message: "Invalid Credential"}
         (authServicemock.login as any).and.returnValue(throwError(()=>({
          error:  {message: "Invalid Credential"}
         })));
        
        component.onSubmit();
        expect(snackbarServiceMock.error).toHaveBeenCalled();
        expect(snackbarServiceMock.error).toHaveBeenCalledWith("Invalid Credential");
        

      })

      it("Should NOT call login() if form is invalid", () => {
        component.loginForm.setValue({ username: "", password: "" });
        component.onSubmit();
        expect(authServicemock.login).not.toHaveBeenCalled();
      });

});
