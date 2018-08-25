import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/toPromise';

import { User } from "../_models/user";
import { AuthenticationService } from "../_services/authentication.service";

@Injectable()
export class UserService{

    private userUrl = "api/users";
    
    private registerUrl = "api/register";
    private updatePassUrl = "api/users/updatepass";
    private loggedIn = false;

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http, private authenticationService : AuthenticationService){
        this.loggedIn = !!localStorage.getItem('auth_token');
    }
    
    private handleError(error : any) : Promise<any> {
        console.error('An error has occured', error);
        return Promise.reject(error.message || error);
    }

    getProfile(username : String): Promise<User> {

        const url = `${this.userUrl}/${username}`;
        let authToken = localStorage.getItem('auth_token');

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${authToken}`);
        
        return this.http.get(url, {headers: headers})
            .toPromise()
            .then(response => response.json() as User)
            .catch(this.handleError);
    }

    getUsers(): Promise<User[]> {
        const url = `${this.userUrl}`;
        let authToken = localStorage.getItem('auth_token');

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${authToken}`);
        
        return this.http.get(this.userUrl, {headers: headers})
            .toPromise()
            .then(response => response.json() as User[])
            .catch(this.handleError);
    }

    

    create(name : String, email : String, password : String) {

        return this.http
            // .post(this.snapUrl, JSON.stringify({snap : snap}), {headers: this.headers})
            .post(this.registerUrl, JSON.stringify({name, email, password }), {headers: this.headers})
            .map((response: Response) => {
                var data = response.json();
                return data['success'];

        });
            
    }


    registerUser(user : User){

        const url = `${this.registerUrl}`;
        let authToken = localStorage.getItem('auth_token');

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http.post(url, JSON.stringify({user : user}), {headers: headers})
            .map((response: Response) => {
            var data = response.json();

            return data;
            });
    }

    edit(user : User){

        const url = `${this.userUrl}`;
        let authToken = localStorage.getItem('auth_token');

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http.put(url, JSON.stringify({user : user}), {headers: headers})
            .map((response: Response) => {
            var data = response.json();

            return data;
            });
    }

    delete(id : String){

        const url = `${this.userUrl}/${id}`;
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
 

    updatePass(updateInfo : any){

        const url = `${this.updatePassUrl}`;
        let authToken = localStorage.getItem('auth_token');

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http.post(url, JSON.stringify({user : updateInfo}), {headers: headers})
            .map((response: Response) => {
                var data = response.json();
            return data;
            });
    }
}