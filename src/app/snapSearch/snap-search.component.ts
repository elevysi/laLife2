// import { Component, OnInit } from "@angular/core";
// import { Router } from "@angular/router";
// import { Observable } from "rxjs/Observable";
// import { Subject } from "rxjs/Subject";

// import { SnapService } from "../_services/snap.service";
// import { Snap } from "../_models/snap"

// @Component({
//     moduleId : module.id,
//     selector : "<snap-search></snap-search>",
//     templateUrl : "snap-search.component.html"
// })

// export class SnapSearch implements OnInit{
//     snaps : Observable<Snap[]>;
//     private searchTerms = new Subject<string>();
    
//     constructor(
//         private snapService : SnapService,
//         private router : Router
//     ){}

//     search(term : string) : void {
//         this.searchTerms.next(term);
//     }

//     ngOnInit() : void {
//         this.snaps = this.searchTerms
//             .debounceTime(300)        // wait for 300ms pause in events
//             .distinctUntilChanged()   // ignore if next search term is same as previous
//             .switchMap(term => term   // switch to new observable each time
//                 // return the http search observable
//                 ? this.snapService.search(term)
//                 // or the observable of empty heroes if no search term
//                 : Observable.of<Snap[]>([]))
//             .catch(error => {
//                 // TODO: real error handling
//                 console.log(error);
//                 return Observable.of<Snap[]>([]);
//             });
//     }
// }