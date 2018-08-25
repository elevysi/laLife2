"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var user_service_1 = require("../_services/user.service");
var alert_service_1 = require("../_services/alert.service");
var validation_service_1 = require("../_services/validation-service");
var forms_1 = require('@angular/forms');
var RegisterComponent = (function () {
    function RegisterComponent(userService, router, alertService, fb) {
        this.userService = userService;
        this.router = router;
        this.alertService = alertService;
        this.model = {};
        this.registrationForm = fb.group({
            'username': ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            'firstName': ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            'lastName': ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            'email': ['', [forms_1.Validators.required, validation_service_1.ValidationService.emailValidator]],
            'password': ['', forms_1.Validators.required],
            'confirmPassword': ['', forms_1.Validators.required],
            'bio': ['', [forms_1.Validators.required, forms_1.Validators.minLength(10)]]
        });
    }
    RegisterComponent.prototype.submit = function () {
        var _this = this;
        console.log("The form is submitted.");
        if (this.registrationForm.dirty && this.registrationForm.valid) {
            // alert(`Name: ${this.registrationForm.value.name} Email: ${this.registrationForm.value.email}`);
            var user = {
                firstName: this.registrationForm.value.firstName,
                lastName: this.registrationForm.value.lastName,
                email: this.registrationForm.value.email,
                password: this.registrationForm.value.password,
                username: this.registrationForm.value.username,
                bio: this.registrationForm.value.bio,
            };
            this.userService.registerUser(user)
                .subscribe(function (data) {
                // set success message and pass true paramater to persist the message after redirecting to the login page
                _this.alertService.success('The registration was successful', true);
                _this.router.navigate(['/']);
            }, function (error) {
                _this.alertService.error(error);
                _this.loading = false;
            });
        }
        else {
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
    };
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "<app-register></app-register>",
            templateUrl: "register.component.html",
            styleUrls: ["../../assets/css/pages/page_log_reg_v2.css"]
        }),
        __param(3, core_1.Inject(forms_1.FormBuilder)), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router, alert_service_1.AlertService, forms_1.FormBuilder])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map