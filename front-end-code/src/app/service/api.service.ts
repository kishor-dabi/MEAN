import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http"
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import "rxjs/Rx"

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { share } from 'rxjs/operators';


var apiUrl = "http://localhost:8080/api/"

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private router: Router, private http: HttpClient) { }
    /*login method*/
    Login(end_point, data) {
       
        return this.http.post(apiUrl + end_point, data)//.map(this.handleSuccess).catch(this.handleError);
    }

    /*method for post request */
    POST(end_point, data) {
        return this.http.post(apiUrl + end_point, data, this.jwt())//.map(this.handleSuccess).catch(this.handleError);
    }

    /*method for post request */
    REGISTER(end_point, data) {
        return this.http.post(apiUrl + end_point, data)//.map(this.handleSuccess).catch(this.handleError);
    }

    /*method for update */
    PUT(end_point, data) {
        return this.http.put(apiUrl + end_point, data, this.jwt())//.map(this.handleSuccess).catch(this.handleError);
    }

    /*method for update */
    GET(end_point) {
        return this.http.get(apiUrl + end_point,  this.jwt())//.map(this.handleSuccess).catch(this.handleError);
    }

    /*delete method*/
    DELETE(end_point) {
        return this.http.delete(apiUrl + end_point, this.jwt())//.map(this.handleSuccess).catch(this.handleError);
    }

    private handleSuccess(res: HttpResponse<any>) {
        return res;
    }

    private handleError(error: any) {
        return Observable.throw(error);
    }

    private jwt() {
        // Hardcoded for testing purpose only
        var token = localStorage.getItem("token");
        if (!token) {
            this.router.navigate(['/login']);
            return;
        }
        let headers = {
            headers: new HttpHeaders(
                {
                    'Authorization': "JWT "+token
                })
        }
        return headers;
    }
}
