import { createEntityAdapter } from "@ngrx/entity";
import { UserModels, Users, UsersModel } from "../../../shared/modles/users-model";


export const UserState:UsersModel={
    list:[],
    errormessage:"",
    userobj:{
        id:0,
        username:"",
        firstName:"",
        middleName:"",
        lastName:"",
        password:"",
        email:"",
        birthdate: new Date(),
        mobilenumber:"",
        role:"",
        isActive:true   
    }
}

export const UserAdapter = createEntityAdapter<Users>();

export const UserStates: UserModels = UserAdapter.getInitialState({
    isDuplicate: false
});