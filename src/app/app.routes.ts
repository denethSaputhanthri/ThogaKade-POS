import { Routes } from '@angular/router';
import { Dashboard } from './page/dashboard/dashboard';
import { Customer } from './page/dashboard/customer/customer';
import { Item } from './page/dashboard/item/item';
import { Order } from './page/dashboard/order/order';

export const routes: Routes = [
    {
        path:"",
        component:Dashboard,
    },
    {
        path:"dashboard",
        component:Dashboard,
        children:[
            {
                path:"customer",
                component:Customer,
            },
            {
                path:"item",
                component:Item
            },
            {
                path:"order",
                component:Order
            },
        ],
    },
];
