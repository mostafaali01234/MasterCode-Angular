export interface IPublicMessage {
    roomId:number,
    roomName:string,
    message:string,
    senderId:string,
    senderName:string,
    time:Date
}
export interface IPrivateMessage {
    id:number,
    message:string,
    senderId:string,
    receiverId:string,
    time:Date,
    seen:boolean,
}
