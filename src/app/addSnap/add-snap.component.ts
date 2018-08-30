import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from '@angular/common';




import { Snap } from "../_models/snap";

import { SnapService } from "../_services/snap.service";

// import { FileUploader } from "ng-file-upload";
import "rxjs/add/operator/switchMap";

const URL = "this is the URL";

@Component({
    selector : "add-snap",
    templateUrl : "add-snap.component.html"
})

export class AddSnapComponent implements OnInit{

    // @Input()
    // snap : Snap;
    name : string;
    description : string;
    path : string;

    // public uploader : FileUploader = new FileUploader({url: URL});
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

    constructor(
        private snapService : SnapService,
        private router : Router,
        private location : Location
    ){ }

    ngOnInit(): void {

    }
   

    goBack() : void {
        this.location.back();
    }


}