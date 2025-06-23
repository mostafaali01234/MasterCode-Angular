import { Component, OnInit } from '@angular/core';
import { ApiMoneysafeService } from '../../../services/Moneysafe/api-moneysafe.service';
import { Router } from '@angular/router';
import { IMoneysafe } from '../../../models/imoneysafe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-moneysafes-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './moneysafes-page.component.html',
  styleUrl: './moneysafes-page.component.css'
})
export class MoneysafesPageComponent implements OnInit {
currentLang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "ar";
  moneysafes: IMoneysafe[] = [] as IMoneysafe[];
  filteredMoneysafes: IMoneysafe[] = [];
  pageTitle: string = (this.currentLang == "ar" ? 'قايمة الخزن' : 'Moneysafes List');
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
    this.filteredMoneysafes = this.performFilter(value);
  }

  constructor(private _ApiMoneysafesService: ApiMoneysafeService, private router: Router) {
    console.log(this.pageTitle)
  }

  ngOnInit() {
    this.getAllMoneysafes();
  }
  getAllMoneysafes() {
    this._ApiMoneysafesService.getAllMoneysafes().subscribe({
      next: (result) => {
        console.log(result);
        this.moneysafes = result;
        this.filteredMoneysafes = this.moneysafes;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  performFilter(filterBy: string): IMoneysafe[] {
    filterBy = filterBy.toLowerCase();
    return this.moneysafes.filter((moneysafe: IMoneysafe) =>
      moneysafe.name.toLowerCase().includes(filterBy) 
    );
  }

  NewMoneysafe() {
    this.router.navigate(['/AddMoneysafe']);
  }

  EditMoneysafe(id: number) {
    this.router.navigate(['/AddMoneysafe/' + id]);
  }

  MoneysafeBalance(id: number) {
    this.router.navigate(['/MoneysafeMoves/' + id]);
  }

  DeleteMoneysafe(moneysafes: IMoneysafe) {
    Swal.fire({
      title: `هل تريد حذف الخزنة  "${moneysafes.name}"?`,
      showCancelButton: true,
      confirmButtonText: "حذف",
      cancelButtonText: "الغاء",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._ApiMoneysafesService.deleteMoneysafe(moneysafes.id).subscribe({
          next: (result) => {
            Swal.fire({
              title: 'تم!',
              text: `تم حذف العميل ${moneysafes.name} بنجاح!`,
              icon: 'success',
              confirmButtonText: 'Cool'
            })
            this.getAllMoneysafes();
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
