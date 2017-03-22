import { Routes, RouterModule } from "@angular/router";

import { MessagesComponent } from "./messages/messages.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { AUTH_ROUTES } from "./auth/auth.routes";
import {FeedbackComponent} from "./feedbackSubmission/feedback.component";
import {reviewFeedbackComponent} from "./reviewFeedback/reviewFeedback.component";
import {listReviewFeedbackComponent} from "./reviewFeedback/listFeedbacks.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES },
    { path: 'feedback', component: FeedbackComponent},
    //{ path: 'messages', component: MessagesComponent },
    { path: 'reviewFeedback', component: listReviewFeedbackComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);