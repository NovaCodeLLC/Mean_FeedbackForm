import { Routes } from "@angular/router";

import { AddUserComponent } from "./users/signup.component";
import {GoalComponent} from "./feedbackgoals/feedbackgoals.component";
import {GroupingComponent} from "./groups/grouping.component";
import {RemoveUserComponent} from "./users/removeUser.component";

export const ADMIN_ROUTES: Routes = [
    { path: '', redirectTo: 'addUser', pathMatch: 'full' },
    { path: 'addUser', component: AddUserComponent },
    { path: 'goals', component: GoalComponent},
    { path: 'grouping', component: GroupingComponent},
    { path: 'removeUser', component: RemoveUserComponent}
];