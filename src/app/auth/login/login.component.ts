import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Component({
  selector: 'app-login',
  imports:[CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[AuthService, SnackbarService]
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService:AuthService,private snackbarService:SnackbarService,
    private router : Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

   if(localStorage.getItem('token')){
     router.navigateByUrl('home');
   }
  }

  onSubmit() {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
        next:(res)=>{
            // alert('Login successful!');
            this.snackbarService.success('Login successful!')
            localStorage.setItem('token', res.accessToken);
            
            this. router.navigateByUrl('home')
            console.log(res)
        },
        error:(err)=>{
   this.snackbarService.error(err.error.message)
        }
      })
    
   
  }
}
