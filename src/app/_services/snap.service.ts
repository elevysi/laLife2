import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs/add/operator/toPromise';

import { Snap } from "../_models/snap";

@Injectable()
export class SnapService{

    private snapUrl = "api/snaps";
    private snapSearchUrl = "api/snapSearch";

    

    private headers = new Headers({'Content-Type': 'application/json'});
    // public uploader : FileUploader = new FileUploader({url: this.snapUrl});

    constructor(private http: Http){}
    
    // getSnaps(): Promise<Snap[]>{
    //     return Promise.resolve(SNAPS);
    // }


    getSnaps(): Promise<Snap[]>{
        return this.http.get(this.snapUrl)
            .toPromise()
            .then(response => response.json() as Snap[])
            .catch(this.handleError);
    }
    

    editSnap(snap : Snap){

        const url = `${this.snapUrl}/${snap._id}`;
        let authToken = localStorage.getItem('auth_token');

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http.put(url, JSON.stringify({snap : snap}), {headers: headers})
            .map((response: Response) => {
            var data = response.json();

            return data;
            

            });
    }

    private handleError(error : any) : Promise<any> {
        console.error('An error has occured', error);
        return Promise.reject(error.message || error);
    }

    deleteSnap(id : String){
        
        const url = `${this.snapUrl}/${id}`;
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

    getSnap(id : String): Promise<Snap> {
        const url = `${this.snapUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => {
                   var snap : Snap = response.json();
                   return snap;
            })
            .catch(this.handleError);
    }

    search(term : string): Observable<Snap[]> {
        return this.http
            .get(`${this.snapSearchUrl}/?term=${term}`)
            .map((r: Response) => r.json().data as Snap[]);
    }
    
}

