export interface IMoneysafe {
    id:number,
    name:string,
    openingBalance:number,
    currentBalance:number,
    applicationUser:string,
    applicationUserId:string,
}

export interface IMoneysafeMoves {
    opId:number,
    opDate:Date,
    opType:string,
    opNotes:string,
    opTotal:number,
    balance:number
}

export interface IMoneysafeMovesReturnList {
    moneysafe:IMoneysafe,
    movesList:IMoneysafeMoves[]
}
