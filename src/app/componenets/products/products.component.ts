import { Component, OnInit } from '@angular/core';
import { ApiProductsService } from '../../services/api-products.service';
import { Router } from '@angular/router';
import { IProduct } from '../../models/iproduct';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ICategory } from '../../models/icategory';


@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [] as IProduct[];
  categories: ICategory[] = [] as ICategory[];
  filteredProducts: IProduct[] = [];
  pageTitle: string = 'قايمة الاصناف';
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

  constructor(private _ApiProductsService: ApiProductsService, private router: Router) { }

  ngOnInit() {
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllCategories() {
    this.categories = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
      { id: 3, name: 'Category 3' },
      { id: 4, name: 'Category 4' },
      { id: 5, name: 'Category 5' }
    ];
  }

  FilterCategory() {
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
      product.name.toLowerCase().includes(filterBy)
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
      title: `Do you want to delete this product "${product.name}"?`,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._ApiProductsService.deleteProduct(product.id).subscribe({
          next: (result) => {
            Swal.fire({
              title: 'تم!',
              text: `تم حذف الصنف ${product.name} بنجاح!`,
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
