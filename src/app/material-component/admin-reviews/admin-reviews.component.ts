import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ReviewService } from 'src/app/services/review.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { MatTableDataSource } from '@angular/material/table';
import { ViewBillProductsComponent } from '../dialog/view-bill-products/view-bill-products.component';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewReviewComponent } from '../dialog/view-review/view-review.component';

@Component({
  selector: 'app-admin-reviews',
  templateUrl: './admin-reviews.component.html',
  styleUrls: ['./admin-reviews.component.scss']
})
export class AdminReviewsComponent implements OnInit {
  displayedColumns: string[] = ['title', 'rating', 'timestamp', 'view'];
  selectUserForm: any = FormGroup;
  users: any = [];
  dataSource: any;
  responseMessage: any;

  constructor(private formBuilder: FormBuilder,
    private reviewService: ReviewService,
    private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router) { }

  ngOnInit(): void {
    this.ngxService.start();
      this.getUsers();
      this.selectUserForm = this.formBuilder.group({
        user: [null, [Validators.required]]
      })
  }

  getUsers(){
    this.userService.adminGetUsers().subscribe((response:any)=>{
      this.ngxService.stop();
      this.users = response;
    },(error:any)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  tableData(value:string) {
    var user = { username: value };
    this.ngxService.start();
    this.reviewService.adminGetReviews(user).subscribe((response: any) => {
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response[0].reviews);
    }, (error: any) => {
      this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleViewAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      data: values
    };
    dialogConfig.width = '100%';
    const dialogRef = this.dialog.open(ViewReviewComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    })
  }

  downloadReportAction(values: any) {
    this.ngxService.start();
    var data = {
      name: values.name,
      email: values.email,
      uuid: values.uuid,
      contactNumber: values.contactnumber,
      paymentMethod: values.paymentmethod,
      totalAmount: values.total,
      productDetails: values.productdetails
    }
    this.reviewService.getPDF(data).subscribe(
      (response) => {
        //saveAs(response,values.uuid+'.pdf');
        this.ngxService.stop();
      }
    )
  }

  handleDeleteAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'delete ' + values.name + ' bill'
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response) => {
      this.ngxService.start();
      this.deleteProduct(values.id);
      dialogRef.close();
    })
  }

  deleteProduct(id: any) {
    
    this.reviewService.delete(id).subscribe((response: any) => {
      this.ngxService.stop();
      this.tableData('user');
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error: any) => {
      this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }
}



