/**
 * Created by TXL8009 on 3/13/2017.
 */

import {Inject, Component, ViewContainerRef} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

import {feedbackService} from "./feedback.service";
import {Feedback} from "./feedback.model";

import { Modal } from 'angular2-modal/plugins/bootstrap';
import {Overlay} from "angular2-modal";

@Component({
    selector: 'Form-template',
    templateUrl: "./feedback.html",
    styleUrls: ["./feedback.css"],
    providers: [feedbackService]
})

export class FeedbackComponent  {
    feedbackForm : FormGroup;

    constructor(@Inject(FormBuilder) fb : FormBuilder, private feedbackService: feedbackService,
                overlay: Overlay,
                vcRef: ViewContainerRef,
                private modal: Modal){
        this.feedbackForm = fb.group({

            nameBox: ['',Validators.required],

            productBox: ['', Validators.required],

            upsBox: ['',Validators.required],

            downsBox: ['',Validators.required],
        })
        overlay.defaultViewContainer = vcRef;
    }

    submitFeedback(group : FormGroup){
        const feedback = new Feedback(  group.get('nameBox').value,
                                        group.get('productBox').value,
                                        group.get('upsBox').value,
                                        group.get('downsBox').value);

        if(confirm("Is the data entered what you want to submit?")){

            this.feedbackService.addFeedback(feedback)
                                .subscribe(
                                    data => {
                                        console.log(data);
                                        this.modal.alert()
                                            .size('sm')
                                            .showClose(true)
                                            .title('Submitted!')
                                            .body('Thank you for submitting your feedback.')
                                            .open();
                                        this.feedbackForm.reset();
                                    },
                                    error => console.log(error)
                                );
        }
    }
}
