export interface CustomerModel{
    id:string;
    title:string;
    name:string;
    dobValue:Object;
    salary:number;
    address:string;
    city:string;
    province:string;
    postalCode:string;
}

export interface ItemModel{
    id:string,
    description:string,
    packSize:string,
    unitPrice:number,
    qty:number,
}

export interface OrderModel{
    id:string,
    orderDate:Date,
    customerId:string,
}