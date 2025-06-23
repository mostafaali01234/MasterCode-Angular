export interface IOrder {
    orderHeader:IOrderHeader,
    orderDetailsList:IOrderDetail[]
}
export interface IOrderHeader {
    id:number,//
    orderStatus:string,//
    paymentStatus:string,//
    orderNotes:string,//
    orderTotal:number,
    customerId:number,//
    customerName:string,//
    applicationUserId:string,//
    applicationUserName:string,//
    techId:string,//
    techName:string,//
    orderDate:Date,//
    installDate:Date//
}
export interface IOrderDetail {
    id:number,
    productId:number,
    productName:string,
    count:number,
    price:number,
    totalPrice:number,
}
