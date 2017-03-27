import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { AuthService } from "./auth/auth.service";
import {BootstrapModalModule} from "angular2-modal/plugins/bootstrap";

import { FeedbackComponent} from "./feedbackSubmission/feedback.component";

import { HeaderComponent } from "./header.component";

import { listReviewFeedbackComponent } from "./reviewFeedback/listFeedbacks.component";
import { LogoutComponent } from "./auth/logout.component";

import { MessageComponent } from "./messages/message.component";
import { MessageListComponent } from "./messages/message-list.component";
import { MessageInputComponent } from "./messages/message-input.component";
import { MessagesComponent } from "./messages/messages.component";
import { ModalModule } from "angular2-modal";

import { reviewFeedbackComponent } from "./reviewFeedback/reviewFeedback.component";
import { routing } from "./app.routing";

import { SignupComponent } from "./auth/signup.component";
import { SigninComponent } from "./auth/signin.component";

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        FeedbackComponent,
        HeaderComponent,
        LogoutComponent,
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
        SignupComponent,
        SigninComponent,
        reviewFeedbackComponent,
        listReviewFeedbackComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        routing,
        ModalModule.forRoot(),
        BootstrapModalModule
    ],
    providers: [AuthService],
    bootstrap: [AppComponent],

})
export class AppModule {

}