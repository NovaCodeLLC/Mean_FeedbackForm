import { Component } from "@angular/core";
import {AuthService} from "./auth/auth.service";

@Component({
    selector: 'app-header',
    template: `
        <header class="row">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-pills pull-left">
                    <li routerLinkActive="active"><a [routerLink]="['/admin']" *ngIf = 'isLoggedIn()'>Admin</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['/feedback']" *ngIf = 'isLoggedIn()'>Feedback</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['/reviewFeedback']" *ngIf = 'isLoggedIn()'>Review</a></li>
                </ul>
                <ul class="nav nav-pills pull-right">
                    <li routerLinkActive="active" *ngIf = '!isLoggedIn()'><a [routerLink]="['/signin']">Login</a></li>
                    <li routerLinkActive="active" *ngIf ='isLoggedIn()'><a [routerLink]="['/logout']">Logout</a></li>
                </ul>
            </nav>
        </header>
    `
})
export class HeaderComponent {
    constructor(private authService:AuthService){}

    isLoggedIn(){
        return this.authService.isLoggedIn();
    }
}