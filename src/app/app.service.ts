import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  private url ="https://chatapi.edwisor.com";

  constructor( private http: HttpClient ) { }

  public getUserInfoFormLocalStorage=()=>{
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  public setUserInfoInLocalStorage=(data)=>{
    localStorage.setItem('userInfo',JSON.stringify(data));
  }

  public signupFunction(data): Observable<any> {
    const params = new HttpParams()
    .set('firstName', data.firstName)
    .set('lastName', data.lastName)
    .set('mobile', data.mobile)
    .set('email', data.email)
    .set('password', data.password)
    .set('apiKey', data.apiKey)
    return this.http.post(`${this.url}/api/v1/users/signup`, params);
  }
  // end of signupFunction function.
  public signinFunction(data):Observable<any>{
    const params = new HttpParams()
    .set('email', data.email)
    .set('password', data.password);
    return this.http.post(`${this.url}/api/v1/users/login`, params);
  }
  // end of signinFunction function

  private handleError(err: HttpErrorResponse){
    let errorMessage = '';
    if(err.error instanceof Error){
      errorMessage = `An error occured:${err.error.message}`;
    }
  }
}
