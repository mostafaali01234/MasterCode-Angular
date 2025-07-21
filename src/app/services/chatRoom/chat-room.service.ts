import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from '../user-auth.service';
import { IChatRoom,IChatUser } from '../../models/ichatroom';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {

  constructor(private httpClient: HttpClient, private _userAuthService: UserAuthService) { }

  GetChatRooms(): Observable<IChatRoom[]> {
    return this.httpClient.get<IChatRoom[]>(`${environment.baseUrl}/ChatRooms/GetChatRoom`,
    )
  } 

  GetChatUsers(): Observable<IChatUser[]> {
    return this.httpClient.get<IChatUser[]>(`${environment.baseUrl}/ChatRooms/GetChatUser`,
    )
  } 

  createChatRoom(roomName: string): Observable<IChatRoom> {
    let newRoom: IChatRoom = {
      id: 0,
      name: roomName
    }
    return this.httpClient.post<IChatRoom>(`${environment.baseUrl}/ChatRooms/PostChatRoom`, newRoom)
  }


  deleteChatRoom(id: number) {
    return this.httpClient.delete(`${environment.baseUrl}/ChatRooms/${id}`)
  }


}
