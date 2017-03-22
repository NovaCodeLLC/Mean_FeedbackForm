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
    template: `<button type="button" id="pushUpdates" (click)="pushDataToDatabase()">Update Forms with Changes</button>
                    <singleFeedback 
                    [feedback]="feedback" 
                    *ngFor="let feedback of feedbacks"></singleFeedback>
                `,
    styles: [`#pushUpdates{
                color: aliceblue;
                background-color: dodgerblue;
                border: 2px solid;
                border-radius: 25px;
                padding: 15px 25px;
                position: relative;
                left: 1%;
                margin-top: 10px;}
            `],
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
        if(dirtyElements.feedbacks.length >= 1){
            console.log("Initiating service request");
           this.reviewFeedbackService.patchFeedback(dirtyElements.feedbacks)
               .subscribe(
                   data => console.log(data),
                   error => console.log(error)
               );
        }
        // else if(dirtyElements.feedbacks.length > 0 && dirtyElements.feedbacks.length<2){
        //     this.reviewFeedbackService.putFeedback(dirtyElements.feedbacks[0]);
        // }
    }
}
