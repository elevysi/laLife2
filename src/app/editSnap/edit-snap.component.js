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
require("rxjs/add/operator/switchMap");
var snap_1 = require("../_models/snap");
var snap_service_1 = require("../_services/snap.service");
var album_service_1 = require("../_services/album.service");
var alert_service_1 = require("../_services/alert.service");
var EditSnapComponent = (function () {
    function EditSnapComponent(snapService, albumService, route, alertService, location) {
        this.snapService = snapService;
        this.albumService = albumService;
        this.route = route;
        this.alertService = alertService;
        this.location = location;
        this.model = {};
    }
    EditSnapComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.snapService.getSnap(params['id']); })
            .subscribe(function (snap) {
            _this.snap = snap;
            _this.model._id = snap._id;
            _this.model.name = snap.name;
            _this.model.description = snap.description;
            if (typeof snap.type !== 'undefined')
                _this.model.type = snap.type;
            if (typeof snap.featured !== 'undefined')
                _this.model.featured = snap.featured;
            if (typeof snap.publicSnap !== 'undefined')
                _this.model.publicSnap = snap.publicSnap;
            // this.model.album = snap.album;
        });
        this.albumService.getAlbums()
            .then(function (albums) {
            _this.albums = albums;
        });
    };
    EditSnapComponent.prototype.submit = function () {
        var _this = this;
        var snap = {
            _id: this.model._id,
            name: this.model.name,
            description: this.model.description,
            album: this.model.album,
            type: this.model.type,
            featured: this.model.featured,
            publicSnap: this.model.publicSnap
        };
        this.snapService.editSnap(snap)
            .subscribe(function (data) {
            _this.alertService.success('Successfully edited', true);
            _this.goBack();
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    EditSnapComponent.prototype.goBack = function () {
        this.location.back();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', snap_1.Snap)
    ], EditSnapComponent.prototype, "snap", void 0);
    EditSnapComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "edit-snap",
            templateUrl: "edit-snap.component.html"
        }), 
        __metadata('design:paramtypes', [snap_service_1.SnapService, album_service_1.AlbumService, router_1.ActivatedRoute, alert_service_1.AlertService, common_1.Location])
    ], EditSnapComponent);
    return EditSnapComponent;
}());
exports.EditSnapComponent = EditSnapComponent;
//# sourceMappingURL=edit-snap.component.js.map