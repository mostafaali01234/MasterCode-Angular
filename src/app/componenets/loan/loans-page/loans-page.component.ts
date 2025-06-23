import { Component, OnInit } from '@angular/core';
import { ApiLoanService } from '../../../services/Loan/api-loan.service';
import { ApiUserService } from '../../../services/User/api-user.service';
import { Router } from '@angular/router';
import { ILoan } from '../../../models/iloan';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { IUserSelect } from '../../../models/iuser';

@Component({
  selector: 'app-loans-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './loans-page.component.html',
  styleUrl: './loans-page.component.css'
})
export class LoansPageComponent implements OnInit {
  currentLang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "ar";
  loans: ILoan[] = [] as ILoan[];
  filteredLoans: ILoan[] = [];
  pageTitle: string = (this.currentLang == "ar" ? 'قايمة السلف' : 'Loans List');
  selectedCatId: number = 0;
  imageWidth: number = 30;
  imageMargin: number = 5;
  showImage: boolean = true;
  fromDate: Date = new Date();
  toDate: Date = new Date();
  Emps: IUserSelect[] = [];
  selectedEmpId: string = "0";


  constructor(private _ApiLoanService: ApiLoanService
              ,private _ApiUserService: ApiUserService
              , private router: Router) {
    console.log(this.pageTitle)
  }

  ngOnInit() {

    this.getAllData();
    // this.getAllExpenses();
  }

  getAllData() {
    //Emps
    this._ApiUserService.getAllUsers().subscribe({
      next: (result) => {
        this.Emps = result;
        this.getAllLoans();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


  getAllLoans() {
    this._ApiLoanService.getAllLoans(this.fromDate, this.toDate, this.selectedEmpId).subscribe({
      next: (result) => {
        console.log(result);
        this.loans = result;
        this.filteredLoans = this.loans;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  NewLoan() {
    this.router.navigate(['/AddLoan']);
  }

  EditLoan(id: number) {
    this.router.navigate(['/AddLoan/' + id]);
  }

  DeleteLoan(loan: ILoan) {
    Swal.fire({
      title: `هل تريد حذف السلفة ?`,
      showCancelButton: true,
      confirmButtonText: "حذف",
      cancelButtonText: "الغاء",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._ApiLoanService.deleteLoan(loan.id).subscribe({
          next: (result) => {
            Swal.fire({
              title: 'تم!',
              text: `تم حذف السلفة  بنجاح!`,
              icon: 'success',
              confirmButtonText: 'Cool'
            })
            this.getAllLoans();
          },
          error: (error) => {
            console.log(error);
          }
        });
      } else if (result.isDenied) {

      }
    });
  }
}
