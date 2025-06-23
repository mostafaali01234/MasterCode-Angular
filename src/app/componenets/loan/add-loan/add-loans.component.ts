import { Component, OnInit } from '@angular/core';
import { ILoan } from '../../../models/iloan';
import { IUserSelect } from '../../../models/iuser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiLoanService } from '../../../services/Loan/api-loan.service';
import { ApiMoneysafeService } from '../../../services/Moneysafe/api-moneysafe.service';
import { ApiUserService } from '../../../services/User/api-user.service';
import Swal from 'sweetalert2';
import { IMoneysafe } from '../../../models/imoneysafe';

@Component({
  selector: 'app-add-loans',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-loans.component.html',
  styleUrl: './add-loans.component.css'
})
export class AddLoansComponent  implements OnInit {
  users: IUserSelect[] = [] as IUserSelect[];
  moneysafes: IMoneysafe[] = [] as IMoneysafe[];
  newLoan: ILoan = {} as ILoan;
  title: string = 'اضافة سلفة جديد';
  btnTxt: string = 'اضافة';


  constructor(private router: Router
    , private route: ActivatedRoute
    , private _ApiLoanService: ApiLoanService
    , private _ApiMoneysafeService: ApiMoneysafeService
    , private _ApiUserService: ApiUserService) {
  }

  ngOnInit() {
     this.getAllData();
  }

  getAllData() {
    //moneysafes
    this._ApiMoneysafeService.getAllMoneysafes().subscribe({
      next: (result) => {
        // console.log(result);
        this.moneysafes = result;
        this.getAllUsers();
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
        this.loadData();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  loadData(){
    // Edit or Add
        // Check if the route has an 'id' parameter
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this.title = 'تعديل سلفة';
          this.btnTxt = 'تعديل';
          this._ApiLoanService.getLoanById(Number(id)).subscribe({
            next: (data: ILoan) => {
              this.newLoan = data;
            },
            error: (err: string) => {
              console.error('There was an error!', err);
            }
          });
        }
        else {
          this.newLoan = {
            id: 0,
            amount: 0,
            date: new Date(),
            notes: '',
            emp: '',
            empId: this.users[0].id,
            moneySafe: "",
            moneySafeId: this.moneysafes[0].id,
            applicationUser: "",
            applicationUserId: "0"
          }
        }
  }

  addNewLoan() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this._ApiLoanService.updateLoan(this.newLoan).subscribe({
        next: (data: ILoan) => {
          console.log(data);
          Swal.fire({
            title: 'تم!',
            text: `تم تعديل السلفة بنجاح!`,
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          this.gotoLoansPage();
        },
        error: (err: string) => {
          console.error('هنالك خطأ!', err);
        }
      });
    }
    else {
      // this.newMoneysafe.applicationUserId = "0";
      this._ApiLoanService.createLoan(this.newLoan).subscribe({
        next: (data: ILoan) => {
          Swal.fire({
            title: 'تم!',
            text: `تم اضافة السلفة بنجاح!`,
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          this.gotoLoansPage();
        },
        error: (err: string) => {
          console.error('هنالك خطأ!', err);
        }
      });
    }
  }

  gotoLoansPage() {
    this.router.navigate(['/Loans']);
  }
}
