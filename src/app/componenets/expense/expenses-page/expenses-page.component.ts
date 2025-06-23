import { Component, OnInit } from '@angular/core';
import { ApiExpenseService } from '../../../services/Expense/api-expense.service';
import { ApiUserService } from '../../../services/User/api-user.service';
import { ApiExpenseTypeService } from '../../../services/ExpenseType/api-expense-type.service';
import { Router } from '@angular/router';
import { IExpense } from '../../../models/iexpense';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { IUserSelect } from '../../../models/iuser';
import { IExpenseType } from '../../../models/iexpenseType';

@Component({
  selector: 'app-expenses-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './expenses-page.component.html',
  styleUrl: './expenses-page.component.css'
})
export class ExpensesPageComponent implements OnInit {
  currentLang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "ar";
  expenses: IExpense[] = [] as IExpense[];
  filteredExpenses: IExpense[] = [];
  pageTitle: string = (this.currentLang == "ar" ? 'قايمة المصروفات' : 'Expenses List');
  selectedCatId: number = 0;
  imageWidth: number = 30;
  imageMargin: number = 5;
  showImage: boolean = true;
  fromDate: Date = new Date();
  toDate: Date = new Date();
  Emps: IUserSelect[] = [];
  selectedEmpId: string = "0";
  ExpenseTypes: IExpenseType[] = []; 
  selectedExpenseTypeId: number = 0;


  constructor(private _ApiExpenseService: ApiExpenseService
              ,private _ApiUserService: ApiUserService
              ,private _ApiExpenseTypeService: ApiExpenseTypeService
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
        this.getAllExpenseTypes();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getAllExpenseTypes() {
    this._ApiExpenseTypeService.getAllExpensesType().subscribe({
      next: (result) => {
        this.ExpenseTypes = result;
        this.getAllExpenses();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


  getAllExpenses() {
    this._ApiExpenseService.getAllExpenses(this.fromDate, this.toDate, this.selectedEmpId, this.selectedExpenseTypeId).subscribe({
      next: (result) => {
        console.log(result);
        this.expenses = result;
        this.filteredExpenses = this.expenses;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


  ExpenseTypesPage() {
    this.router.navigate(['/ExpenseTypes']);
  }

  NewExpense() {
    this.router.navigate(['/AddExpense']);
  }

  EditExpense(id: number) {
    this.router.navigate(['/AddExpense/' + id]);
  }

  DeleteExpense(expense: IExpense) {
    Swal.fire({
      title: `هل تريد حذف المصروف ?`,
      showCancelButton: true,
      confirmButtonText: "حذف",
      cancelButtonText: "الغاء",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._ApiExpenseService.deleteExpense(expense.id).subscribe({
          next: (result) => {
            Swal.fire({
              title: 'تم!',
              text: `تم حذف المصروف  بنجاح!`,
              icon: 'success',
              confirmButtonText: 'Cool'
            })
            this.getAllExpenses();
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
