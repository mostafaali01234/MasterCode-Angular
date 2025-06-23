import { Component, OnInit } from '@angular/core';
import { IUserEditInfo } from '../../../models/iuser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiUserService } from '../../../services/User/api-user.service';
import Swal from 'sweetalert2';
import { UserAuthService } from '../../../services/user-auth.service';
import { ApiJobService } from '../../../services/Job/api-job.service';
import { ApiRoleService } from '../../../services/Role/api-role.service';
import { IJob, IRole } from '../../../models/ijob';

@Component({
  selector: 'app-add-emp',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-emp.component.html',
  styleUrl: './add-emp.component.css'
})
export class AddEmpComponent implements OnInit {
  userData: IUserEditInfo = {} as IUserEditInfo;
  title: string = 'تعديل بيانات الموظف';
  btnTxt: string = 'تعديل';
  userId: any;
  jobs: IJob[] = [] as IJob[];
  roles: IRole[] = [] as IRole[];

  constructor(private router: Router
    , private userAuthService: UserAuthService
    , private route: ActivatedRoute
    , private _ApiJobService: ApiJobService
    , private _ApiRoleService: ApiRoleService
    , private _ApiUserService: ApiUserService) {
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');

    if (this.userId) {
      this.title = 'تعديل بيانات الموظف';
      this.btnTxt = 'تعديل';
      this.getAllJobs();
    }
  }

  getAllJobs() {
    this._ApiJobService.getAllJobs().subscribe({
      next: (result) => {
        console.log(result);
        this.jobs = result;
        this.getAllRoles();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getAllRoles() {
    this._ApiRoleService.getAllRoles().subscribe({
      next: (result) => {
        console.log(result);
        this.roles = result;
        this.getUserData();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getUserData() {
   this._ApiUserService.getUserById(this.userId).subscribe({
        next: (data: IUserEditInfo) => {
          this.userData = data;
        },
        error: (err: string) => {
          console.error('There was an error!', err);
        }
      });
  }

  EditInfo() {
    if (this.userId) {
      this._ApiUserService.updateUserData(this.userData).subscribe({
        next: (data: IUserEditInfo) => {
          console.log(data);
          Swal.fire({
            title: 'تم!',
            text: `تم تعديل بيانات الموظف ${data.name} بنجاح!`,
            icon: 'success',
            confirmButtonText: 'Cool'
          })
           this.gotoEmpsPage();
        },
        error: (err: any) => {
          if (err.error.errors) {
            let errors = err.error.errors["ConfirmPassword"];  
            Swal.fire({
              title: 'خطأ!',
              text: `كلمة المرور غير متطابقة!`,
              icon: 'error',
              confirmButtonText: 'Cool'
            })
          }
          else
          {
            Swal.fire({
              title: 'خطأ!',
              text: `حدث خطأ أثناء تعديل بيانات الموظف ${this.userData.name} !`,
              icon: 'error',
              confirmButtonText: 'Cool'
            })
          }
        }
      });
    }
  }

  gotoEmpsPage(){
    this.router.navigate(['/Emps']);
  }
}
