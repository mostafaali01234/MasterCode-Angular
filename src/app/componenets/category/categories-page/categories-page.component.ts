import { Component, OnInit } from '@angular/core';
import { ApiCategoryService } from '../../../services/Category/api-category.service';
import { Router } from '@angular/router';
import { ICategory } from '../../../models/icategory';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-categories-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css'
})
export class CategoriesPageComponent implements OnInit {
  currentLang=localStorage.getItem("lang")?localStorage.getItem("lang") : "ar";
  categories: ICategory[] = [] as ICategory[];
  filteredCategories: ICategory[] = [];
  pageTitle: string = (this.currentLang == "ar" ? 'قايمة التصنيفات' : 'Categories List');
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
    this.filteredCategories = this.performFilter(value);
  }

    constructor(private _ApiCategoryService: ApiCategoryService, private router: Router) { 
      console.log(this.pageTitle)
    }
  
    ngOnInit() {
      this.getAllCategories();
    }

    getAllCategories() {
        this._ApiCategoryService.getAllCategories().subscribe({
          next: (result) => {
            console.log(result);
            this.categories = result;
            this.filteredCategories = this.categories;
          },
          error: (error) => {
            console.log(error)
          }
        })
      }
    
      performFilter(filterBy: string): ICategory[] {
        filterBy = filterBy.toLowerCase();
        return this.categories.filter((category: ICategory) =>
          category.name.toLowerCase().includes(filterBy)
        );
      }
    
      NewCategory() {
        this.router.navigate(['/AddCategory']);
      }
    
      EditCategory(id: number) {
        this.router.navigate(['/AddCategory/' + id]);
      }
    
      DeleteCategory(category: ICategory) {
        Swal.fire({
          title: `هل تريد حذف التصنيف  "${category.name}"?`,
          showCancelButton: true,
          confirmButtonText: "حذف",
          cancelButtonText: "الغاء",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this._ApiCategoryService.deleteCategory(category.id).subscribe({
              next: (result) => {
                Swal.fire({
                  title: 'تم!',
                  text: `تم حذف التصنيف ${category.name} بنجاح!`,
                  icon: 'success',
                  confirmButtonText: 'Cool'
                })
                this.getAllCategories();
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
