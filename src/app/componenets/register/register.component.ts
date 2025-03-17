import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NumberDirective } from '../../directives/onlynumber.directive';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NumberDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userRegisterForm: FormGroup;

  constructor(private router:Router) { 
    this.userRegisterForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      cpassword: new FormControl('')
    }, this.passwordMatch('password', 'cpassword'));
  }
  
  onSubmit(){
    
  }

  get name(){
    return this.userRegisterForm.get('name');
  }
  get phone(){
    return this.userRegisterForm.get('phone');
  }
  get email(){
    return this.userRegisterForm.get('email');
  }
  get password(){
    return this.userRegisterForm.get('password');
  }
  get cpassword(){
    return this.userRegisterForm.get('cpassword');
  }
  
  Login() {
    this.router.navigate(['Login']);
  }

  passwordMatch(password: string, confirmPassword: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['passwordMismatch']
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }

}
