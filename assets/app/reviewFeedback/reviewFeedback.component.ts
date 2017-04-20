/**
 * Created by TXL8009 on 3/16/2017.
 */

import {Component, Input, Output, EventEmitter, ViewContainerRef} from "@angular/core";
import {dirtyElements} from "./dirtyElements.model";

import {Feedback} from "../feedbackSubmission/feedback.model";

import {reviewFeedbackService} from "./reviewFeedback.service";
import "rxjs/Rx"



@Component({
    selector: 'singleFeedback',
    templateUrl: "./reviewFeedback.html",
    styleUrls: ["./reviewFeedback.css"],
    providers: [reviewFeedbackService]
})

export class reviewFeedbackComponent{
    //variable declarations
    @Input() feedback : Feedback;
    @Input() goalsArr : String[];
    @Output()
    change: EventEmitter<Feedback> = new EventEmitter<Feedback>();

    constructor(private reviewFeedbackServices : reviewFeedbackService){}


    //when user edits a card's value, it assigns it to the local instance's corresponding field
    changeData(newValue : string, propertyName : String, i:number, feedback : Feedback){

        console.log("new value = " + newValue + " ; propertyName = " + propertyName);

        switch (propertyName){
            case "upsBox":
                if(newValue != null){
                    newValue = newValue.replace(/(\r\n|\n|\r)/gm," ");
                    newValue = newValue.trim();
                    this.feedback.upsBox[i] = newValue;
                } else {
                    this.feedback.upsBox[i] = null;
                }
                break;

            case "downsBox":
                if(newValue != null){
                    newValue = newValue.replace(/(\r\n|\n|\r)/gm," ");
                    newValue = newValue.trim();
                    this.feedback.downsBox[i] = newValue;
                } else {
                    this.feedback.downsBox[i] = null;
                }
                break;
        }

        //static class used to track all the dirty elements on the page
        if(dirtyElements.feedbacks.indexOf(feedback) == -1) {
            dirtyElements.feedbacks.push(this.feedback);
        } else {
            dirtyElements.feedbacks[dirtyElements.feedbacks.indexOf(feedback)] = this.feedback;
        }

        console.log(dirtyElements.feedbacks);
    }

    //calls the delete service.  When a response is send an event emitter transmitting the deleted item's data.
    onDelete(){
        console.log("in Delete service");
        this.reviewFeedbackServices.deleteFeedback(this.feedback)
            .subscribe(
                data => {
                    console.log(data);
                    this.change.emit(this.feedback);
                },
                        error => console.log(error)

            );
    }
}