/**
 * Created by TXL8009 on 3/17/2017.
 */
import {Component, OnInit, ViewContainerRef} from "@angular/core";

import {dirtyElements} from "./dirtyElements.model";
import {Feedback} from "../feedbackSubmission/feedback.model";
import { Modal } from 'angular2-modal/plugins/bootstrap';
import {Overlay} from "angular2-modal";

import {reviewFeedbackService} from "./reviewFeedback.service";
import "rxjs/Rx"

@Component({
    selector: 'listFeedback',
    template: `<button type="button" id="pushUpdates" (click)="pushDataToDatabase()">Update Forms with Changes</button>
                    <singleFeedback 
                    [feedback]="feedback"
                     (change)="feedbacksChanged($event)"
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
                
                #pushUpdates:hover{
                    color: dodgerblue;
                    background-color: aliceblue;
                }
            `],
    providers: [reviewFeedbackService]
})

export class listReviewFeedbackComponent implements OnInit{
    //variable declaration
    private feedbacks : Feedback[];

    //initialize our service
    constructor(private reviewFeedbackService : reviewFeedbackService,
                overlay: Overlay,
                vcRef: ViewContainerRef,
                private modal: Modal) {
                                        overlay.defaultViewContainer = vcRef;
                                        }

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
                   data => {
                       console.log(data);
                       this.modal.alert()
                           .size('sm')
                           .showClose(true)
                           .title('Complete')
                           .body('Your Update Has Been Processed')
                           .open();
                   },
                   error => console.log(error)
               );
        }
        // else if(dirtyElements.feedbacks.length > 0 && dirtyElements.feedbacks.length<2){
        //     this.reviewFeedbackService.putFeedback(dirtyElements.feedbacks[0]);
        // }
        dirtyElements.feedbacks = [];

    }

    feedbacksChanged(event){
        this.modal.alert()
            .size('lg')
            .showClose(true)
            .title('Complete')
            .body('You have deleted the following feedback item:' + `<br><br>` +
                'ID: ' + this.feedbacks[this.feedbacks.indexOf(event)].feedbackID +
                `<br>` +
                'Name: ' + this.feedbacks[this.feedbacks.indexOf(event)].nameBox +
                `<br>`+
                'Product Line: ' + this.feedbacks[this.feedbacks.indexOf(event)].productBox +
                `<br>` +
                'Ups: ' + this.feedbacks[this.feedbacks.indexOf(event)].upsBox +
                `<br>` +
                'Downs: ' + this.feedbacks[this.feedbacks.indexOf(event)].downsBox)
            .open();
        this.feedbacks.splice(this.feedbacks.indexOf(event),1);
    }
}
