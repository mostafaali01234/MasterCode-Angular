import { Component, OnInit } from '@angular/core';
import { ApiProductsService } from '../../../services/api-products.service';
import { ApiCategoryService } from '../../../services/Category/api-category.service';
import { Router } from '@angular/router';
import { IProduct } from '../../../models/iproduct';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ICategory } from '../../../models/icategory';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  currentLang=localStorage.getItem("lang")?localStorage.getItem("lang") : "ar";
  products: IProduct[] = [] as IProduct[];
  categories: ICategory[] = [] as ICategory[];
  filteredProducts: IProduct[] = [];
  pageTitle: string = (this.currentLang == "ar" ? 'قايمة الاصناف' : 'Products List');
  // pageTitle: Observable<string> = of(this.currentLang == "ar" ? 'قايمة الاصناف' : 'Products List');
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
    this.filteredProducts = this.performFilter(value);
  }

  constructor(private _ApiProductsService: ApiProductsService,private _ApiCategoryService: ApiCategoryService, private router: Router) { 
    console.log(this.pageTitle)
  }

  ngOnInit() {
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllCategories() {
    this._ApiCategoryService.getAllCategories().subscribe({
      next: (result) => {
        console.log(result);
        this.categories = result;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  FilterCategory() {
    console.log(this.selectedCatId);
    if (this.selectedCatId == 0) {
      this.getAllProducts();
    } else {
      this.getFilteredProducts();
      //   this.filteredProducts = this.products.filter((product: IProduct) =>
      //   product.catId == this.selectedCatId
      // );
    }
  }


  getFilteredProducts() {
    this._ApiProductsService.getProductsByCatId(this.selectedCatId).subscribe({
      next: (result:IProduct[]) => {
        console.log(result);
        this.products = result;
        this.filteredProducts = this.products;
      },
      error: (error:string) => {
        console.log(error)
      }
    })
  }

  getAllProducts() {
    this._ApiProductsService.getAllProducts().subscribe({
      next: (result) => {
        console.log(result);
        this.products = result;
        this.filteredProducts = this.products;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter((product: IProduct) =>
      product.title.toLowerCase().includes(filterBy)
    );
  }

  NewProduct() {
    this.router.navigate(['/AddProduct']);
  }

  EditProduct(id: number) {
    this.router.navigate(['/AddProduct/' + id]);
  }

  DeleteProduct(product: IProduct) {
    Swal.fire({
      title: `هل تريد حذف الصنف "${product.title}"?`,
      showCancelButton: true,
      confirmButtonText: "حذف",
      cancelButtonText: "الغاء",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._ApiProductsService.deleteProduct(product.id).subscribe({
          next: (result) => {
            Swal.fire({
              title: 'تم!',
              text: `تم حذف الصنف ${product.title} بنجاح!`,
              icon: 'success',
              confirmButtonText: 'Cool'
            })
            this.getAllProducts();
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
