import { Component, OnInit } from '@angular/core';
import { ChatRoomService } from '../../../services/chatRoom/chat-room.service';
import { UserAuthService } from '../../../services/user-auth.service';
import { ApiUserService } from '../../../services/User/api-user.service';
import { Router } from '@angular/router';
import { IChatRoom, IChatUser } from '../../../models/ichatroom';
import { IUserSelect } from '../../../models/iuser';
import { IPublicMessage, IPrivateMessage } from '../../../models/imessage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ChatService } from '../../../services/SignalR/Chat/chat.service';
import { select } from '@ngrx/store';

@Component({
  selector: 'app-chat-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css'
})
export class ChatPageComponent implements OnInit {
  rooms: IChatRoom[] = [] as IChatRoom[];
  messages: IPublicMessage[] = [] as IPublicMessage[];
  privateMessages: IPrivateMessage[] = [] as IPrivateMessage[];
  users: IUserSelect[] = [] as IUserSelect[];
  publicMessage: string = '';
  privateMessage: string = '';
  currentUser: string = '';
  pageTitle: string = 'الشات';
  selectedChatRoomId:number = 0;
  selectedChatRoomId$ = new BehaviorSubject<number>(0);
  selectedChatUserId:string = '';
  selectedChatUserId$ = new BehaviorSubject<string>('');
  updateVar(newVal: number) {
    this.selectedChatRoomId$.next(newVal);
    this.LoadRoomMessages(newVal);
  }
  updateVarUser(newVal: string) {
    this.selectedChatUserId$.next(newVal);
    this.LoadPrivateRoomMessages(newVal, this.currentUser);
  }

  constructor(private _ChatRoomService: ChatRoomService, private _UserAuthService: UserAuthService, private _ApiUserService: ApiUserService, private router: Router, public _ChatService: ChatService) {
  }

  ngOnInit(): void {
    this.currentUser = this._UserAuthService.getCurrentUserId();
     console.log('this.currentUser', this.currentUser);
    this.getAllRooms();
    this.getAllUsers();

    this._ChatService.startConnection().subscribe(() => {
      this.selectedChatRoomId = this.rooms.length > 0 ? this.rooms[0].id : 0; 
      this.updateVar(this.rooms.length > 0 ? this.rooms[0].id : 0)
    });

    this._ChatService.roomsListener().subscribe((list: IChatRoom[]) => {
      this.rooms = list;
      this.selectedChatRoomId = this.rooms.length > 0 ? this.rooms[0].id : 0;
      this.updateVar(this.rooms.length > 0 ? this.rooms[0].id : 0)
    });

    this._ChatService.messagesListener().subscribe((list: any) => {
       if(this.selectedChatRoomId == list.roomId) {
        this.messages = list.messagesList;
       }
    });

    this._ChatService.privateMessagesListener().subscribe((list: any) => {
       if((this.currentUser == list.senderId && this.selectedChatUserId == list.receiverId) || (this.currentUser == list.receiverId && this.selectedChatUserId == list.senderId)) {
          this.privateMessages = list.messagesList;
       }
    });
  }

  getAllUsers() {
    this._ApiUserService.getAllUsersChat().subscribe({
      next: (data) => {
              this.users = data;
              // this.selectedChatUserId = this.users.length > 0 ? this.users[0].id : '';
            },
            error: (err: string) => {
              console.error('There was an error!', err);
            }
          });
  }

  getAllRooms() {
    this._ChatRoomService.GetChatRooms().subscribe({
      next: (result) => {
        this.rooms = result;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  LoadRoomMessages(roomId: number) {
     this.selectedChatRoomId = roomId;
    // this.updateVar(roomId)
     this._ChatService.getRoomMessages(roomId);
  }

  LoadPrivateRoomMessages(receiverId: string, senderId: string) {
    // console.log('receiverId', receiverId);
    // console.log('senderId', senderId);

     this.selectedChatUserId = receiverId;
     this._ChatService.getPrivateMessages(receiverId, senderId);
  }

  addnewRoom() {
    Swal.fire({
      title: "اضافة غرفة دردشة جديدة",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "اضافة",
      cancelButtonText: 'الغاء',
      showLoaderOnConfirm: true,
      preConfirm: async (inputText) => {
        console.log(inputText);
        if (!inputText || inputText.trim() === '') {
          Swal.showValidationMessage('الرجاء إدخال اسم غرفة الدردشة.');
          return;
        }
        try {
          this._ChatService.receiveAddRoom(inputText);
        } catch (error) {
          Swal.showValidationMessage(`
        Request failed: ${error}
      `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {

      }
    });
  }

  deleteRoom(roomId: number, roomName: string) {

    Swal.fire({
      title: 'تأكيد الحذف',
      text: `هل أنت متأكد أنك تريد حذف غرفة الدردشة "${roomName}"؟`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'نعم',
      cancelButtonText: 'لا'
    }).then((result) => {
      if (result.isConfirmed) {
        this._ChatService.receiveDeleteRoom(roomId, roomName);
      }
    });
  }

  sendpublicMessage(roomId: number) {
     this._ChatService.SendPublicMessage(this.publicMessage, roomId);
     this.publicMessage = '';
  }

  openPrivateChat(userId: string, userName: string) {
  }

  
  sendprivateMessage() {
    this._ChatService.SendPrivateMessage(this.selectedChatUserId ,this.privateMessage);
     this.privateMessage = '';
  }


  setchatuserId(userId: string) {
    this.selectedChatUserId = userId;
    this.updateVarUser(userId);
  }
}
