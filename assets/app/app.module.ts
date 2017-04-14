import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { AuthenticationComponent } from "./admin/administrator.component";
import { AdminService } from "./admin/admin.service";
import {BootstrapModalModule} from "angular2-modal/plugins/bootstrap";

import { FeedbackComponent} from "./feedbackSubmission/feedback.component";

import { GoalComponent } from "./admin/feedbackgoals/feedbackgoals.component";

import { HeaderComponent } from "./header.component";

import { listReviewFeedbackComponent } from "./reviewFeedback/listFeedbacks.component";

import { MessageComponent } from "./messages/message.component";
import { MessageListComponent } from "./messages/message-list.component";
import { MessageInputComponent } from "./messages/message-input.component";
import { MessagesComponent } from "./messages/messages.component";
import { ModalModule } from "angular2-modal";

import { reviewFeedbackComponent } from "./reviewFeedback/reviewFeedback.component";
import { routing } from "./app.routing";

import { AddUserComponent } from "./admin/users/signup.component";
import { SigninComponent } from "./admin/users/signin.component";
import { GroupingComponent} from "./admin/groups/grouping.component";
import { NCDropDown2Items} from "./admin/genericitems_inactive/dropdown2bind.component";
import { RemoveUserComponent } from "./admin/users/removeUser.component";
import { MdInputModule, MdAutocompleteModule, MdCoreModule } from "@angular/material";
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";

import 'hammerjs';


@NgModule({
    declarations: [
        AppComponent,
        AddUserComponent,
        AuthenticationComponent,
        FeedbackComponent,
        GoalComponent,
        GroupingComponent,
        HeaderComponent,
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
        SigninComponent,
        reviewFeedbackComponent,
        listReviewFeedbackComponent,
        NCDropDown2Items,
        RemoveUserComponent,

    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        routing,
        ModalModule.forRoot(),
        BootstrapModalModule,
        BrowserAnimationsModule,
        MdInputModule,
        MdAutocompleteModule,
        MdCoreModule,

    ],
    providers: [AdminService],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {

}