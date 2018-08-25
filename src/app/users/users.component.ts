import { Component, OnInit } from "@angular/core";
import { User } from "../_models/user";
import { UserService } from "../_services/user.service";
import { AlertService } from "../_services/alert.service";

import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";

@Component({
    selector : "<app-profile></app-profile>",
    templateUrl : "users.component.html"
})

export class UsersComponent implements OnInit{
    users : User[];
    constructor(
        private userService : UserService,
        private route : ActivatedRoute,
        private alertService : AlertService,
        private location : Location
    ){

    }

    ngOnInit() : void {

        this.userService.getUsers()
            .then((users) => {
                if(users){
                   this.users = users; 
                }
            });

    }

    delete(id : String): void {
        
        this.userService.delete(id)
            .subscribe(
                data => {
                    this.alertService.success('Successfully deleted', true);
                    this.goBack();
                },
                error => {
                    this.alertService.error(error);
                    
                });
    }

    goBack() : void {
        this.location.back();
    }

}