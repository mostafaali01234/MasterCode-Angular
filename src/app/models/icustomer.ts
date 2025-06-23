export interface ICustomer {
    id:number,
    customerName:string,
    customerPhoneNumber:string,
    customerAddress:string,
    addedUserName:string,
    applicationUserId:string
}

export interface ICustomerMoves {
    opId:number,
    opDate:Date,
    opType:string,
    opNotes:string,
    opTotal:number,
    balance:number
}

export interface ICustomerMovesReturnList {
    customer:ICustomer,
    movesList:ICustomerMoves[]
}

