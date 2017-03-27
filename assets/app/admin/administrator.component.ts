import { Component } from "@angular/core";
import {AuthService} from "./admin.service";

@Component({
    selector: 'app-administrator',
    template: `
        <header class="row spacing">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-tabs">
                    <li routerLinkActive="active"><a [routerLink]="['addUser']">Add User</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['removeUser']"></a>Remove User</li>
                    <li routerLinkActive="active"><a [routerLink]="['groups']"></a>Groups</li>
                    <li routerLinkActive="active"><a [routerLink]="['goals']"></a>Feedback Goals</li>
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