import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../models/icategory';
import { IProduct } from '../../models/iproduct';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiProductsService } from '../../services/api-products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  categories: ICategory[];
  newProduct:IProduct={} as IProduct;
  title: string = 'اضافة صنف جديد';
  btnTxt: string = 'اضافة';
  
  constructor(private router: Router
    , private route: ActivatedRoute
    , private _apiProductService: ApiProductsService
    , private _ApiProductsService: ApiProductsService) {
    this.categories = [
      {id: 1, name: 'Category 1'},
      {id: 2, name: 'Category 2'},
      {id: 3, name: 'Category 3'},
      {id: 4, name: 'Category 4'},
      {id: 5, name: 'Category 5'}
    ];
  }

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap);
    if (id) {
      this.title = 'تعديل بيانات صنف';
      this.btnTxt = 'تعديل';
      this._apiProductService.getProductById(Number(id)).subscribe({
        next: (data:IProduct) => {
          this.newProduct = data;
        },
        error: (err:string) => {
          console.error('There was an error!', err);
        }
      });
    }
  }

  addNewProduct(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id)
    {
      this._ApiProductsService.updateProduct(this.newProduct).subscribe({
        next: (data:IProduct) => {
          Swal.fire({
            title: 'تم!',
            text: `تم تعديل الصنف ${data.name} بنجاح!`,
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          this.gotoProductsPage();
        },
        error: (err:string) => {
          console.error('هنالك خطأ!', err);
        }
      });
    }
    else
    {
        this._ApiProductsService.createProduct(this.newProduct).subscribe({
          next: (data:IProduct) => {
            Swal.fire({
              title: 'تم!',
              text: `تم اضافة الصنف ${data.name} بنجاح!`,
              icon: 'success',
              confirmButtonText: 'Cool'
            })
            this.gotoProductsPage();
          },
          error: (err:string) => {
            console.error('هنالك خطأ!', err);
          }
        });
    }
  }

  gotoProductsPage(){
    this.router.navigate(['/Products']);
  }
}
