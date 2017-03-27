import { Routes } from "@angular/router";

import { AddUserComponent } from "./signup.component";

export const ADMIN_ROUTES: Routes = [
    { path: '', redirectTo: 'addUser', pathMatch: 'full' },
    { path: 'addUser', component: AddUserComponent },
];