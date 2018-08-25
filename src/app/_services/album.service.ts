import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs/add/operator/toPromise';

import { Album } from "../_models/album";

@Injectable()
export class AlbumService{

    private albumUrl = "api/albums";
    private albumListUrl = "api/all/albums/featured";

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http){}
    
    getAlbums(): Promise<Album[]>{

        const url = `${this.albumUrl}`;
        let authToken = localStorage.getItem('auth_token');

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${authToken}`);


        return this.http.get(this.albumUrl, {headers: headers})
            .toPromise()
            .then(response => response.json() as Album[])
            .catch(this.handleError);
    }


    addAlbum(album : Album){

        const url = `${this.albumUrl}`;
        let authToken = localStorage.getItem('auth_token');

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http.post(url, JSON.stringify({album : album}), {headers: headers})
            .map((response: Response) => {
            var data = response.json();

            return data;
            });
    }

    viewAlbum(id : String) : Promise<Album>{

        const url = `${this.albumUrl}/${id}`;
        let authToken = localStorage.getItem('auth_token');

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http.get(this.albumUrl, {headers: headers})
            .toPromise()
            .then(response => response.json() as Album)
            .catch(this.handleError);
    }

    editAlbum(album : Album){

        const url = `${this.albumUrl}/${album._id}`;
        let authToken = localStorage.getItem('auth_token');

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http.put(url, JSON.stringify({album : album}), {headers: headers})
            .map((response: Response) => {
            var data = response.json();

            return data;
            });
    }

    

    deleteAlbum(id : String){
        
        const url = `${this.albumUrl}/${id}`;
        let authToken = localStorage.getItem('auth_token');

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http.delete(url, {headers: headers})
            .map((response: Response) => {
            var data = response.json();
                return data;
            });
    }

    private handleError(error : any) : Promise<any> {
        console.error('An error has occured', error);
        return Promise.reject(error.message || error);
    }
    
}