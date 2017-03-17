/**
 * Created by TXL8009 on 3/16/2017.
 */

import { Component, OnInit } from "@angular/core";

import {reviewFeedbackService} from "./reviewFeedback.service";
import {Feedback} from "../feedbackSubmission/feedback.model";

import "rxjs/Rx"


@Component({
    selector: 'Form-template',
    templateUrl: "./reviewFeedback.html",
    styleUrls: ["./reviewFeedback.css"],
    providers: [reviewFeedbackService]
})

export class reviewFeedbackComponent implements OnInit{
    feedback : Feedback;
    constructor(private reviewFeedbackService : reviewFeedbackService){}

    ngOnInit(){
        this.reviewFeedbackService.getFeedback()
            .subscribe(
                (data : Feedback) =>{
                    this.feedback = data;
                }
            )
    }

}