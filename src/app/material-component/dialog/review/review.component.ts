import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReviewService } from 'src/app/services/review.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  onAddReview = new EventEmitter();
  onEditReview = new EventEmitter();
  reviewForm:any = FormGroup;
  dialogAction:any = "Add";
  action:any = "Add";
  responseMessage:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
private formBuilder:FormBuilder,
private reviewService:ReviewService,
private userService:UserService,
public dialogRef:MatDialogRef<ReviewComponent>,
private snackbarService:SnackbarService) { }

  ngOnInit(): void {
    this.reviewForm = this.formBuilder.group({
      rating:[null,[Validators.required]],
      review:[null,[Validators.required]]
    });
    if(this.dialogData.action === 'Edit'){
      this.dialogAction = "Edit";
      this.action = "Update";
      this.reviewForm.patchValue(this.dialogData.data);
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
    var formData = this.reviewForm.value;
    var data = {
      bookId: this.dialogData.bookId,
      title: this.dialogData.title,
      rating: formData.rating,
      review: formData.review
    }
    this.reviewService.addReview(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddReview.emit();
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
    var formData = this.reviewForm.value;
    var data = {
      bookId: this.dialogData.bookId,
      title: this.dialogData.title,
      rating: formData.rating,
      review: formData.review
    }
    this.reviewService.editReview(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onEditReview.emit();
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