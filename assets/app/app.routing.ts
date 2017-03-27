import { Routes, RouterModule } from "@angular/router";

import { MessagesComponent } from "./messages/messages.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { AUTH_ROUTES } from "./auth/auth.routes";
import {FeedbackComponent} from "./feedbackSubmission/feedback.component";
import {reviewFeedbackComponent} from "./reviewFeedback/reviewFeedback.component";
import {listReviewFeedbackComponent} from "./reviewFeedback/listFeedbacks.component";
import {SigninComponent} from "./auth/signin.component";
import {LogoutComponent} from "./auth/logout.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'admin', component: AuthenticationComponent, children: AUTH_ROUTES },
    { path: 'feedback', component: FeedbackComponent},
    //{ path: 'messages', component: MessagesComponent },
    { path: 'reviewFeedback', component: listReviewFeedbackComponent},
    { path: 'signin', component: SigninComponent },
    { path: 'logout', component: LogoutComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);