import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { SnapsComponent } from './snaps/snaps.component';
import { AddSnapComponent } from "./addSnap/add-snap.component";
import { ViewSnapComponent } from "./viewSnap/view-snap.component";
import { EditSnapComponent } from "./editSnap/edit-snap.component";
import { FileUploadComponent } from './fileUpload/file-upload.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from "./users/users.component";
import { LogoutComponent } from "./logout/logout.component";
import { ErrorComponent } from "./error/error.component";

import { AlbumsComponent } from './albums/albums.component';
import { AddAlbumComponent } from "./addAlbum/add-album.component";
import { ViewAlbumComponent } from "./viewAlbum/view-album.component";
import { EditAlbumComponent } from "./editAlbum/edit-album.component";

import { LoggedInGuard } from "./_guards/logged-in.guard";
// import { AppComponent } from "./app.component";

const routes : Routes = [
    // {
    //     path: '',
    //     redirectTo : "/snaps",
    //     pathMatch : "full"
    // },
    // {
    //     path: 'snaps',
    //     component: SnapsComponent
    // },
    {
        path: '',
        component: SnapsComponent
    },
    {
        path: "add",
        component : AddSnapComponent
    },
    {
        path: "upload",
        component : FileUploadComponent,
        canActivate : [LoggedInGuard]
    },
    {
        path: 'view/:id',
        component: ViewSnapComponent,
        canActivate : [LoggedInGuard]
    },
     {
        path: 'edit/:id',
        component: EditSnapComponent,
        canActivate : [LoggedInGuard]
    },
    {
        path: "register",
        component : RegisterComponent
    },
    {
        path: "login",
        component : LoginComponent
    },
    {
        path: 'users',
        component: UsersComponent,
        canActivate : [LoggedInGuard]
    },
    {
        path: 'profile/:username',
        component: ProfileComponent,
        canActivate : [LoggedInGuard]
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: 'error',
        component : ErrorComponent
    },
    {
        path: 'albums',
        component: AlbumsComponent,
        canActivate : [LoggedInGuard]
    },
    {
        path: 'albums/add',
        component: AddAlbumComponent,
        canActivate : [LoggedInGuard]
    },
    {
        path: 'albums/edit/:id',
        component: EditAlbumComponent,
        canActivate : [LoggedInGuard]
    },
    {
        path: 'albums/view/:id',
        component: ViewAlbumComponent,
        canActivate : [LoggedInGuard]
    },
     {
        path: '**',
        redirectTo : '/error'
        // pathMatch : "full"
    }
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}
