export interface IOrder {
    orderHeader:IOrderHeader,
    orderPayment:IOrderPayment,
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
export interface IOrderComplete {
    orderId:number,
    paid:number,
    moneySafeId:number,
    TechId:string,
    CompleteDate:Date,
}
export interface IOrderPayment {
    id:number,
    orderHeaderId:number,
    moneySafeId:number,
    moneySafeName:string,
    amount:number,
    date:Date,
    addedUserName:string,
}