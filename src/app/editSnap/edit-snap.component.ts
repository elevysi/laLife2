import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";

import "rxjs/add/operator/switchMap";

import { Snap } from "../_models/snap";
import { Album } from "../_models/album";
import { SnapService } from "../_services/snap.service";
import { AlbumService } from "../_services/album.service";
import { AlertService } from "../_services/alert.service";


@Component({
    selector : "edit-snap",
    templateUrl : "edit-snap.component.html"
})

export class EditSnapComponent implements OnInit {

    @Input()
    snap : Snap;
    model: any = {};
    albums : Album [];

    constructor(
        private snapService : SnapService,
        private albumService : AlbumService,
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
                
                if(typeof snap.type !== 'undefined') this.model.type = snap.type;
                if(typeof snap.featured !== 'undefined') this.model.featured = snap.featured;
                if(typeof snap.publicSnap !== 'undefined') this.model.publicSnap = snap.publicSnap;
                // this.model.album = snap.album;
                

            });

            this.albumService.getAlbums()
                .then(albums => {
                    this.albums = albums;
            });
    }


    submit() : void {

        var snap  : Snap = {
            _id : this.model._id,
            name : this.model.name,
            description : this.model.description,
            album : this.model.album,
            type : this.model.type,
            featured : this.model.featured,
            publicSnap : this.model.publicSnap
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