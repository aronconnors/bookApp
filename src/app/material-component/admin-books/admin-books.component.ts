import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { ViewBillProductsComponent } from '../dialog/view-bill-products/view-bill-products.component';
import { MatTableDataSource } from '@angular/material/table';
import { BookService } from 'src/app/services/book.service';
import { AdminViewBookComponent } from '../dialog/admin-view-book/admin-view-book.component';
import { BookComponent } from '../dialog/book/book.component';

@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.scss']
})
export class AdminBooksComponent implements OnInit {
  displayedColumns: string[] = ['title', 'authors', 'categories', 'published_year', 'action'];
  dataSource:any;
  responseMessage:any;

  constructor(private bookService:BookService,
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private snackbarService:SnackbarService,
    private router:Router) { }

    ngOnInit(): void {
    }
  
    tableData(value:string){
      var query = { search: value };
      this.ngxService.start();
      this.bookService.searchBooks(query).subscribe((response:any)=>{
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
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
  
    applyFilter(event:Event){
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    handleViewAction(values:any){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data ={
        data:values
      };
      dialogConfig.width = '100%';
      const dialogRef = this.dialog.open(AdminViewBookComponent,dialogConfig);
      this.router.events.subscribe(()=>{
        dialogRef.close();
      })
    }

    handleAddAction(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        action: 'Add'
      }
      dialogConfig.width = "850px";
      const dialogRef = this.dialog.open(BookComponent,dialogConfig);
      this.router.events.subscribe(()=>{
        dialogRef.close();
      });
      const sub = dialogRef.componentInstance.onAddBook.subscribe(
        (response)=>{
          const inputValue = (document.getElementById('searchInput') as HTMLInputElement).value;
          this.tableData(inputValue);
        }
      )
    }

    handleEditAction(values:any){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        action: 'Edit',
        bookId: values.bookId,
        title: values.title,
        data:values
      }
      dialogConfig.width = "850px";
      const dialogRef = this.dialog.open(BookComponent,dialogConfig);
      this.router.events.subscribe(()=>{
        dialogRef.close();
      });
      const sub = dialogRef.componentInstance.onEditBook.subscribe(
        (response)=>{
          const inputValue = (document.getElementById('searchInput') as HTMLInputElement).value;
          this.tableData(inputValue);
        }
      )
    }
  
    downloadReportAction(values:any){
      this.ngxService.start();
      var data = {
        name:values.name,
        email:values.email,
        uuid:values.uuid,
        contactNumber:values.contactnumber,
        paymentMethod:values.paymentmethod,
        totalAmount:values.total,
        productDetails:values.productdetails
      }
      this.bookService.getPDF(data).subscribe(
        (response)=>{
          //saveAs(response,values.uuid+'.pdf');
          this.ngxService.stop();
        }
      )
    }
    
    handleDeleteAction(values:any){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        message: 'delete '+values.name+' bill'
      };
      const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
      const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
        this.ngxService.start();
        this.deleteProduct(values.id);
        dialogRef.close();
      })
    }
  
    deleteProduct(id:any){
      this.bookService.delete(id).subscribe((response:any)=>{
        this.ngxService.stop();
        //this.tableData();
        this.responseMessage = response?.message;
        this.snackbarService.openSnackBar(this.responseMessage,"success");
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
  }
  