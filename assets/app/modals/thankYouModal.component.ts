/**
 * Created by Thomas Lesperance on 4/17/2017.
 */

import {Component} from "@angular/core";
import {MdDialogRef, MdDialogConfig} from "@angular/material";

@Component({
             selector: 'thank-you-modal',
             template: `
                            <h3>Thank You for Your Submission</h3>
                            <p>Your Feedback has been Saved.</p>
                            <button md-raised-button (click)="dialogRef.close()">Close</button>
                        `,
})

export class ThankYouComponent{
    constructor(public dialogRef: MdDialogRef<any>, ) {}
}
