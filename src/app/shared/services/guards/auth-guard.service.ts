import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth:AuthService,private router:Router) { }

  canActivate(route, state: RouterStateSnapshot):Observable<boolean>{
 return this.auth.user$.pipe(map(user=>{
   if(user) return true;

   else {
     this.router.navigate(['/login']);
     return false;
   }
 }))
}
}
