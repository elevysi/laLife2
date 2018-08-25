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
var http_1 = require("@angular/http");
require('rxjs/add/operator/toPromise');
var authentication_service_1 = require("../_services/authentication.service");
var UserService = (function () {
    function UserService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
        this.userUrl = "api/users";
        this.registerUrl = "api/register";
        this.updatePassUrl = "api/users/updatepass";
        this.loggedIn = false;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.loggedIn = !!localStorage.getItem('auth_token');
    }
    UserService.prototype.handleError = function (error) {
        console.error('An error has occured', error);
        return Promise.reject(error.message || error);
    };
    UserService.prototype.getProfile = function (username) {
        var url = this.userUrl + "/" + username;
        var authToken = localStorage.getItem('auth_token');
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "Bearer " + authToken);
        return this.http.get(url, { headers: headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.getUsers = function () {
        var url = "" + this.userUrl;
        var authToken = localStorage.getItem('auth_token');
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "Bearer " + authToken);
        return this.http.get(this.userUrl, { headers: headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.create = function (name, email, password) {
        return this.http
            .post(this.registerUrl, JSON.stringify({ name: name, email: email, password: password }), { headers: this.headers })
            .map(function (response) {
            var data = response.json();
            return data['success'];
        });
    };
    UserService.prototype.registerUser = function (user) {
        var url = "" + this.registerUrl;
        var authToken = localStorage.getItem('auth_token');
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "Bearer " + authToken);
        return this.http.post(url, JSON.stringify({ user: user }), { headers: headers })
            .map(function (response) {
            var data = response.json();
            return data;
        });
    };
    UserService.prototype.edit = function (user) {
        var url = "" + this.userUrl;
        var authToken = localStorage.getItem('auth_token');
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "Bearer " + authToken);
        return this.http.put(url, JSON.stringify({ user: user }), { headers: headers })
            .map(function (response) {
            var data = response.json();
            return data;
        });
    };
    UserService.prototype.delete = function (id) {
        var url = this.userUrl + "/" + id;
        var authToken = localStorage.getItem('auth_token');
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "Bearer " + authToken);
        return this.http.delete(url, { headers: headers })
            .map(function (response) {
            var data = response.json();
            return data;
        });
    };
    UserService.prototype.updatePass = function (updateInfo) {
        var url = "" + this.updatePassUrl;
        var authToken = localStorage.getItem('auth_token');
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "Bearer " + authToken);
        return this.http.post(url, JSON.stringify({ user: updateInfo }), { headers: headers })
            .map(function (response) {
            var data = response.json();
            return data;
        });
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, authentication_service_1.AuthenticationService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map