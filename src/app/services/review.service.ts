import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }
  generateReport(data: any) {
    return this.httpClient.post(this.url + "/bill/generateReport/", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  getPDF(data: any): Observable<Blob> {
    return this.httpClient.post(this.url + "/bill/getPdf", data, { responseType: 'blob' }
    );
  }

  getBills() {
    return this.httpClient.get(this.url + "/bill/getBills/");
  }

  getReviews() {
    return this.httpClient.get(this.url + "/user/getReviews/");
  }

  adminGetReviews(data: any) {
    return this.httpClient.post(this.url +
      "/user/adminGetReviews/", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    }
    )
  }

  delete(id: any) {
    return this.httpClient.delete(this.url + "/bill/delete/" + id, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  deleteReview(data: any) {
    return this.httpClient.patch(this.url + 
      "/user/deleteReview/", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  adminDeleteReview(data: any, user: string) {
    const requestData = { ...data, user };
    return this.httpClient.patch(this.url + 
      "/user/adminDeleteReview/", requestData, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  addReview(data: any) {
    return this.httpClient.patch(this.url +
      "/book/postReview/", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    }
    )
  }

  editReview(data: any) {
    return this.httpClient.patch(this.url +
      "/book/editReview/", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    }
    )
  }
}
