import { Routes, RouterModule } from "@angular/router";

import { MessagesComponent } from "./messages/messages.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { AUTH_ROUTES } from "./auth/auth.routes";
import {FeedbackComponent} from "./feedbackSubmission/feedback.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/messages', pathMatch: 'full' },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES },
    { path: 'feedback', component: FeedbackComponent},
    { path: 'messages', component: MessagesComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);