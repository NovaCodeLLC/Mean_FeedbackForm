/**
 * Created by TXL8009 on 3/27/2017.
 */

import {Inject, Component, ViewContainerRef} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { Modal } from 'angular2-modal/plugins/bootstrap';
import {Overlay} from "angular2-modal";

@Component({
    selector: 'Form-template',
    template: ` <span id="goalBlock">
                    <label for="goalBox" id="goalLabel">Goal</label>
                    <input type="text"
                   id="goalBox"
                   class="form-control"
                   placeholder="Strategic Goal"
                   formControlName="goalBox">
                   <button type="button" id="deleteBtn" (click)="onDelete()">-</button>
                </span>`,
    styleUrls: ["./feedbackgoals.css"],
})

export class FeedbackComponent  {
    feedbackForm : FormGroup;

    constructor(@Inject(FormBuilder) fb : FormBuilder){
        this.feedbackForm = fb.group({

            goalBox: ['',Validators.required],
        })
    }

}
