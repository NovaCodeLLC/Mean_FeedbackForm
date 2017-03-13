import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Inject, Component} from "@angular/core";
/**
 * Created by TXL8009 on 3/13/2017.
 */
@Component({
    selector: 'Form-template',
    templateUrl: "./feedback.html",

})

export class FeedbackComponent  {
    feedbackForm : FormGroup;
    constructor(@Inject(FormBuilder) fb : FormBuilder){
        this.feedbackForm = fb.group({

            nameBox: ['',Validators.required],

            productBox: ['', Validators.required],

            upsBox: ['',Validators.required],

            downsBox: ['',Validators.required],
        })
    }

    submitFeedback(group : FormGroup){
        console.log(group);
    }
}
