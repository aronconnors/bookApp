import { Routes } from '@angular/router';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ViewbooksComponent } from './viewbooks/viewbooks.component';
import { AdminBooksComponent } from './admin-books/admin-books.component';
import { AdminReviewsComponent } from './admin-reviews/admin-reviews.component';
import { MyreviewsComponent } from './myreviews/myreviews.component';



export const MaterialRoutes: Routes = [
    {
        path:'adminBook',
        component:AdminBooksComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['admin']
        }
    },
    {
        path:'adminReviews',
        component:AdminReviewsComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['admin']
        }
    },
    {
        path:'user',
        component:ManageUserComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['admin']
        }
    },
    {
        path:'book',
        component:ViewbooksComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['user']
        }
    },
    {
        path:'myreviews',
        component:MyreviewsComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['user']
        }
    }
];
 