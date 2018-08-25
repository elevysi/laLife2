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
var user_service_1 = require("../_services/user.service");
var authentication_service_1 = require("../_services/authentication.service");
var alert_service_1 = require("../_services/alert.service");
var LoginComponent = (function () {
    function LoginComponent(route, userService, router, authenticationService, alertService) {
        this.route = route;
        this.userService = userService;
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        // get return url from route parameters or default to '/'
        // this.authenticationService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.authenticationService.getUser().subscribe(function (userObservable) {
            _this.user = userObservable;
            if (_this.user != null) {
                if (_this.authenticationService.isLoggedIn()) {
                    _this.alertService.error(_this.user.username + ' is already logged in.', true);
                    _this.router.navigate([_this.returnUrl]);
                }
            }
        });
    };
    LoginComponent.prototype.submit = function () {
        var _this = this;
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(function (data) {
            _this.alertService.success('Successfully logged in', true);
            _this.router.navigate([_this.returnUrl]);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "<app-login></app-login>",
            templateUrl: "login.component.html",
            styleUrls: ["../../assets/css/pages/page_log_reg_v2.css"]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, user_service_1.UserService, router_1.Router, authentication_service_1.AuthenticationService, alert_service_1.AlertService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map