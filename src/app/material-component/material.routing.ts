import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ViewBillComponent } from './view-bill/view-bill.component';
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
        path:'category',
        component:ManageCategoryComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['admin']
        }
    },
    {
        path:'product',
        component:ManageProductComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['admin']
        }
    },
    {
        path:'order',
        component:ManageOrderComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['admin','user']
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
        path:'bill',
        component:ViewBillComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole:['user']
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
 