import { Component } from "@angular/core";
import {AuthService} from "./admin.service";

@Component({
    selector: 'app-administrator',
    template: `
        <header class="row spacing">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-tabs">
                    <li routerLinkActive="active"><a [routerLink]="['addUser']">Add User</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['removeUser']">Remove User</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['groups']">Groups</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['goals']">Feedback Goals</a></li>
                </ul>
            </nav>
        </header>
        <div class="row spacing">
           <router-outlet></router-outlet>
        </div>
    `
})
export class AuthenticationComponent {
    constructor(private authService:AuthService){}

    isAdmin(){
        return this.authService.isAdmin();
    }

    isLoggedIn(){
        return this.authService.isLoggedIn();
    }
}