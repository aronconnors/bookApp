import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }
  getReviews() {
    return this.httpClient.get(this.url + "/review/getReviews/");
  }

  adminGetReviews(data: any) {
    return this.httpClient.post(this.url +
      "/review/adminGetReviews/", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    }
    )
  }

  deleteReview(data: any) {
    return this.httpClient.patch(this.url + 
      "/review/deleteReview/", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  adminDeleteReview(data: any, user: string) {
    const requestData = { ...data, user };
    return this.httpClient.patch(this.url + 
      "/review/adminDeleteReview/", requestData, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  addReview(data: any) {
    return this.httpClient.patch(this.url +
      "/review/postReview/", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    }
    )
  }

  editReview(data: any) {
    return this.httpClient.patch(this.url +
      "/review/editReview/", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    }
    )
  }
}
