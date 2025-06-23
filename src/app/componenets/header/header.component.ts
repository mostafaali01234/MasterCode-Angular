import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { languageAction } from '../../store/language/language.action';
import { Observable } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn!: boolean;
  language$:Observable<string>;
  currentLang!:string;
  currentRole!:string;
 

  constructor(private userAuthService: UserAuthService
    , private router:Router
    , private store:Store<{language:string}>) {
      this.language$ = this.store.select("language");
      this.language$.subscribe((val)=>{
        this.currentLang = val
      })
   }

  ngOnInit(): void {
    
    this.userAuthService.getAuthSubject().subscribe({
      next: (status) => {
        this.isUserLoggedIn = status;
        console.log(this.userAuthService.getCurrentUserRole());
        this.currentRole = this.userAuthService.getCurrentUserRole();
      }
    });
    
    
    this.isUserLoggedIn = this.userAuthService.isUserLoggedIn();

   
  }

  Logout() {
    this.userAuthService.logout();
    this.router.navigate(['Login']);
  }

  changeLang(){
    this.store.dispatch(languageAction({lang:(this.currentLang=="en")?"ar":"en"}))
  }
}
