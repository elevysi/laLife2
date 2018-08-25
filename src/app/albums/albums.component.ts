import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

import { Album } from "../_models/album";
import { AlbumService } from "../_services/album.service";

@Component({
    selector : "albums",
    templateUrl : 'albums.component.html'
})

export class AlbumsComponent implements OnInit{

    albums : Album[];

    constructor(
        private albumService : AlbumService,
        private router : Router,
        private location : Location
    ){};

    getAlbums(): void{
        this.albumService.getAlbums()
            .then(albums => {
                this.albums = albums;
            });
    }

    ngOnInit(): void {
        this.getAlbums();
    }

    // deleteSnap(id : string): void{
    //     this.snapService.deleteSnap(id)
    //         .then(() => {
    //             // this.goBack();
    //             this.router.navigateByUrl("/");
    //         });
    // }

    goBack() : void {
        this.location.back();
    }
}