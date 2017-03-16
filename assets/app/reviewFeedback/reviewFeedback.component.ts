/**
 * Created by TXL8009 on 3/16/2017.
 */

import {Inject, Component, OnInit} from "@angular/core";

import {reviewFeedbackService} from "./reviewFeedback.service";
import {Feedback} from "../feedbackSubmission/feedback.model";
import {Response} from "@angular/http";

import "rxjs/Rx"

@Component({
    selector: 'Form-template',
    templateUrl: "./reviewFeedback.html",
    styleUrls: ["./reviewFeedback.css"],
    providers: [reviewFeedbackService]
})

export class reviewFeedbackComponent implements OnInit {
    feedbacks : Feedback[];
    feedback : Feedback;

    constructor(private reviewFeedbackService : reviewFeedbackService){}

    ngOnInit(){
        this.reviewFeedbackService.getFeedback()
            .subscribe(
                (feedback:Feedback[]) =>{
                    this.feedbacks = feedback;
                    this.feedback = this.feedbacks[1];
                }
            )
    }
}