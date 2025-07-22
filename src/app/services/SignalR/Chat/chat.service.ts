import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { UserAuthService } from "../../../services/user-auth.service";
import { IChatRoom, IChatUser } from '../../../models/ichatroom';
import { IPublicMessage, IPrivateMessage } from '../../../models/imessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection !: signalR.HubConnection;

  constructor( private _UserAuthService: UserAuthService) {
  }

  public startConnection1 = () => {
    let token = this._UserAuthService.getToken();
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.baseUrl2}/hubs/chat?token=` + token)
      // .withUrl(`${environment.baseUrl2}/hubs/chat`, this.hubOptions)
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connection started'))
      .catch(err => console.log('Error establishing SignalR connection: ' + err));
  }
   startConnection(): Observable<void> {
    let token = this._UserAuthService.getToken();
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.baseUrl2}/hubs/chat?token=` + token)
      .build();
    return new Observable<void>((observer) => {
      this.hubConnection
        .start()
        .then(() => {
          console.log('Connection established with SignalR hub');
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          console.error('Error connecting to SignalR hub:', error);
          observer.error(error);
        });
    });
  }
  
  ///Listeners -----------------------------
  public roomsListener(): Observable<IChatRoom[]> {
    return new Observable<IChatRoom[]>((observer) => {
      this.hubConnection.on('ReceiveAddRoomMessage', (maxRoom: Number, roomId: number, roomName: string, userId: string, userName: string, roomsList: IChatRoom[]) => {
        observer.next(roomsList);
      });
    });
  }
  public messagesListener(): Observable<any> {
    return new Observable<any>((observer) => {
      this.hubConnection.on('populateRoomMessages', (roomId: number, userId: string, messagesList: IPublicMessage[]) => {
        let list = {
          messagesList: messagesList,
          roomId: roomId,
          userId: userId
        };
        observer.next(list);
      });
    });
  }
  public privateMessagesListener(): Observable<any> {
    return new Observable<any>((observer) => {
      this.hubConnection.on('populatePrivateChat', (senderId: string, receiverId: string, messagesList: IPrivateMessage[]) => {
        let list = {
          messagesList: messagesList,
          senderId: senderId,
          receiverId: receiverId
        };
        observer.next(list);
      });
    });
  }
  public UnseenPrivateMessagesListener(): Observable<any> {
    return new Observable<any>((observer) => {
      this.hubConnection.on('receiveUnseenPrivateMessages', (receiverId: string, messagesList: IPublicMessage[]) => {
        let list = {
          messagesList: messagesList,
          receiverId: receiverId,
        };
        
        observer.next(list);
      });
    });
  }
  ///Add -----------------------------
  public receiveAddRoom = (roomName: string) => {
    this.hubConnection.send('SendAddRoom', 4, roomName)
    .catch(err => console.error(err));
  }
  
  public SendPrivateMessage = (receiverId: string, privateMessage: string) => {
    this.hubConnection.send('SendPrivateMessage', receiverId, privateMessage, '')
    .catch(err => console.error(err));
  }
  
  public SendPublicMessage = (publicMessage: string, roomId: number) => {
    this.hubConnection.send('SendPublicMessage', roomId, publicMessage, '')
    .catch(err => console.error(err));
  }
  
  ///Remove -----------------------------
  public receiveDeleteRoom = (roomId: Number, roomName: string) => {
    this.hubConnection.send('SendDelRoom', roomId, roomName)
    .catch(err => console.error(err));
  }
  
  ///Get Messages -----------------------------
  public getPrivateMessages = (receiverId: string, senderId: string) => {
    this.hubConnection.send('populatePrivateChat', senderId, receiverId)
    .catch(err => console.error(err));
  }

   public getRoomMessages = (roomId: number) => {
    this.hubConnection.send('populateRoomMessages', roomId)
    .catch(err => console.error(err));
  }

   public checkUnseenPrivateMessages = (receiverId: string) => {
    this.hubConnection.send('CheckUnseenPrivateMessages')
    .catch(err => console.error(err));
  }


  //-----------------------------------------------------



  // startConnection  (): Observable<void> {
  //   return new Observable<void>((observer) => {
  //     this.hubConnection
  //       .start()
  //       .then(() => {
  //         console.log('Connection established with SignalR hub');
  //         observer.next();
  //         observer.complete();
  //       })
  //       .catch((error) => {
  //         console.error('Error connecting to SignalR hub:', error);
  //         observer.error(error);
  //       });
  //   });
  // }

  // receiveAddRoom(roomName: string): Observable<string> {
  //   return new Observable<string>((observer) => {
  //     this.hubConnection.on('SendAddRoom', (roomName: string) => {
  //       observer.next(roomName);
  //     });
  //   });
  // }

  // receiveMessage(roomId: Number): Observable<string> {
  //   return new Observable<string>((observer) => {
  //     this.hubConnection.on('SendDelRoom', (roomId: Number) => {
  //       observer.next(roomId.toString());
  //     });
  //   });
  // }

  // sendMessage(message: string): void {
  //   this.hubConnection.invoke('SendMessage', message);
  // }

  public handleDisconnects = () => {
    this.hubConnection.onclose(() => {
      console.log('Connection lost. Attempting to reconnect...');
      setTimeout(() => this.startConnection(), 3000);  // Try reconnecting after 3 seconds
    });
  }

  //------------------------

  // public PopulateMessages() {
  //   var roomActiveTap = document.querySelector('a.active[id^="room"][id$="-tab"]');
  //   var rid = roomActiveTap.id.split("-");

  //   this.hubConnection.send("populateRoomMessages", Number(rid[0].substring(4)));
  // }


}
