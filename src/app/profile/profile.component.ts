import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";

import { User } from "../_models/user";
import { UserService } from "../_services/user.service";
import { AlertService } from "../_services/alert.service";

@Component({
    selector : "<app-profile></app-profile>",
    templateUrl : "profile.component.html"
})

export class ProfileComponent implements OnInit{
    
    // @Input()
    user : User;
    model: any = {};
    tooglePasswordChange : boolean = false;

    constructor(
        private userService : UserService,
        private route : ActivatedRoute,
        private alertService : AlertService,
        private location : Location
    ){

    }
   

    ngOnInit(): void {
        this.route.params
            .switchMap((params : Params) => this.userService.getProfile(params['username']))
            .subscribe(user => {
                this.user = user;
                
                this.model._id = user._id;
                this.model.firstName = user.firstName;
                this.model.lastName = user.lastName;
                this.model.username = user.username;
                this.model.email = user.email;
                this.model.bio = user.bio;

            });
    }

    setTooglePasswordChange() : void{
        this.tooglePasswordChange = ! this.tooglePasswordChange;
    }

    submit() : void {
        var user  : User = {
            _id : this.model._id,
            firstName : this.model.firstName,
            lastName : this.model.lastName,
            email : this.model.email,
            username : this.model.username,
            bio : this.model.bio
        };

        this.userService.edit(user)
            .subscribe(
                data => {
                    this.alertService.success('Successfully edited', true);
                    this.goBack();
                },
                error => {
                    this.alertService.error(error);
                    
                });
    }

     goBack() {
        this.location.back();
    }

    updatePass(){
        console.log("info has been posted ");
        var updateInfo  = {
            username : this.user.username,
            currentPassword : this.model.currentPassword,
            newPassword : this.model.newPassword,

        };

        this.userService.updatePass(updateInfo)
            .subscribe(
                data => {
                    this.alertService.success('Successfully updated the password', true);
                    this.goBack();
                },
                error => {
                    this.alertService.error(error);
                    
                });
    }
}


    


    

   