import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Observable } from "rxjs";
import {Subject} from 'rxjs/Subject';

import { Snap } from "../_models/snap";
import { SnapService } from "../_services/snap.service";

@Component({
    selector : "lalifeapp",
    templateUrl : 'snaps.component.html'
})

export class SnapsComponent implements OnInit{

    snaps : Subject <Snap[]> = new Subject();
    snaps$ = this.snaps.asObservable();
    compSnaps : Snap [];

    constructor(
        private snapService : SnapService,
        private router : Router,
        private location : Location
    ){};

    getSnaps(): void{
        this.snapService.getSnaps()
            .then(snaps => {
                this.compSnaps = snaps;
                this.snaps.next(snaps);
            });
    }

    ngOnInit(): void {
        this.getSnaps();
    }

    goBack() : void {
        this.location.back();
    }
}