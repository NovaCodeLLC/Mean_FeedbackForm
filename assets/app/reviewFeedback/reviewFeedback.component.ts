/**
 * Created by TXL8009 on 3/16/2017.
 */

import {Component, Input} from "@angular/core";

import {reviewFeedbackService} from "./reviewFeedback.service";
import {Feedback} from "../feedbackSubmission/feedback.model";

import "rxjs/Rx"
import {dirtyElements} from "./dirtyElements.model";


@Component({
    selector: 'singleFeedback',
    templateUrl: "./reviewFeedback.html",
    styleUrls: ["./reviewFeedback.css"],
    providers: [reviewFeedbackService]
})

export class reviewFeedbackComponent{
    //variable declarations
    @Input() feedback : Feedback

    //when user edits a card's value, it assigns it to the local instance's corresponding field
    changeData(newValue : string, propertyName : String){
        switch (propertyName){
            case "upsBox":
                if(newValue != null){
                    this.feedback.upsBox = newValue;
                } else {
                    this.feedback.upsBox = null;
                }
                break;

            case "downsBox":
                if(newValue != null){
                    this.feedback.downsBox = newValue;
                } else {
                    this.feedback.downsBox = null;
                }
                break;
        }

        //static class used to track all the dirty elements on the page
        dirtyElements.feedbacks.push(this.feedback);

    }
}