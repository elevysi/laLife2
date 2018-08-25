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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.loggedIn = false;
        this.loginUrl = "api/login";
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        //https://www.lucidchart.com/techblog/2016/11/08/angular-2-and-observables-data-sharing-in-a-multi-view-application/
        // private user$ = new BehaviorSubject(User);
        this.user = new BehaviorSubject_1.BehaviorSubject(null);
        this.init();
    }
    // user$ = this.user.asObservable();
    AuthenticationService.prototype.getUser = function () {
        return this.user.asObservable();
    };
    /**
     * OnInit not possible for injectables
     * http://stackoverflow.com/questions/35110690/ngoninit-not-being-called-when-injectable-class-is-instantiated
     */
    AuthenticationService.prototype.init = function () {
        /**
         * See if there is no logged in user
         */
        this.setCurrentUser();
    };
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        return this.http.post(this.loginUrl, JSON.stringify({ username: username, password: password }), { headers: this.headers })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var data = response.json();
            if (data['success']) {
                _this.storeToken(data['token']);
                _this.setCurrentUser();
                return _this.isLoggedIn;
            }
        });
    };
    AuthenticationService.prototype.setCurrentUser = function () {
        /**
         * Set the current user
         */
        var _currentUser = this.currentUser();
        if (_currentUser.username === null) {
            this.user.next(null);
        }
        else {
            this.user.next(_currentUser);
        }
    };
    AuthenticationService.prototype.storeToken = function (auth_token) {
        localStorage.setItem('auth_token', auth_token);
        this.loggedIn = true;
    };
    AuthenticationService.prototype.getToken = function () {
        return localStorage.getItem('auth_token');
    };
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem('auth_token');
        this.setCurrentUser();
        this.loggedIn = false;
        return true;
    };
    AuthenticationService.prototype.isLoggedIn = function () {
        var token = this.getToken();
        if (token) {
            var payload = token.split('.')[1];
            payload = atob(payload);
            return JSON.parse(payload).exp > Date.now() / 1000;
        }
        else {
            return false;
        }
    };
    AuthenticationService.prototype.currentUser = function () {
        if (this.isLoggedIn()) {
            var token = this.getToken();
            var payload = token.split('.')[1];
            payload = atob(payload);
            return {
                email: JSON.parse(payload).email,
                firstName: JSON.parse(payload).firstName,
                lastName: JSON.parse(payload).lastName,
                username: JSON.parse(payload).username,
                bio: JSON.parse(payload).bio,
                avatarPath: JSON.parse(payload).avatarPath,
                avatarPathThumbnail: JSON.parse(payload).avatarPathThumbnail
            };
        }
        return {
            email: null,
            firstName: null,
            lastName: null,
            username: null,
            bio: null,
            avatarPath: null,
            avatarPathThumbnail: null
        };
    };
    AuthenticationService.prototype.handleError = function (error) {
        console.error('An error has occured', error);
        return Promise.reject(error.message || error);
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map