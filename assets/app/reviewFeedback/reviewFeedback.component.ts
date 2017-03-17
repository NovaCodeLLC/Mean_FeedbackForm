/**
 * Created by TXL8009 on 3/16/2017.
 */

import {Component, OnInit, Input} from "@angular/core";

import {reviewFeedbackService} from "./reviewFeedback.service";
import {Feedback} from "../feedbackSubmission/feedback.model";

import "rxjs/Rx"


@Component({
    selector: 'singleFeedback',
    templateUrl: "./reviewFeedback.html",
    styleUrls: ["./reviewFeedback.css"],
    providers: [reviewFeedbackService]
})

export class reviewFeedbackComponent{
    @Input() feedback : Feedback

    onEditMethod(){
        console.log(this.feedback);
    }

}