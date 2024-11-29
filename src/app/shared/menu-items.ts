import { Injectable } from "@angular/core";

export interface Menu{
    state:string;
    name:string;
    icon:string;
    role:string;
}

const MENUITEMS = [
    {state:'dashboard', name:'Dashboard', icon:'dashboard',role:''},
    {state:'adminBook', name:'Admin Book', icon:'category',role:'admin'},
    {state:'adminReviews', name:'Admin Reviews', icon:'category',role:'admin'},
    //{state:'category', name:'Manage Category', icon:'category',role:'admin'},
    //{state:'product', name:'Manage Product', icon:'inventory_2',role:'admin'},
    //{state:'order', name: 'Manage Order', icon:'list_alt', role:''},
    //{state:'bill', name: 'View Bill', icon:'import_contacts', role:''},
    {state:'user', name: 'Manage User', icon:'people', role:'admin'},
    {state:'book', name: 'Books', icon:'book', role:'user'},
    {state:'myreviews', name: 'My Reviews', icon:'book', role:'user'}
];

@Injectable()
export class MenuItems{
    getMenuItem(): Menu[]{
        return MENUITEMS
    }
}