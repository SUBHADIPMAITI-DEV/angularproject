import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, 
  CanActivate, 
  RouterStateSnapshot, 
  UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(
        localStorage.getItem('token') == null
      ){
        console.log("Auth guard")
        this.router.navigate(['/login']); // go to login if not authenticated
        return false; 
      }
    return true;
  }
  
}
