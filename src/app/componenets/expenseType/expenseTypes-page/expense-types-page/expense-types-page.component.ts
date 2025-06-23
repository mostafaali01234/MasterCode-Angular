import { Component, OnInit } from '@angular/core';
import { ApiExpenseTypeService } from '../../../../services/ExpenseType/api-expense-type.service';
import { Router } from '@angular/router';
 import { IExpenseType } from '../../../../models/iexpenseType';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expense-types-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-types-page.component.html',
  styleUrl: './expense-types-page.component.css'
})
export class ExpenseTypesPageComponent  implements OnInit {
currentLang=localStorage.getItem("lang")?localStorage.getItem("lang") : "ar";
  expenseTypes: IExpenseType[] = [] as IExpenseType[];
  filteredExpenseTypes: IExpenseType[] = [];
  pageTitle: string = (this.currentLang == "ar" ? 'قايمة انواع المصروفات' : 'ExpenseTypes List');
  selectedCatId: number = 0;
  imageWidth: number = 30;
  imageMargin: number = 5;
  showImage: boolean = true;
  private _filterText!: string;
  get filterText(): string {
    return this._filterText;
  }
  set filterText(value) {
    this._filterText = value;
    this.filteredExpenseTypes = this.performFilter(value);
  }

    constructor(private _ApiExpenseTypeService: ApiExpenseTypeService, private router: Router) { 
      console.log(this.pageTitle)
    }
  
    ngOnInit() {
      this.getAllExpenseTypes();
    }

    getAllExpenseTypes() {
        this._ApiExpenseTypeService.getAllExpensesType().subscribe({
          next: (result) => {
            console.log(result);
            this.expenseTypes = result;
            this.filteredExpenseTypes = this.expenseTypes;
          },
          error: (error) => {
            console.log(error)
          }
        })
      }
    
      performFilter(filterBy: string): IExpenseType[] {
        filterBy = filterBy.toLowerCase();
        return this.expenseTypes.filter((expenseType: IExpenseType) =>
          expenseType.name.toLowerCase().includes(filterBy)
        );
      }
    
      NewExpenseType() {
        this.router.navigate(['/AddExpenseType']);
      }
    
      EditExpenseType(id: number) {
        this.router.navigate(['/AddExpenseType/' + id]);
      }
    
    
      ExpensesPage() {
        this.router.navigate(['/Expenses/']);
      }
    
      DeleteExpenseType(expenseType: IExpenseType) {
        Swal.fire({
          title: `هل تريد حذف نوع المصروف  "${expenseType.name}"?`,
          showCancelButton: true,
          confirmButtonText: "حذف",
          cancelButtonText: "الغاء",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this._ApiExpenseTypeService.deleteExpenseType(expenseType.id).subscribe({
              next: (result) => {
                Swal.fire({
                  title: 'تم!',
                  text: `تم حذف نوع المصروف ${expenseType.name} بنجاح!`,
                  icon: 'success',
                  confirmButtonText: 'Cool'
                })
                this.getAllExpenseTypes();
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
