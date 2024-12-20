import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ViewbooksComponent } from './viewbooks/viewbooks.component';
import { MyreviewsComponent } from './myreviews/myreviews.component';
import { AdminBooksComponent } from './admin-books/admin-books.component';
import { AdminReviewsComponent } from './admin-reviews/admin-reviews.component';
import { ViewReviewComponent } from './dialog/view-review/view-review.component';
import { AdminViewBookComponent } from './dialog/admin-view-book/admin-view-book.component';
import { ReviewComponent } from './dialog/review/review.component';
import { BookComponent } from './dialog/book/book.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  declarations: [
    ConfirmationComponent,
    ManageUserComponent,
    ViewbooksComponent,
    MyreviewsComponent,
    AdminBooksComponent,
    AdminReviewsComponent,
    ViewReviewComponent,
    AdminViewBookComponent,
    ReviewComponent,
    BookComponent    
  ]
})
export class MaterialComponentsModule {}
