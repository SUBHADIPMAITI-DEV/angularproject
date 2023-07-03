import { Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private loginUrl: string = "http://localhost:3000/login";
  private logOutUrl: string = "http://localhost:3000/logout";

  constructor(private _httpClient: HttpClient) {}
  // login
  login(data: any): Observable<any> {
    return this._httpClient.post(this.loginUrl, data).pipe(
      tap({
        next: (res) => {
          return res;
        },
        error: (err) => {
          return err;
        },
      })
    );
  }
  // logout
  logout(data: any): Observable<any> {
    return this._httpClient.post(this.logOutUrl, data).pipe(
      tap({
        next: (res) => {
          return res;
        },
        error: (err) => {
          return err;
        },
      })
    );
  }
}
