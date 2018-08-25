import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../_services/user.service";
import { AuthenticationService } from "../_services/authentication.service";
import { AlertService } from "../_services/alert.service";

import {Subscription} from 'rxjs/Subscription';

import {User} from "../_models/user";

@Component({
    selector : "<app-login></app-login>",
    templateUrl : "login.component.html",
    // styleUrls : ["../../assets/css/pages/page_log_reg_v2.css"]
})

export class LoginComponent implements OnInit{
    model: any = {};
    loading = false;
    returnUrl: string;
    user : User;
    subscription : Subscription;

    constructor(
        private route : ActivatedRoute,
        private userService : UserService,
        private router : Router,
        private authenticationService : AuthenticationService,
        private alertService : AlertService
    ){

    }

    ngOnInit() : void {

        // get return url from route parameters or default to '/'
        // this.authenticationService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        
         this.authenticationService.getUser().subscribe(userObservable => {
          this.user = userObservable;

            if (this.user != null){
                if(this.authenticationService.isLoggedIn()){
                    this.alertService.error(this.user.username +' is already logged in.', true);
                    this.router.navigate([this.returnUrl]);
                }
            }
         
        });

       
        
    }

    submit() : void {
        

        this.loading = true;

        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.alertService.success('Successfully logged in', true);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}