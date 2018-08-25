import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";

import "rxjs/add/operator/switchMap";

import { Snap } from "../_models/snap";
import { SnapService } from "../_services/snap.service";
import { AlertService } from "../_services/alert.service";


@Component({
    selector : "view-snap",
    templateUrl : "view-album.component.html"
})

export class ViewAlbumComponent implements OnInit {

    @Input()
    snap : Snap;

    constructor(
        private snapService : SnapService,
        private route : ActivatedRoute,
        private alertService : AlertService,
        private location : Location
    ){}

    ngOnInit(): void {
        this.route.params
            .switchMap((params : Params) => this.snapService.getSnap(params['id']))
            .subscribe(snap => this.snap = snap);
    }

    deleteSnap(id : String): void {
        
        this.snapService.deleteSnap(id)
            .subscribe(
                data => {
                    this.alertService.success('Successfully deleted', true);
                    this.goBack();
                },
                error => {
                    this.alertService.error(error);
                    
                });
    }

    goBack() : void {
        this.location.back();
    }
}