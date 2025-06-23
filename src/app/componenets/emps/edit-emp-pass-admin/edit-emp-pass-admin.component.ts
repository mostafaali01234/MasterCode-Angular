import { Component, OnInit } from '@angular/core';
import { IUserSelect, IUserEditInfo, IUserEditPassword } from '../../../models/iuser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiUserService } from '../../../services/User/api-user.service';
import Swal from 'sweetalert2';
import { UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'app-edit-emp-pass-admin',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-emp-pass-admin.component.html',
  styleUrl: './edit-emp-pass-admin.component.css'
})
export class EditEmpPassAdminComponent {
    userData: IUserEditInfo = {} as IUserEditInfo;
    userPass: IUserEditPassword = {} as IUserEditPassword;
    title: string = 'تعديل بيانات المستخدم';
    title2: string = 'تعديل كلمة المرور';
    btnTxt: string = 'تعديل';
    currentUser: any;
    userId: any;
    pageTitle: string = 'الملف الشخصي';
  
    constructor(private router: Router
      , private userAuthService: UserAuthService
      , private route: ActivatedRoute
      , private _ApiUserService: ApiUserService) {
    }
  
    ngOnInit() {
      this.userId = this.route.snapshot.paramMap.get('id');
  
      if (this.userId) {
        this.title2 = 'تعديل كلمة المرور';
        this.btnTxt = 'تعديل';
        this._ApiUserService.getUserById(this.userId).subscribe({
          next: (data: IUserEditInfo) => {
            this.title = 'تعديل كلمة مرور الموظف' + data.name;
            this.userData = data;
  
            this.userPass.id = this.userId;
            this.userPass.oldpassword = '';
            this.userPass.password = '';
            this.userPass.confirmPassword = '';
            console.log(data);
          },
          error: (err: string) => {
            console.error('There was an error!', err);
          }
        });
      }
    }

    EditPassword() {
      if (this.userId) {
        this._ApiUserService.updateUserPasswordAdmin(this.userPass).subscribe({
          next: (data: IUserEditPassword) => {
            Swal.fire({
              title: 'تم!',
              text: `تم تعديل كلمة مرور المستخدم ${this.userData.name} بنجاح!`,
              icon: 'success',
              confirmButtonText: 'Cool'
            })
             this.gotoHomePage();
          },
          error: (err: any) => {
            console.log(err);
            if (err.error.code == "PasswordMismatch") {
              Swal.fire({
                title: 'خطأ!',
                text: `كلمة المرور القديمة غير صحيحة!`,
                icon: 'error',
                confirmButtonText: 'Cool'
              })
            }
            else if (err.error.errors) {
              let errors = err.error.errors["ConfirmPassword"];  
              Swal.fire({
                title: 'خطأ!',
                text: `كلمة المرور الجديدة والتأكيد غير متطابقة!`,
                icon: 'error',
                confirmButtonText: 'Cool'
              })
            }
            else
            {
              Swal.fire({
                title: 'خطأ!',
                text: `كلمة المرور يجب ان تكون اكبر من 12 حرف وتتضمن حروف وحرف كبير وارقام ورمز واحد علي الافل !`,
                icon: 'error',
                confirmButtonText: 'Cool'
              })
            }
          }
        });
      }
    }
    
  gotoHomePage() {
    this.router.navigate(['/Emps']);
  }
}
