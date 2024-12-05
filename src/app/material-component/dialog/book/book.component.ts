import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import { ReviewService } from 'src/app/services/review.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  onAddBook = new EventEmitter();
  onEditBook = new EventEmitter();
  bookForm:any = FormGroup;
  dialogAction:any = "Add";
  action:any = "Add";
  responseMessage:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder:FormBuilder,
  private reviewService:ReviewService,
  private userService:UserService,
  private bookService:BookService,
  public dialogRef:MatDialogRef<BookComponent>,
  private snackbarService:SnackbarService) { }

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      isbn13:[null,[Validators.required]],
      isbn10:[null,[Validators.required]],
      title:[null,[Validators.required]],
      authors:[null,[Validators.required]],
      categories:[null,[Validators.required]],
      thumbail:[null,[Validators.required]],
      description:[null,[Validators.required]],
      published_year:[null,[Validators.required]],
      num_pages:[null,[Validators.required]],
    });
    if(this.dialogData.action === 'Edit'){
      this.dialogAction = "Edit";
      this.action = "Update";
      this.bookForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit(){
    if(this.dialogAction == "Edit"){
      this.edit();
    }
    else{
      this.add();
    }
  }

  async add(){
    var formData = this.bookForm.value;
    var data = {
      isbn13: formData.isbn13,
      isbn10: formData.isbn10,
      title: formData.title,
      authors: formData.authors,
      categories: formData.categories,
      thumbail: formData.thumbnail,
      description: formData.description,
      published_year: formData.published_year,
      num_pages: formData.published_year
    }
    this.bookService.addBook(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddBook.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
      this.dialogRef.close();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })

  }

  edit(){
    var formData = this.bookForm.value;
    var data = {
      bookId: this.dialogData.bookId,
      isbn13: formData.isbn13,
      isbn10: formData.isbn10,
      title: formData.title,
      authors: formData.authors,
      categories: formData.categories,
      thumbail: formData.thumbnail,
      description: formData.description,
      published_year: formData.published_year,
      num_pages: formData.published_year
    }
    this.bookService.editBook(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onEditBook.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
      this.dialogRef.close();
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
