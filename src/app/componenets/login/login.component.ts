import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule, FormGroup, Validators, NgForm, FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';

// export class LoginData {
//   constructor(
//     public email: string,
//     public password: string,
//   ) {}
// }
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule , FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // model = new LoginData('', '');
  userLoginForm: FormGroup;


  constructor(private router: Router,private userAuthService: UserAuthService) { 
    this.userLoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      rememberMe: new FormControl(false)
    });
  }

  onSubmit() {
    //login -----------
    this.userAuthService.login();

    this.router.navigate(['Home']);
  }

  get email(){
    return this.userLoginForm.get('email');
  }
  get password(){
    return this.userLoginForm.get('password');
  }

  Register() {
    this.router.navigate(['Register']);
  }

}
