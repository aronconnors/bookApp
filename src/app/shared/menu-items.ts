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