import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BookService } from 'src/app/services/book.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { ViewBillProductsComponent } from '../dialog/view-bill-products/view-bill-products.component';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ViewReviewComponent } from '../dialog/view-review/view-review.component';
import { ReviewComponent } from '../dialog/review/review.component';

@Component({
  selector: 'app-viewbooks',
  templateUrl: './viewbooks.component.html',
  styleUrls: ['./viewbooks.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ViewbooksComponent implements OnInit {
  displayedColumns: string[] = ['title', 'authors', 'categories', 'published_year'];
  innerDisplayedColumns: string[] = ['username', 'date', 'rating', 'view'];
  expandedElement!: any | null;
  dataSource:any;
  responseMessage:any;

  constructor(private bookService:BookService,
    private cd: ChangeDetectorRef,
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

    handleAddAction(values:any){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        action: 'Add',
        bookId: values._id,
        title: values.title
      }
      dialogConfig.width = "850px";
      const dialogRef = this.dialog.open(ReviewComponent,dialogConfig);
      this.router.events.subscribe(()=>{
        dialogRef.close();
      });
      const sub = dialogRef.componentInstance.onAddReview.subscribe(
        (response)=>{
          const inputValue = (document.getElementById('searchInput') as HTMLInputElement).value;
          this.tableData(inputValue);
        }
      )
    }

    toggleRow(element: any) {
      element ?
        (this.expandedElement = this.expandedElement === element ? null : element) : null;
      this.cd.detectChanges();
    }
  
    handleViewAction(values:any){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data ={
        data:values
      };
      dialogConfig.width = '100%';
      const dialogRef = this.dialog.open(ViewReviewComponent,dialogConfig);
      this.router.events.subscribe(()=>{
        dialogRef.close();
      })
    }

    handleDeleteAction(event: Event, values: any){}
    handleEditAction(event: Event, values: any){}
    
  }
  