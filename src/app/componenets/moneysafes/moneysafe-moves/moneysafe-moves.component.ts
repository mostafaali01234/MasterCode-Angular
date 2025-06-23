import { Component, OnInit } from '@angular/core';
import { ApiMoneysafeService } from '../../../services/Moneysafe/api-moneysafe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IMoneysafe, IMoneysafeMoves, IMoneysafeMovesReturnList } from '../../../models/imoneysafe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-moneysafe-moves',
  imports: [CommonModule, FormsModule],
  templateUrl: './moneysafe-moves.component.html',
  styleUrl: './moneysafe-moves.component.css'
})
export class MoneysafeMovesComponent  implements OnInit {
currentLang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "ar";
  fromDate: Date = new Date();
  toDate: Date = new Date();
  MoneysafeInfo: IMoneysafe = {} as IMoneysafe;
  resList: IMoneysafeMoves[] = [] as IMoneysafeMoves[];
  filteredList: IMoneysafeMoves[] = [];
  pageTitle: string = (this.currentLang == "ar" ? 'كشف حساب الخزنة' : 'Moneysafe Balance');

  constructor(private _ApiMoneysafeService: ApiMoneysafeService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this._ApiMoneysafeService.getMoneysafeById(Number(id)).subscribe({
      next: (data: IMoneysafe) => {
        this.MoneysafeInfo = data;
        this.pageTitle = (this.currentLang == "ar" ? 'كشف حساب الخزنة: ' + this.MoneysafeInfo.name : 'Moneysafe Balance: ' + this.MoneysafeInfo.name);
        this.getAllMoves();
      },
      error: (err: string) => {
        console.error('There was an error!', err);
      }
    });
  }

  getAllMoves() {
    this._ApiMoneysafeService.getAllMoneysafeMoves(this.MoneysafeInfo.id, this.fromDate, this.toDate).subscribe({
      next: (result) => {
        this.resList = result.movesList;
        this.filteredList = this.resList;
        console.log(result);
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  
  
  MoneysafesPage() {
    this.router.navigate(['/MoneySafes']);
  }

}
