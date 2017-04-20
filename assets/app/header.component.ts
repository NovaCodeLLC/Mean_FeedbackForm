import { Component } from "@angular/core";
import {AdminService} from "./admin/admin.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-header',
    template: `
        <header class="row">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-pills pull-left">
                    <li routerLinkActive="active"><a [routerLink]="['/admin']" *ngIf = 'isLoggedIn() && isUserAdmin()'>Admin</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['/feedback']" *ngIf = 'isLoggedIn()'>Feedback</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['/reviewFeedback']" *ngIf = 'isLoggedIn()'>Review</a></li>
                </ul>
                <ul class="nav nav-pills pull-right">
                    <li routerLinkActive="active" *ngIf = '!isLoggedIn()'><a [routerLink]="['/signin']">Login</a></li>
                    <li routerLinkActive="active" *ngIf ='isLoggedIn()'><a (click)="onLogOut()">Logout</a></li>
                </ul>
            </nav>
        </header>
    `
})
export class HeaderComponent {
    constructor(private authService:AdminService, private router : Router){}

    isUserAdmin(){
        return this.authService.isAdmin();
    }

    isLoggedIn(){
        return this.authService.isLoggedIn();
    }

    onLogOut(){
            this.authService.logout();
            this.router.navigateByUrl('signin');
    }
}