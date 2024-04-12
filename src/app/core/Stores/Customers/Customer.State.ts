import { createEntityAdapter } from "@ngrx/entity";
import { CustomerModel, Customers } from "../../../shared/cutomer-model";

export const customerAdapter = createEntityAdapter<Customers>();

export const customerState: CustomerModel = customerAdapter.getInitialState({
    customerInfo:{
        id: 0,
      username: '',
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      birthdate: '',
      interests: [],
      isActive: false,
      role: '',
      mobilenumber: '',
      dateCreated: '',
      dateUpdated: ''

      
    }
});