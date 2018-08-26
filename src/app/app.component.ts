import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

import {Subscription} from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import {User} from "./_models/user";
import { AuthenticationService } from "./_services/authentication.service";

import * as $ from 'jquery';
import 'magnific-popup';



@Component({
  selector: 'app-root',
  templateUrl : "app.component.html",
})
export class AppComponent  implements OnInit, AfterViewInit{ 
  name = 'LaLifeApp';
  // user : User;
  user : Observable<User>;
  subscription : Subscription;

  loggedUser : User;

  @ViewChild('img') imgElement: ElementRef;

  ngAfterViewInit(): void {
    // $(this.imgElement.nativeElement).magnificPopup({ type: 'image' });
  }

  constructor(
    private authenticationService : AuthenticationService
  ){

  }

  ngOnInit() : void {

        this.authenticationService.getUser().subscribe(userObservable => {
          this.loggedUser = userObservable;
        });

  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }


}