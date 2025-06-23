import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../../models/icategory';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiCategoryService } from '../../../services/Category/api-category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit  {
  newCategory:ICategory={} as ICategory;
  title: string = 'اضافة تصنيف جديد';
  btnTxt: string = 'اضافة';

  
  constructor(private router: Router
    , private route: ActivatedRoute
    , private _ApiCategoryService: ApiCategoryService) {
  }


  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap);
    if (id) {
      this.title = 'تعديل بيانات تصنيف';
      this.btnTxt = 'تعديل';
      this._ApiCategoryService.getCategoryById(Number(id)).subscribe({
        next: (data:ICategory) => {
          this.newCategory = data;
        },
        error: (err:string) => {
          console.error('There was an error!', err);
        }
      });
    }
  }


  addNewCategory(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id)
    {
      this._ApiCategoryService.updateCategory(this.newCategory).subscribe({
        next: (data:ICategory) => {
          console.log(data);
          Swal.fire({
            title: 'تم!',
            text: `تم تعديل التصنيف ${data.name} بنجاح!`,
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          this.gotoCategoriesPage();
        },
        error: (err:string) => {
          console.error('هنالك خطأ!', err);
        }
      });
    }
    else
    {
        this._ApiCategoryService.createCategory(this.newCategory).subscribe({
          next: (data:ICategory) => {
            Swal.fire({
              title: 'تم!',
              text: `تم اضافة التصنيف ${data.name} بنجاح!`,
              icon: 'success',
              confirmButtonText: 'Cool'
            })
            this.gotoCategoriesPage();
          },
          error: (err:string) => {
            console.error('هنالك خطأ!', err);
          }
        });
    }
  }

  gotoCategoriesPage(){
    this.router.navigate(['/Categories']);
  }
}
