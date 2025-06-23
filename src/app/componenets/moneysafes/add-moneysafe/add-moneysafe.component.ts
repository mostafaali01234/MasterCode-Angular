import { Component, OnInit } from '@angular/core';
import { IMoneysafe } from '../../../models/imoneysafe';
import { IUserSelect } from '../../../models/iuser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiMoneysafeService } from '../../../services/Moneysafe/api-moneysafe.service';
import { ApiUserService } from '../../../services/User/api-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-moneysafe',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-moneysafe.component.html',
  styleUrl: './add-moneysafe.component.css'
})
export class AddMoneysafeComponent implements OnInit {
  users: IUserSelect[] = [] as IUserSelect[];
  newMoneysafe: IMoneysafe = {} as IMoneysafe;
  title: string = 'اضافة خزنة جديد';
  btnTxt: string = 'اضافة';


  constructor(private router: Router
    , private route: ActivatedRoute
    , private _ApiMoneysafeService: ApiMoneysafeService
    , private _ApiUserService: ApiUserService) {
  }


  ngOnInit() {
    
    // this.getAllUsers();
    this._ApiUserService.getAllUsers().subscribe({
      next: (result) => {
        this.users = result;

        // Edit or Add
        // Check if the route has an 'id' parameter
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this.title = 'تعديل بيانات خزنة';
          this.btnTxt = 'تعديل';
          this._ApiMoneysafeService.getMoneysafeById(Number(id)).subscribe({
            next: (data: IMoneysafe) => {
              this.newMoneysafe = data;
            },
            error: (err: string) => {
              console.error('There was an error!', err);
            }
          });
        }
        else {
          this.newMoneysafe = {
            id: 0,
            name: '',
            currentBalance: 0,
            openingBalance: 0,
            applicationUserId: this.users[0].id,
            applicationUser: ""
          }
        }
        console.log(this.newMoneysafe);
      },
      error: (error) => {
        console.log(error)
      }
    })




  }


  getAllUsers() {
    this._ApiUserService.getAllUsers().subscribe({
      next: (result) => {
        // console.log(result);
        this.users = result;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


  addNewMoneysafe() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this._ApiMoneysafeService.updateMoneysafe(this.newMoneysafe).subscribe({
        next: (data: IMoneysafe) => {
          console.log(data);
          Swal.fire({
            title: 'تم!',
            text: `تم تعديل خزنة ${data.name} بنجاح!`,
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          this.gotoMoneysafesPage();
        },
        error: (err: string) => {
          console.error('هنالك خطأ!', err);
        }
      });
    }
    else {
      // this.newMoneysafe.applicationUserId = "0";
      this._ApiMoneysafeService.createMoneysafe(this.newMoneysafe).subscribe({
        next: (data: IMoneysafe) => {
          Swal.fire({
            title: 'تم!',
            text: `تم اضافة الخزنة ${data.name} بنجاح!`,
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          this.gotoMoneysafesPage();
        },
        error: (err: string) => {
          console.error('هنالك خطأ!', err);
        }
      });
    }
  }

  gotoMoneysafesPage() {
    this.router.navigate(['/MoneySafes']);
  }
}
