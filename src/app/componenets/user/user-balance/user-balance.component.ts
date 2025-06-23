import { Component, OnInit } from '@angular/core';
import { ApiUserService } from '../../../services/User/api-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserBalance, IUserEditInfo } from '../../../models/iuser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'app-user-balance',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-balance.component.html',
  styleUrl: './user-balance.component.css'
})
export class UserBalanceComponent implements OnInit {
  currentLang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "ar";
  commsList: IUserBalance[] = [] as IUserBalance[];
  filteredList: IUserBalance[] = [];
  pageTitle: string = "";
  errorMsg: string = "";
  fromDate: Date = new Date();
  toDate: Date = new Date();
  userId: any;
  currentUser: any;
  username: any;

  constructor(private _ApiUserService: ApiUserService
      , private route: ActivatedRoute
      , private userAuthService: UserAuthService
      , private router: Router) {
    console.log(this.pageTitle)
  }

  ngOnInit() {
    // this.currentUser = this.userAuthService.getCurrentUserClaims();
    // this.userId = this.userAuthService.getClaim('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier');
    // this.username = this.userAuthService.getClaim('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name');
    this.userId = this.route.snapshot.paramMap.get('id');
    this.getEmpDets();
  }

  getEmpDets(){
     this._ApiUserService.getUserById(this.userId).subscribe({
            next: (data: IUserEditInfo) => {
              this.username = data.userName;
              this.pageTitle = ((this.currentLang == "ar" ? 'كشف حساب' : 'User balance') + ": " + this.username);
            },
            error: (err: string) => {
              console.error('There was an error!', err);
            }
          });
  }

  getBalanceList() {
    this._ApiUserService.getUserComms(this.userId, this.fromDate, this.toDate).subscribe({
      next: (result) => {
        console.log(result);
        this.commsList = result;
        this.filteredList = this.commsList;
      },
      error: (error) => {
        console.log((error))
        this.errorMsg = error.error.message;
        this.commsList = [] as IUserBalance[];
        this.filteredList = [];
        Swal.fire({
          icon: 'info',
          title: '' + (this.currentLang == "ar" ? 'تنبيه' : 'Alert'),
          text: this.errorMsg,
          confirmButtonText: this.currentLang == "ar" ? 'حسنا' : 'OK'
        });
      }
    })
  }
}

