import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";

import "rxjs/add/operator/switchMap";

import { Snap } from "../_models/snap";
import { SnapService } from "../_services/snap.service";
import { AlertService } from "../_services/alert.service";


@Component({
    selector : "edit-album",
    templateUrl : "edit-album.component.html"
})

export class EditAlbumComponent implements OnInit {

    @Input()
    snap : Snap;
    model: any = {};

    constructor(
        private snapService : SnapService,
        private route : ActivatedRoute,
        private alertService : AlertService,
        private location : Location
    ){}

    ngOnInit(): void {
        this.route.params
            .switchMap((params : Params) => this.snapService.getSnap(params['id']))
            .subscribe(snap => {
                this.snap = snap;
                this.model._id = snap._id;
                this.model.name = snap.name;
                this.model.description = snap.description;
                // this.model.path = snap.path;

            });
    }


    submit() : void {
        var snap  : Snap = {
            _id : this.model._id,
            name : this.model.name,
            description : this.model.description
            // path : this.model.path,
        };

        this.snapService.editSnap(snap)
            .subscribe(
                data => {
                    this.alertService.success('Successfully edited', true);
                    this.goBack();
                },
                error => {
                    this.alertService.error(error);
                    
                });
    }

    goBack() {
        this.location.back();
    }
}