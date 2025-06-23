export interface IUser {
    UserName:string,
    Password:string,
    rememberMe:boolean,
}

export interface IUserSelect {
    id:string,
    name:string,
    userName:string,
    email:string,
    phone:string,
    jobId:number,
    jobName:string,
    password:string,
}


export interface IUserEditInfo {
    id:string,
    name:string,
    userName:string,
    email:string,
    phone:string,
    jobId:number,
    roleId:string,
}

export interface IUserEditPassword {
    id:string,
    oldpassword:string,
    password:string,
    confirmPassword:string,
}



export interface IUserBalance {
    operationId:number,
    operationType:string,
    operationDate:Date
    moneysafeName:string,
    operationNotes:string,
    operationTotal:number,
    balance:number,
}
