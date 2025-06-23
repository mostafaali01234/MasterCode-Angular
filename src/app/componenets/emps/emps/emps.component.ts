import { Component, OnInit } from '@angular/core';
import { ApiUserService } from '../../../services/User/api-user.service';
import { Router } from '@angular/router';
import { IUserSelect } from '../../../models/iuser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-emps',
  imports: [CommonModule, FormsModule],
  templateUrl: './emps.component.html',
  styleUrl: './emps.component.css'
})
export class EmpsComponent implements OnInit {
  currentLang=localStorage.getItem("lang")?localStorage.getItem("lang") : "ar";
  emps: IUserSelect[] = [] as IUserSelect[];
  filteredEmps: IUserSelect[] = [];
  pageTitle: string = (this.currentLang == "ar" ? 'قايمة الموظفين' : 'Emps List');
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
    this.filteredEmps = this.performFilter(value);
  }

  constructor(private _ApiUserService: ApiUserService, private router: Router) { 
    console.log(this.pageTitle)
  }

  ngOnInit() {
    this.getAllEmps();
  }

  getAllEmps() {
    this._ApiUserService.getAllUsers().subscribe({
      next: (result) => {
        console.log(result);
        this.emps = result;
        this.filteredEmps = this.emps;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  performFilter(filterBy: string): IUserSelect[] {
    filterBy = filterBy.toLowerCase();
    return this.emps.filter((emp: IUserSelect) =>
      emp.name.toLowerCase().includes(filterBy)
    );
  }

  NewEmp() {
    this.router.navigate(['/AddEmp']);
  }

  EmpBalance(id: string) {
     this.router.navigate(['/UserBalance/' + id]);
  }

  EditEmp(id: string) {
    this.router.navigate(['/AddEditEmp/' + id]);
  }

  EditEmpPassword(id: string) {
    this.router.navigate(['/EditEmpPasswordAdmin/' + id]);
  }

  DeleteEmp(emp: IUserSelect) {
    Swal.fire({
      title: `هل تريد حذف الموظف "${emp.name}"?`,
      showCancelButton: true,
      confirmButtonText: "حذف",
      cancelButtonText: "الغاء",
    }).then((result) => {
      // if (result.isConfirmed) {
      //   this._ApiUserService.deleteEmp(emp.id).subscribe({
      //     next: (result) => {
      //       Swal.fire({
      //         title: 'تم!',
      //         text: `تم حذف الصالموظفنف ${emp.name} بنجاح!`,
      //         icon: 'success',
      //         confirmButtonText: 'Cool'
      //       })
      //       this.getAllEmps();
      //     },
      //     error: (error) => {
      //       console.log(error);
      //     }
      //   });
      // } else if (result.isDenied) {

      // }
    });
  }
}
