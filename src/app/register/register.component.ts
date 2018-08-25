import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../_services/user.service";
import { AlertService } from "../_services/alert.service";
import { ValidationService } from "../_services/validation-service";

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { User } from "../_models/user";

@Component({
    selector : "<app-register></app-register>",
    templateUrl : "register.component.html",
    // styleUrls : ["../../assets/css/pages/page_log_reg_v2.css"]
})

export class RegisterComponent{

    model: any = {};

    email : String;
    password : String;
    name : String;
    loading : false;

//https://coryrylan.com/blog/angular-form-builder-and-validation-management
    registrationForm: FormGroup;

    constructor(
        private userService : UserService,
        private router : Router,
        private alertService : AlertService,
        @Inject(FormBuilder) fb: FormBuilder
    ){
        this.registrationForm = fb.group({
            'username': ['', [Validators.required, Validators.minLength(3)]],
            'firstName': ['', [Validators.required, Validators.minLength(3)]],
            'lastName': ['', [Validators.required, Validators.minLength(3)]],
            'email': ['', [Validators.required, ValidationService.emailValidator]],
            'password': ['', Validators.required],
            'confirmPassword': ['', Validators.required],
            'bio': ['', [Validators.required, Validators.minLength(10)]]
        });
    }
    

    submit() : void {

        console.log("The form is submitted.");

        if (this.registrationForm.dirty && this.registrationForm.valid) {
            // alert(`Name: ${this.registrationForm.value.name} Email: ${this.registrationForm.value.email}`);

            var user  : User = {
                firstName : this.registrationForm.value.firstName,
                lastName : this.registrationForm.value.lastName,
                email : this.registrationForm.value.email,
                password : this.registrationForm.value.password,
                username : this.registrationForm.value.username,
                bio : this.registrationForm.value.bio,
            };

            this.userService.registerUser(user)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('The registration was successful', true);
                    this.router.navigate(['/']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            );

        }else{
            alert("The form is not valid");
        }
          
        //  var user  : User = {
        //     firstName : this.model.firstName,
        //     lastName : this.model.lastName,
        //     email : this.model.email,
        //     password : this.model.password,
        //     username : this.model.username,
        //     bio : this.model.bio
        // };


        // this.userService.registerUser(user)
        //     .subscribe(
        //         data => {
        //             // set success message and pass true paramater to persist the message after redirecting to the login page
        //             this.alertService.success('The registration was successful', true);
        //             this.router.navigate(['/']);
        //         },
        //         error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         }
        //     );
    }

    //  saveUser() {
    //     if (this.userForm.dirty && this.userForm.valid) {
    //     alert(`Name: ${this.userForm.value.name} Email: ${this.userForm.value.email}`);
    //     }
    // }

}