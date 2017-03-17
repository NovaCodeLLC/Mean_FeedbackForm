/**
 * Created by TXL8009 on 3/17/2017.
 */
import { Component, OnInit } from "@angular/core";

import {reviewFeedbackService} from "./reviewFeedback.service";
import {Feedback} from "../feedbackSubmission/feedback.model";

import "rxjs/Rx"


@Component({
    selector: 'listFeedback',
    template: `<singleFeedback 
                    [feedback]="feedback" 
                    *ngFor="let feedback of feedbacks"></singleFeedback>
                `,
    providers: [reviewFeedbackService]
})

export class listReviewFeedbackComponent implements OnInit{
    feedbacks : Feedback[];

    constructor(private reviewFeedbackService : reviewFeedbackService){}

    ngOnInit(){
        this.reviewFeedbackService.getFeedback()
                                .subscribe(
                                    (data : Feedback[]) =>{
                                        this.feedbacks = data;
                                    }
                                )
    }
}
