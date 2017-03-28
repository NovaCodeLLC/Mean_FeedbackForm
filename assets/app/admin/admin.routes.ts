import { Routes } from "@angular/router";

import { AddUserComponent } from "./signup.component";
import {GoalComponent} from "./feedbackgoals.component";

export const ADMIN_ROUTES: Routes = [
    { path: '', redirectTo: 'addUser', pathMatch: 'full' },
    { path: 'addUser', component: AddUserComponent },
    { path: 'goals', component: GoalComponent}
];