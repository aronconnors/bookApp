import { Component, AfterViewInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';
import { UserService } from '../services/user.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
	responseMessage:any;
	data:any;
	ngAfterViewInit() { }

	constructor(private userService:UserService,
		private ngxService:NgxUiLoaderService,
		private snackbarService:SnackbarService) {
			this.ngxService.start();
			this.dashboardData();
	}

	dashboardData(){
		this.userService.getUser().subscribe((response:any)=>{
			this.ngxService.stop();
			this.data = response[0].username;
		},(error:any)=>{
			this.ngxService.stop();
			console.log(error);
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