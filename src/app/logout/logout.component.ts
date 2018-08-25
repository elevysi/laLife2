import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthenticationService } from "../_services/authentication.service";
import { AlertService } from "../_services/alert.service";

@Component({
    selector : "<app-logout></app-logout>",
    template : ``
})

export class LogoutComponent implements OnInit{


    constructor(
        private authenticationService : AuthenticationService,
        private router : Router,
        private alertService : AlertService
    ){

    }

    ngOnInit(): void {
        if(this.authenticationService.logout()){
            this.alertService.success('Successfully logged out', true);
        }
        this.router.navigate(['']);       
    }
}