import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  signup(data: any) {
    return this.httpClient.post(this.url +
      "/user/signup/", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  login(data:any){
    return this.httpClient.post(this.url+
      "/user/login/",data,{
        headers: new HttpHeaders().set('Content-Type',"application/json")
      }
    )
  }

  checkToken(){
    return this.httpClient.get(this.url + "/user/checkToken");
  }

  getUser(){
    return this.httpClient.get(this.url+"/user/getUser/");
  }

  adminGetUsers(){
    return this.httpClient.get(this.url+"/user/adminGetUsers/");
  }

  update(data:any){
    return this.httpClient.patch(this.url+"/user/update",data,{
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }
}