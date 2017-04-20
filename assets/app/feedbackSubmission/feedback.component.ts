/**
 * Created by TXL8009 on 3/13/2017.
 */

import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {FormGroup, Validators, FormControl, FormArray} from "@angular/forms";

import {feedbackService} from "./feedback.service";
import {Feedback} from "./feedback.model";

import {Modal} from 'angular2-modal/plugins/bootstrap'
import {Overlay} from "angular2-modal";

@Component({
    selector: 'Form-template',
    templateUrl: "./feedback.html",
    styleUrls: ["./feedback.css"],
    providers: [feedbackService]
})

export class FeedbackComponent implements OnInit{

    groupID : string;
    goalID : String;
    goalsArr : String[]=[];
    feedbackGroup = new FormGroup({
        nameBox: new FormControl('', Validators.required),
        productBox: new FormControl('', Validators.required),
        upsBox: new FormArray([]),
        downsBox: new FormArray([])
    });

    constructor(
                 private feedbackService: feedbackService,
                 overlay: Overlay,
                 vcRef: ViewContainerRef,
                 private modal: Modal) {
                    overlay.defaultViewContainer = vcRef;
                }


    get upsBox() : FormArray {return this.feedbackGroup.get('upsBox') as FormArray}
    get downsBox(): FormArray {return this.feedbackGroup.get('downsBox') as FormArray}

    ngOnInit(){
                this.groupID = this.feedbackService.getGroupID();

                this.feedbackService.getName(localStorage.getItem('userId'))
                    .subscribe(data=>this.feedbackGroup.get('nameBox').setValue(data.obj.firstName + " " + data.obj.lastName));

                this.feedbackService.getFeedbackGoals(this.groupID)
                    .subscribe(data=>{
                        this.goalsArr = data.goals;
                        this.goalID = data._id;
                        console.log(this.goalsArr);

                        this.goalsArr.forEach(item=>{
                            this.upsBox.push(new FormControl('', Validators.required));
                            this.downsBox.push(new FormControl('', Validators.required));
                        })
                    },
                    error => console.log(error));
    }

    submitFeedback(group : FormGroup){
        const feedback = new Feedback(  group.get('nameBox').value,
                                        group.get('productBox').value,
                                        group.get('upsBox').value,
                                        group.get('downsBox').value,
                                        '',
                                        localStorage.getItem('userId'),
                                        this.groupID,
                                        this.goalID
                                        );

        if(confirm("Is the data entered what you want to submit?")){

            this.feedbackService.addFeedback(feedback)
                                .subscribe(data => {console.log(data);},

                                            //error handling
                                            error => {
                                                        console.log(error);
                                                        this.modal.alert()
                                                            .size('lg')
                                                            .showClose(true)
                                                            .title('Error!')
                                                            .body('Uh oh! an Error has occurred. Give this to your admin:' + `<br><br>` +
                                                                    error)
                                                            .open();
                                            },

                                            //subscription successful and Submission completed
                                            ()=>{
                                                this.modal.alert()
                                                    .size('lg')
                                                    .showClose(true)
                                                    .title('Success!')
                                                    .body('Thank you for your Submission')
                                                    .open();

                                                this.feedbackGroup.reset();
                                            });
        }
    }
}
