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
var AlbumService = (function () {
    function AlbumService(http) {
        this.http = http;
        this.albumUrl = "api/albums";
        this.albumListUrl = "api/all/albums/featured";
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    AlbumService.prototype.getAlbums = function () {
        var url = "" + this.albumUrl;
        var authToken = localStorage.getItem('auth_token');
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "Bearer " + authToken);
        return this.http.get(this.albumUrl, { headers: headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    AlbumService.prototype.addAlbum = function (album) {
        var url = "" + this.albumUrl;
        var authToken = localStorage.getItem('auth_token');
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "Bearer " + authToken);
        return this.http.post(url, JSON.stringify({ album: album }), { headers: headers })
            .map(function (response) {
            var data = response.json();
            return data;
        });
    };
    AlbumService.prototype.viewAlbum = function (id) {
        var url = this.albumUrl + "/" + id;
        var authToken = localStorage.getItem('auth_token');
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "Bearer " + authToken);
        return this.http.get(this.albumUrl, { headers: headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    AlbumService.prototype.editAlbum = function (album) {
        var url = this.albumUrl + "/" + album._id;
        var authToken = localStorage.getItem('auth_token');
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "Bearer " + authToken);
        return this.http.put(url, JSON.stringify({ album: album }), { headers: headers })
            .map(function (response) {
            var data = response.json();
            return data;
        });
    };
    AlbumService.prototype.deleteAlbum = function (id) {
        var url = this.albumUrl + "/" + id;
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
    AlbumService.prototype.handleError = function (error) {
        console.error('An error has occured', error);
        return Promise.reject(error.message || error);
    };
    AlbumService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AlbumService);
    return AlbumService;
}());
exports.AlbumService = AlbumService;
//# sourceMappingURL=album.service.js.map