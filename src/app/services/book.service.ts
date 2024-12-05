import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  url = environment.apiUrl;


  constructor(private httpClient:HttpClient) { }
  generateReport(data:any){
    return this.httpClient.post(this.url+"/bill/generateReport/",data,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }

  getPDF(data:any):Observable<Blob>{
    return this.httpClient.post(this.url + "/bill/getPdf",data,{responseType:'blob'}
    );
  }

  getBills(){
    return this.httpClient.get(this.url+"/book/getBooks/");
  }

  getBooks(){
    return this.httpClient.get(this.url+"/book/getBooks/");
  }

  searchBooks(data:any){
    return this.httpClient.post(this.url+
      "/book/searchBooks/",data,{
        headers: new HttpHeaders().set('Content-Type', "application/json")
      }
    )
  }

  addBook(data:any){
    return this.httpClient.get(this.url+"/book/getBooks/");
  }
  editBook(data:any){
    return this.httpClient.get(this.url+"/book/getBooks/");
  }

  delete(id:any){
    return this.httpClient.delete(this.url+"/bill/delete/"+id,{
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  } 
}
