import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule, FormGroup, Validators, NgForm, FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../../../services/user-auth.service';
import { IUser } from '../../../models/iuser';

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
  userData:IUser={} as IUser;

  constructor(private router: Router,private userAuthService: UserAuthService) { 
    this.userLoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      rememberMe: new FormControl(false)
    });

    this.userData = {UserName: "123451", Password: 'Category 1', rememberMe: false};
  }

  async onSubmit() {
    //login -----------

    this.userData.UserName = this.userLoginForm.get('email')?.value;
    this.userData.Password = this.userLoginForm.get('password')?.value;
    this.userData.rememberMe = this.userLoginForm.get('rememberMe')?.value;

    console.log(this.userData);
    var login = await this.userAuthService.login(this.userData).subscribe({
      next: (response) => {
        console.log(response);
        if(response == null)
          alert("الاسم او كلمة المرور غير صحيحة");
        else
          this.router.navigate(['Home']);
      },
      error: (err) => {
        alert("الاسم او كلمة المرور غير صحيحة");
        console.error(err);
      }
    });
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
