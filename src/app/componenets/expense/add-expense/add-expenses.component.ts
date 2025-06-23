import { Component, OnInit } from '@angular/core';
import { IExpense } from '../../../models/iexpense';
import { IUserSelect } from '../../../models/iuser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiExpenseService } from '../../../services/Expense/api-expense.service';
import { ApiExpenseTypeService } from '../../../services/ExpenseType/api-expense-type.service';
import { ApiMoneysafeService } from '../../../services/Moneysafe/api-moneysafe.service';
import { ApiUserService } from '../../../services/User/api-user.service';
import Swal from 'sweetalert2';
import { IExpenseType } from '../../../models/iexpenseType';
import { IMoneysafe } from '../../../models/imoneysafe';


@Component({
  selector: 'app-add-expenses',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-expenses.component.html',
  styleUrl: './add-expenses.component.css'
})
export class AddExpensesComponent implements OnInit {
  users: IUserSelect[] = [] as IUserSelect[];
  expenseTypes: IExpenseType[] = [] as IExpenseType[];
  moneysafes: IMoneysafe[] = [] as IMoneysafe[];
  newExpense: IExpense = {} as IExpense;
  title: string = 'اضافة مصروف جديد';
  btnTxt: string = 'اضافة';


  constructor(private router: Router
    , private route: ActivatedRoute
    , private _ApiExpenseService: ApiExpenseService
    , private _ApiExpenseTypeService: ApiExpenseTypeService
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
        // console.log(result);
        this.expenseTypes = result;
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
          this.title = 'تعديل مصروف';
          this.btnTxt = 'تعديل';
          this._ApiExpenseService.getExpenseById(Number(id)).subscribe({
            next: (data: IExpense) => {
              this.newExpense = data;
            },
            error: (err: string) => {
              console.error('There was an error!', err);
            }
          });
        }
        else {
          this.newExpense = {
            id: 0,
            amount: 0,
            expenseType: '',
            expenseTypeId: this.expenseTypes[0].id,
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

  addNewExpense() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this._ApiExpenseService.updateExpense(this.newExpense).subscribe({
        next: (data: IExpense) => {
          console.log(data);
          Swal.fire({
            title: 'تم!',
            text: `تم تعديل المصروف بنجاح!`,
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          this.gotoExpensesPage();
        },
        error: (err: string) => {
          console.error('هنالك خطأ!', err);
        }
      });
    }
    else {
      // this.newMoneysafe.applicationUserId = "0";
      this._ApiExpenseService.createExpense(this.newExpense).subscribe({
        next: (data: IExpense) => {
          Swal.fire({
            title: 'تم!',
            text: `تم اضافة المصروف بنجاح!`,
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          this.gotoExpensesPage();
        },
        error: (err: string) => {
          console.error('هنالك خطأ!', err);
        }
      });
    }
  }

  gotoExpensesPage() {
    this.router.navigate(['/Expenses']);
  }
}
