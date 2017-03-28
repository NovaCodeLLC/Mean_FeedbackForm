/**
 * Created by TXL8009 on 3/27/2017.
 */

import { Component } from "@angular/core";
import { FormGroup, FormArray, FormControl } from "@angular/forms";

@Component({
    selector: 'goalTemplate',
    template: `<form [formGroup]="goalForm">
                    <div formArrayName="goals">
                        <div *ngFor="let goal of goals.controls; let i = index">                        
                                <input [formControlName]="i" placeholder="Add New Goal">                      
                        </div>
                    </div>
                   <button type="button" (click)="addGoal()">Add Goal</button>
                </form>`,
})

export class GoalComponent  {


    goalForm = new FormGroup({
        goals: new FormArray([
            new FormControl('InitialGoal')
        ]),
    });

    get goals(): FormArray{return this.goalForm.get('goals') as FormArray;}

    addGoal(){
        this.goals.push(new FormControl());
    }

    onDelete(i : number){
        this.goals.removeAt(i);
    }
}
