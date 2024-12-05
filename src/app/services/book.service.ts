import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  url = environment.apiUrl;


  constructor(private httpClient:HttpClient) { }

  searchBooks(data:any){
    return this.httpClient.post(this.url+
      "/book/searchBooks/",data,{
        headers: new HttpHeaders().set('Content-Type', "application/json")
      }
    )
  }

  addBook(data: any) {
    return this.httpClient.post(this.url +
      "/book/addBook/", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    }
    )
  }

  editBook(data: any) {
    return this.httpClient.patch(this.url +
      "/book/editBook/", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    }
    )
  }
}
