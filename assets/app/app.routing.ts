import { Routes, RouterModule } from "@angular/router";

import { AuthenticationComponent } from "./admin/administrator.component";
import { ADMIN_ROUTES } from "./admin/admin.routes";
import {FeedbackComponent} from "./feedbackSubmission/feedback.component";
import {listReviewFeedbackComponent} from "./reviewFeedback/listFeedbacks.component";
import {SigninComponent} from "./admin/signin.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'admin', component: AuthenticationComponent, children: ADMIN_ROUTES },
    { path: 'feedback', component: FeedbackComponent},
    { path: 'reviewFeedback', component: listReviewFeedbackComponent},
    { path: 'signin', component: SigninComponent },
];

export const routing = RouterModule.forRoot(APP_ROUTES);