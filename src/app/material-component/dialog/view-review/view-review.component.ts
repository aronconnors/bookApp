import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-review',
  templateUrl: './view-review.component.html',
  styleUrls: ['./view-review.component.scss']
})
export class ViewReviewComponent implements OnInit {
  dataSource:any;
  data:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
public dialogRef: MatDialogRef<ViewReviewComponent>) { }

  ngOnInit() {
    this.data = this.dialogData.data;
    this.dataSource = this.dialogData.data;
  }
}
