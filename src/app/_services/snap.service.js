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
var SnapService = (function () {
    // public uploader : FileUploader = new FileUploader({url: this.snapUrl});
    function SnapService(http) {
        this.http = http;
        this.snapUrl = "api/snaps";
        this.snapSearchUrl = "api/snapSearch";
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    // getSnaps(): Promise<Snap[]>{
    //     return Promise.resolve(SNAPS);
    // }
    SnapService.prototype.getSnaps = function () {
        return this.http.get(this.snapUrl)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SnapService.prototype.editSnap = function (snap) {
        var url = this.snapUrl + "/" + snap._id;
        var authToken = localStorage.getItem('auth_token');
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "Bearer " + authToken);
        return this.http.put(url, JSON.stringify({ snap: snap }), { headers: headers })
            .map(function (response) {
            var data = response.json();
            return data;
        });
    };
    SnapService.prototype.handleError = function (error) {
        console.error('An error has occured', error);
        return Promise.reject(error.message || error);
    };
    SnapService.prototype.deleteSnap = function (id) {
        var url = this.snapUrl + "/" + id;
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
    SnapService.prototype.getSnap = function (id) {
        var url = this.snapUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) {
            var snap = response.json();
            return snap;
        })
            .catch(this.handleError);
    };
    SnapService.prototype.search = function (term) {
        return this.http
            .get(this.snapSearchUrl + "/?term=" + term)
            .map(function (r) { return r.json().data; });
    };
    SnapService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SnapService);
    return SnapService;
}());
exports.SnapService = SnapService;
//# sourceMappingURL=snap.service.js.map