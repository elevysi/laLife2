import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input, QueryList,  ViewChildren} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Snap } from "../_models/snap";

import { IsotopeOptions } from 'ngx-isotope';

declare var $:JQueryStatic;
/// <reference path="galery.item.d.ts" />

@Component({
    selector: 'galery-item',
    templateUrl: 'galery-item.component.html'
})
 
export class GaleryItemComponent implements OnInit, AfterViewInit{

    @ViewChild('gridSnapsContainer') gridSnapsContainer:ElementRef;
    // @ViewChild('galeryContainer') galery:ElementRef;

    @ViewChildren('gallery_img_own') gallery_img_own: QueryList<ElementRef>;

    // @ViewChildren('single-galery-item') galeryItems: QueryList<ElementRef>;

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
                // this.applyIsotope();
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
            // $(this.gridSnapsContainer.nativeElement).magnificPopup(options);
            this.galeryIntited = true;

            this.gallery_img_own.forEach((child) => { $(child.nativeElement).magnificPopup({options}); })

        }, 2000);
        
    }

    applyIsotope(){

        var options = {
            itemSelector: '.single_gallery_item',
            percentPosition: true,
            masonry: {
                gutter: 0
            }
        };

        setTimeout(() => { 
            // $(this.galery.nativeElement).isotope(options);
            
        }, 3000);
    }

    ngAfterViewInit() {
        
    }

    public myOptions: IsotopeOptions = {
        itemSelector: '.single_gallery_content',
        percentPosition: true,
        masonry: {
            gutter: 0
        }
    };
}

// <isotope-grid [options]="myOptions">
//     <div class="gallery_full_width_images_area row clearfix" #galeryContainer>
//         <!-- Single gallery Item -->
//         <div class="gra col-12 col-sm-6 col-md-4 single_gallery_item" #gridSnapsContainer>
//             <isotope-item class="single_gallery_content" *ngFor="let snap of compSnaps">
//                 <img src="snaps/{{snap.thumbnailPath}}" alt="">
//                 <!-- Hover Effects -->
//                 <div class="hover_overlay">
//                     <div class="gallery_info">
//                         <div class="zoom-details-btn">
//                             <a #popUpLink class="gallery_img animated fadeInDown" href="snaps/{{snap.originalPath}}"><i class="ti-zoom-in"></i></a>
//                             <!-- <a href="single-portfolio-1.html"><i class="ti-link"></i></a> -->
//                         </div>
//                         <h5>{{snap.name}}</h5>
//                         <p>{{snap.description}} In {{snap.album.name}}</p>
//                     </div>
//                 </div>
//             </isotope-item>
//         </div>
//     </div>
// </isotope-grid>
