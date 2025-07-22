import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { languageAction } from '../../store/language/language.action';
import { Observable } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ChatService } from '../../services/SignalR/Chat/chat.service';
import { IPublicMessage, IPrivateMessage } from '../../models/imessage';


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

  unseenPrivateMessages: IPrivateMessage[] = [] as IPrivateMessage[];
  unseenBadge: number = 0;
  currentUser: string = '';
 

  constructor(private userAuthService: UserAuthService
    , private router:Router
    , public _ChatService: ChatService
    , private store:Store<{language:string}>) {
      this.language$ = this.store.select("language");
      this.language$.subscribe((val)=>{
        this.currentLang = val
      })
   }

  ngOnInit(): void {
    this.currentUser = this.userAuthService.getCurrentUserId();

    this.userAuthService.getAuthSubject().subscribe({
      next: (status) => {
        this.isUserLoggedIn = status;
        console.log(this.userAuthService.getCurrentUserRole());
        this.currentRole = this.userAuthService.getCurrentUserRole();
      }
    });
    
    
    this.isUserLoggedIn = this.userAuthService.isUserLoggedIn();

    
    this._ChatService.startConnection().subscribe(() => {
      this._ChatService.checkUnseenPrivateMessages(this.currentUser);
    });

     this._ChatService.privateMessagesListener().subscribe((list: any) => {
      console.log('Private Messages:', list);
       if((this.currentUser == list.senderId)) {
          let senderId = this.currentUser == list.senderId ? list.receiverId : list.senderId;
          this.unseenPrivateMessages = this.unseenPrivateMessages.filter(msg => msg.senderId !== senderId);
          this.unseenBadge = this.unseenPrivateMessages.filter(msg => msg.receiverId === this.currentUser).length;
       }
    });

    this._ChatService.UnseenPrivateMessagesListener().subscribe((list: any) => {
      if(list == undefined || list.messagesList == undefined) {
        console.log('Unseen Private Messages:undefinedundefinedundefinedundefinedundefined');
      }
       this.unseenPrivateMessages = list.messagesList;
       this.unseenPrivateMessages = this.unseenPrivateMessages.filter(msg => msg.receiverId === this.currentUser);
       this.unseenBadge = this.unseenPrivateMessages.filter(msg => msg.receiverId === this.currentUser).length;
    });
  }
  
  shouldHide(): boolean {
    return this.unseenPrivateMessages.some(msg => msg.receiverId === this.currentUser );
  }
  
  unseenCount(): number {
    return this.unseenPrivateMessages.filter(msg => msg.receiverId === this.currentUser ).length;
  }


  Logout() {
    this.userAuthService.logout();
    this.router.navigate(['Login']);
  }

  changeLang(){
    this.store.dispatch(languageAction({lang:(this.currentLang=="en")?"ar":"en"}))
  }
}
