import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./componenets/header/header.component";
import { FooterComponent } from "./componenets/footer/footer.component";
import { ReactiveFormsModule } from '@angular/forms';
import { NumberDirective } from './directives/onlynumber.directive';
import { NumbersOnlyDirectiveDirective } from './directives/numbers-only-directive.directive';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WebAppTest';
  language$:Observable<string>
  dir:string="rtl"

  constructor(private store:Store<{language:string}>){
    this.language$=this.store.select("language")

    this.language$.subscribe((lang) =>{
      
      this.dir=(lang=="en")?'ltr':'rtl'
      //console.log(this.dir)
    })
  }
}
