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
var album_service_1 = require("../_services/album.service");
var AlbumsComponent = (function () {
    function AlbumsComponent(albumService, router, location) {
        this.albumService = albumService;
        this.router = router;
        this.location = location;
    }
    ;
    AlbumsComponent.prototype.getAlbums = function () {
        var _this = this;
        this.albumService.getAlbums()
            .then(function (albums) {
            _this.albums = albums;
        });
    };
    AlbumsComponent.prototype.ngOnInit = function () {
        this.getAlbums();
    };
    // deleteSnap(id : string): void{
    //     this.snapService.deleteSnap(id)
    //         .then(() => {
    //             // this.goBack();
    //             this.router.navigateByUrl("/");
    //         });
    // }
    AlbumsComponent.prototype.goBack = function () {
        this.location.back();
    };
    AlbumsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "albums",
            templateUrl: 'albums.component.html'
        }), 
        __metadata('design:paramtypes', [album_service_1.AlbumService, router_1.Router, common_1.Location])
    ], AlbumsComponent);
    return AlbumsComponent;
}());
exports.AlbumsComponent = AlbumsComponent;
//# sourceMappingURL=albums.component.js.map