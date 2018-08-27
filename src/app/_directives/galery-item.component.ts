import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input, QueryList,  ViewChildren} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Snap } from "../_models/snap";

declare var $:JQueryStatic;
/// <reference path="galery.item.d.ts" />

@Component({
    selector: 'galery-item',
    templateUrl: 'galery-item.component.html'
})
 
export class GaleryItemComponent implements OnInit, AfterViewInit{

    @ViewChild('galeryContainer') gridSnapsContainer:ElementRef;
    // @ViewChildren('popUpLink') popUpLinks: QueryList<ElementRef>;

    galeryIntited : boolean = false;

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
                this.applyMagnifier();
                this.applyIsotope();
            });
    }

    applyMagnifier(){

        let authToken = localStorage.getItem('auth_token');
        var options = {
            delegate: 'a', // child items selector, by clicking on it popup will open
            type: 'image',
            gallery : {
                enabled: true, // set to true to enable gallery
                // preload: [0,2], // read about this option in next Lazy-loading section
                navigateByImgClick: true,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button
                tPrev: 'Previous (Left arrow key)', // title for left button
                tNext: 'Next (Right arrow key)', // title for right button
                tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
            },
            removalDelay: 300,
            mainClass: 'mfp-fade',
            preloader: true
        };

        // $(this.el.nativeElement).magnificPopup({options});

        // this.popUpLinks.forEach((child) => { $(child.nativeElement).magnificPopup({options}); })

        if(this.galeryIntited){
            /**
             * Start by a destroy
             */
            // $(this.el.nativeElement).magnificPopup('destroy');
        }

        setTimeout(() => { 
            $(this.gridSnapsContainer.nativeElement).magnificPopup(options);
            this.galeryIntited = true;

        }, 2000);
        
    }

    applyIsotope(){

        var options = {
            itemSelector: '.single_gallery_item_own',
            percentPosition: true,
            masonry: {
                gutter: 0
            }
        };

        setTimeout(() => { 
            $(this.gridSnapsContainer.nativeElement).isotope(options);
            
        }, 3000);
    }

    ngAfterViewInit() {
        
    }   
}