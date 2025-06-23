import { Component, OnInit } from '@angular/core';
import { ApiExpenseTypeService } from '../../../../services/ExpenseType/api-expense-type.service';
import { IExpenseType } from '../../../../models/iexpenseType';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-expense-types',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-expense-types.component.html',
  styleUrl: './add-expense-types.component.css'
})
export class AddExpenseTypesComponent  implements OnInit  {
newExpenseType:IExpenseType={} as IExpenseType;
  title: string = 'اضافة نوع مصروف جديد';
  btnTxt: string = 'اضافة';

  
  constructor(private router: Router
    , private route: ActivatedRoute
    , private _ApiExpenseTypeService: ApiExpenseTypeService) {
  }


  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap);
    if (id) {
      this.title = 'تعديل بيانات نوع المصروف';
      this.btnTxt = 'تعديل';
      this._ApiExpenseTypeService.getExpenseTypeById(Number(id)).subscribe({
        next: (data:IExpenseType) => {
          this.newExpenseType = data;
        },
        error: (err:string) => {
          console.error('There was an error!', err);
        }
      });
    }
  }


  addNewExpenseType(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id)
    {
      this._ApiExpenseTypeService.updateExpenseType(this.newExpenseType).subscribe({
        next: (data:IExpenseType) => {
          console.log(data);
          Swal.fire({
            title: 'تم!',
            text: `تم تعديل نوع المصروف ${data.name} بنجاح!`,
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          this.gotoExpenseTypesPage();
        },
        error: (err:string) => {
          console.error('هنالك خطأ!', err);
        }
      });
    }
    else
    {
        this._ApiExpenseTypeService.createExpenseType(this.newExpenseType).subscribe({
          next: (data:IExpenseType) => {
            Swal.fire({
              title: 'تم!',
              text: `تم اضافة نوع المصروف: ${data.name} بنجاح!`,
              icon: 'success',
              confirmButtonText: 'Cool'
            })
            this.gotoExpenseTypesPage();
          },
          error: (err:string) => {
            console.error('هنالك خطأ!', err);
          }
        });
    }
  }

  gotoExpenseTypesPage(){
    this.router.navigate(['/ExpenseTypes']);
  }
}
