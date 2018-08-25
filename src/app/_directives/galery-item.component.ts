import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Snap } from "../_models/snap";

@Component({
    selector: 'galery-item',
    templateUrl: 'galery-item.component.html'
})
 
export class GaleryItemComponent implements OnInit, AfterViewInit{

    private _snaps = new BehaviorSubject<Snap[]>([]);
    snap : Snap;
    selectedSnapId : string;
    authToken : string;

    @Input()
    set snaps(value) {
        // set the latest value for _data BehaviorSubject
        this._snaps.next(value);
    };

    get snaps() {
        // get the latest value from _data BehaviorSubject
        return this._snaps.getValue();
    }

    compSnaps : Snap [];
    
    ngOnInit() {
        this._snaps
            .subscribe (snaps => {
                this.compSnaps = snaps;
            });
    }

    ngAfterViewInit() {
        
    }
    
}