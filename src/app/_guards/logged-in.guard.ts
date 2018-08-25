import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from "../_services/alert.service";

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService, 
    private router : Router,
    private alertService : AlertService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.authenticationService.isLoggedIn()){
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page with the return url
        this.alertService.error("Please log in before proceeding", true);
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}