/**
 * Created by Thomas Lesperance on 4/9/2017.
 */

import {Component, Input, Output, EventEmitter} from '@angular/core'

@Component({
    selector: "NC-DropDown-bindOneField",
    template: `<select id="DropDownWrapper" *ngIf="items">
                    <!--placeholder text to prompt user-->
                    <option selected disabled [value]="0">Select a {{placeholderName}}</option>
                    
                    <!--iterate over array and present the options-->
                    <option [ngValue]="item" 
                    *ngFor="let item of items; let i = index" 
                    (click)="select(item, i)">
                        {{item.selectOptionField}}
                    </option>
                    
                </select>`
})

export class NCDropDown1Item{
    @Input() items : any[]; //array of options
    @Input() placeholderName : String; //text to use to prompt the user of the item to select
    @Input() selectOptionField : any; //Field to bind on

    @Output() selectedItem : EventEmitter<any> = new EventEmitter(); //outputs the selected value
    @Output() i : EventEmitter<any> = new EventEmitter(); //outputs the index of the selected value


    //handles the emission events
    select(selectedItem : any, index : number) {
        this.selectedItem.emit(selectedItem);
        this.i.emit(index);
    }
}