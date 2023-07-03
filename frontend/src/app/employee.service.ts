import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  private baseUrl: string = "http://localhost:3000/employee";
  httpOptions: any;

  constructor(private _httpCliend: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      }),
    };
  }

  read(query?: any): Observable<any> {
    return this._httpCliend.get(this.baseUrl).pipe(
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

  // Create API Resource
  create(data: any): Observable<any> {
    return this._httpCliend.post(this.baseUrl, data, this.httpOptions).pipe(
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

  // Update API Resource
  update(id: number | string, data: any): Observable<any> {
    return this._httpCliend.put(`${this.baseUrl}/${id}`, data).pipe(
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

  // Find Category by ID API Resource
  find(id: number, query?: any): Observable<any> {
    return this._httpCliend.get(`${this.baseUrl}/${id}`).pipe(
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

  // Find Category by ID API Resource
  delete(id: number): Observable<any> {
    return this._httpCliend.delete(`${this.baseUrl}/${id}`).pipe(
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

  headerFilter: string = "";

  public getFilter(): string {
    return this.headerFilter;
  }
  public setFilter(data: any): void {
    this.headerFilter = data;
  }
}
