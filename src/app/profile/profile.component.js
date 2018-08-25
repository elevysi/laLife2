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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var user_service_1 = require("../_services/user.service");
var alert_service_1 = require("../_services/alert.service");
var ProfileComponent = (function () {
    function ProfileComponent(userService, route, alertService, location) {
        this.userService = userService;
        this.route = route;
        this.alertService = alertService;
        this.location = location;
        this.model = {};
        this.tooglePasswordChange = false;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.userService.getProfile(params['username']); })
            .subscribe(function (user) {
            _this.user = user;
            _this.model._id = user._id;
            _this.model.firstName = user.firstName;
            _this.model.lastName = user.lastName;
            _this.model.username = user.username;
            _this.model.email = user.email;
            _this.model.bio = user.bio;
        });
    };
    ProfileComponent.prototype.setTooglePasswordChange = function () {
        this.tooglePasswordChange = !this.tooglePasswordChange;
    };
    ProfileComponent.prototype.submit = function () {
        var _this = this;
        var user = {
            _id: this.model._id,
            firstName: this.model.firstName,
            lastName: this.model.lastName,
            email: this.model.email,
            username: this.model.username,
            bio: this.model.bio
        };
        this.userService.edit(user)
            .subscribe(function (data) {
            _this.alertService.success('Successfully edited', true);
            _this.goBack();
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    ProfileComponent.prototype.goBack = function () {
        this.location.back();
    };
    ProfileComponent.prototype.updatePass = function () {
        var _this = this;
        console.log("info has been posted ");
        var updateInfo = {
            username: this.user.username,
            currentPassword: this.model.currentPassword,
            newPassword: this.model.newPassword,
        };
        this.userService.updatePass(updateInfo)
            .subscribe(function (data) {
            _this.alertService.success('Successfully updated the password', true);
            _this.goBack();
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    ProfileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "<app-profile></app-profile>",
            templateUrl: "profile.component.html"
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_1.ActivatedRoute, alert_service_1.AlertService, common_1.Location])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map