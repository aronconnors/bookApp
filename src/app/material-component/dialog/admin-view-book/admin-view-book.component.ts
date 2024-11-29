import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-view-book',
  templateUrl: './admin-view-book.component.html',
  styleUrls: ['./admin-view-book.component.scss']
})
export class AdminViewBookComponent implements OnInit {
  dataSource:any;
  data:any;
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  public dialogRef: MatDialogRef<AdminViewBookComponent>) { }

  ngOnInit(): void {
    this.data = this.dialogData.data;
    this.dataSource = this.dialogData.data;
  }

}
