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
var common_1 = require('@angular/common');
var album_service_1 = require("../_services/album.service");
var alert_service_1 = require("../_services/alert.service");
var authentication_service_1 = require("../_services/authentication.service");
require("rxjs/add/operator/switchMap");
var URL = "this is the URL";
var AddAlbumComponent = (function () {
    function AddAlbumComponent(albumService, alertService, authenticationService, router, location) {
        this.albumService = albumService;
        this.alertService = alertService;
        this.authenticationService = authenticationService;
        this.router = router;
        this.location = location;
        this.model = {};
    }
    AddAlbumComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authenticationService.getUser().subscribe(function (userObservabble) {
            _this.user = userObservabble;
        });
    };
    AddAlbumComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log("You have submitted the album data " + this.model.featured);
        var isFeatured = false;
        var isPublic = false;
        if (typeof this.model.featured !== 'undefined') {
            isFeatured = true;
        }
        if (typeof this.model.publicAlbum !== 'undefined') {
            isPublic = true;
        }
        var album = {
            name: this.model.name,
            description: this.model.description,
            address: this.model.address,
            featured: isFeatured,
            publicAlbum: isPublic,
            owner: this.user.username
        };
        this.albumService.addAlbum(album)
            .subscribe(function (data) {
            _this.alertService.success('Successfully added', true);
            _this.goBack();
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    AddAlbumComponent.prototype.goBack = function () {
        this.location.back();
    };
    AddAlbumComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "add-album",
            templateUrl: "add-album.component.html"
        }), 
        __metadata('design:paramtypes', [album_service_1.AlbumService, alert_service_1.AlertService, authentication_service_1.AuthenticationService, router_1.Router, common_1.Location])
    ], AddAlbumComponent);
    return AddAlbumComponent;
}());
exports.AddAlbumComponent = AddAlbumComponent;
//# sourceMappingURL=add-album.component.js.map