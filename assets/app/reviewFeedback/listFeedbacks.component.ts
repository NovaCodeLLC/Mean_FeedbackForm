/**
 * Created by TXL8009 on 3/17/2017.
 */
import { Component, OnInit } from "@angular/core";

import {reviewFeedbackService} from "./reviewFeedback.service";
import {Feedback} from "../feedbackSubmission/feedback.model";

import "rxjs/Rx"
import {dirtyElements} from "./dirtyElements.model";


@Component({
    selector: 'listFeedback',
    template: `<singleFeedback 
                    [feedback]="feedback" 
                    *ngFor="let feedback of feedbacks"></singleFeedback>
                `,
    providers: [reviewFeedbackService]
})

export class listReviewFeedbackComponent implements OnInit{
    //variable declaration
    feedbacks : Feedback[];

    //initialize our service
    constructor(private reviewFeedbackService : reviewFeedbackService){}

    //initialize the data
    ngOnInit(){
        this.reviewFeedbackService.getFeedback()
                                .subscribe(
                                    (data : Feedback[]) =>{
                                        this.feedbacks = data;
                                    }
                                )
    }

    //pushes all items in the dirtyElements array to the database
    pushDataToDatabase(){
        if(dirtyElements.numberOfElements > 1){
           this.reviewFeedbackService.patchFeedback(dirtyElements.feedbacks);
        }else if(dirtyElements.numberOfElements > 0 && dirtyElements.numberOfElements<2){
            this.reviewFeedbackService.putFeedback(dirtyElements.feedbacks[0]);
        }
    }
}
