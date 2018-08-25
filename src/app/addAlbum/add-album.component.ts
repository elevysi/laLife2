import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from '@angular/common';

import { User } from "../_models/user";
import { Album } from "../_models/album";

import { AlbumService } from "../_services/album.service";
import { AlertService } from "../_services/alert.service";
import { AuthenticationService } from "../_services/authentication.service";

import "rxjs/add/operator/switchMap";

const URL = "this is the URL";

@Component({
    selector : "add-album",
    templateUrl : "add-album.component.html"
})

export class AddAlbumComponent implements OnInit{


    model: any = {};
    user: User;


    constructor(
        private albumService : AlbumService,
        private alertService : AlertService,
        private authenticationService : AuthenticationService,
        private router : Router,
        private location : Location
    ){ }

    ngOnInit(): void {
        this.authenticationService.getUser().subscribe(userObservabble => {
            this.user = userObservabble;
        });
    }

    onSubmit() {
        console.log("You have submitted the album data "+this.model.featured);
        var isFeatured = false;
        var isPublic = false;

        if(typeof this.model.featured !== 'undefined'){
            isFeatured = true;
        }

        if(typeof this.model.publicAlbum !== 'undefined'){
            isPublic = true;
        }

        var album  : Album = {
            name : this.model.name,
            description : this.model.description,
            address : this.model.address,
            featured : isFeatured,
            publicAlbum : isPublic,
            owner : this.user.username
        };

        this.albumService.addAlbum(album)
            .subscribe(
                data => {
                    this.alertService.success('Successfully added', true);
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