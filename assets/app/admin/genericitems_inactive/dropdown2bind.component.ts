/**
 * Created by Thomas Lesperance on 4/9/2017.
 */

import {Component, Input, Output, EventEmitter} from '@angular/core'
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: "NC-DropDown-BindTwoField",
    template: `<select id="DropDownWrapper" class="form-control" *ngIf="items" formControlName="ctrlName">
                    <!--placeholder text to prompt user-->
                    <option selected disabled [value]="0">Select a {{placeholderName}}</option>
                    
                    <!--iterate over array and present the options-->
                    <option [ngValue]="item" 
                    *ngFor="let item of items; let i = index" 
                    (click)="select(item, i)">
                        {{item.selectOptionField1}} {{item.selectOptionField2}}
                    </option>
                    
                </select>`
})

export class NCDropDown2Items {
    @Input() formGroup: FormGroup
    @Input() ctrlName : FormControl;
    @Input() items: any[]; //array of options
    @Input() placeholderName: String; //text to use to prompt the user of the item to select
    @Input() selectOptionField1: any; //Field to bind on
    @Input() selectOptionField2: any; //Field to bind on

    @Output() selectedItem: EventEmitter<any> = new EventEmitter(); //outputs the selected value
    @Output() i: EventEmitter<any> = new EventEmitter(); //outputs the index of the selected value


    //handles the emission events
    select(selectedItem: any, index: number) {
        this.selectedItem.emit(selectedItem);
        this.i.emit(index);
    }
}
