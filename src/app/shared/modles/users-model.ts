import { EntityState } from "@ngrx/entity"

export interface Users {
    id:number,
    username:string,
    firstName:string,
    middleName:string,
    lastName:string,
    password:string,
    email:string,
    birthdate: Date,
    mobilenumber:string,
    role:string,
    isActive:boolean
}

export interface Usercred{
    username:string,
    password:string
}

export interface Roles{
    code:string,
    name:string
}


export interface Roleaccess{
    role:string,
    menu:string
}

export interface UsersModel{
    list:Users[],
    userobj:Users,
    errormessage:string
}

export interface Userinfo{
    id:number,
    username:string,
    name:string,
    email:string,
    role:string,
    isActive:boolean
}

export interface UserModels extends EntityState<Users>{
    isDuplicate:boolean;
}