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
var snap_service_1 = require("../_services/snap.service");
var ng2_file_upload_1 = require("ng2-file-upload/ng2-file-upload");
require("rxjs/add/operator/switchMap");
var URL = "this is the URL";
var AddSnapComponent = (function () {
    // uploader.onBuidItemForm = (item, form) => {
    //     form.append(key1, value1);
    // };
    // hasBaseDropZoneOver : boolean = false;
    // hasAnotherDropzoneOver : boolean = false;
    // public fileOverBase(e : any): void {
    //     this.hasBaseDropZoneOver = e;
    // }
    // public fileOverAnother(e:any): void{
    //     this.hasAnotherDropzoneOver = e;
    // }
    function AddSnapComponent(snapService, router, location) {
        this.snapService = snapService;
        this.router = router;
        this.location = location;
        this.uploader = new ng2_file_upload_1.FileUploader({ url: URL });
    }
    AddSnapComponent.prototype.ngOnInit = function () {
    };
    AddSnapComponent.prototype.goBack = function () {
        this.location.back();
    };
    AddSnapComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "add-snap",
            templateUrl: "add-Snap.component.html"
        }), 
        __metadata('design:paramtypes', [snap_service_1.SnapService, router_1.Router, common_1.Location])
    ], AddSnapComponent);
    return AddSnapComponent;
}());
exports.AddSnapComponent = AddSnapComponent;
//# sourceMappingURL=add-snap.component.js.map