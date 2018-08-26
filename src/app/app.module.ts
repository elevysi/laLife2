import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from "./app-routing.module";

import { InMemoryWebApiModule } from "angular-in-memory-web-api";

import { FileSelectDirective, FileDropDirective } from "ng2-file-upload/ng2-file-upload";
import { NgxMasonryModule } from 'ngx-masonry';

import { AppComponent }  from './app.component';
import { SnapsComponent } from './snaps/snaps.component';
import { AddSnapComponent } from "./addSnap/add-snap.component";
import { ViewSnapComponent } from "./viewSnap/view-snap.component";
import { EditSnapComponent } from "./editSnap/edit-snap.component";
import { FileUploadComponent } from './fileUpload/file-upload.component';

import { AlbumsComponent } from './albums/albums.component';
import { AddAlbumComponent } from "./addAlbum/add-album.component";
import { ViewAlbumComponent } from "./viewAlbum/view-album.component";
import { EditAlbumComponent } from "./editAlbum/edit-album.component";

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from "./users/users.component";
import { LogoutComponent } from "./logout/logout.component";

import { AlertComponent } from "./_directives/alert.component";
import { ErrorComponent } from "./error/error.component";
import { GaleryItemComponent } from "./_directives/galery-item.component";

import { SnapService } from './_services/snap.service';
import { AlertService } from "./_services/alert.service";
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { AlbumService } from './_services/album.service';
import { LoggedInGuard } from "./_guards/logged-in.guard";

import { ValidationService } from './_services/validation-service';
import { ControlMessagesComponent } from './_directives/control-messages.component';


// import './rxjs-extensions';

@NgModule({
  imports: [ 
      BrowserModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      AppRoutingModule,
      NgxMasonryModule
      // AlertModule
    ],
  declarations: [ 
    AppComponent,
    SnapsComponent,
    AddSnapComponent,
    ViewSnapComponent,
    EditSnapComponent,
    FileSelectDirective,
    FileUploadComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    LogoutComponent,
    UsersComponent,
    AlertComponent,
    ErrorComponent,
    GaleryItemComponent,
    AlbumsComponent,
    AddAlbumComponent,
    EditAlbumComponent,
    ViewAlbumComponent,
    ControlMessagesComponent
  ],
  providers : [ LoggedInGuard, SnapService, UserService, AlertService, AuthenticationService, AlbumService, ValidationService],
  bootstrap: [ AppComponent ]
  
})
export class AppModule { }
