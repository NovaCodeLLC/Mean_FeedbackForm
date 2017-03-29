/**
 * Created by TXL8009 on 3/27/2017.
 */

import {Component, OnInit} from "@angular/core";
import { FormGroup, FormArray, FormControl } from "@angular/forms";
import {AuthService} from "./admin.service";
import {Response} from "@angular/http";

@Component({
    selector: 'goalTemplate',
    template: `<form [formGroup]="goalForm" (ngSubmit)="onSubmit(goalForm)">
                    <select [formControlName]="director">
                        <option ngForm="let director of directors; let i = index" 
                                [ngValue]="i"
                                *ngIf="directorsArr">
                        {{director}}
                        </option>
                    </select>
                    <div formArrayName="goals">
                        <div *ngFor="let goal of goals.controls; let i = index">        
                            <span>
                                <input class="form-control" [formControlName]="i" placeholder="Add New Goal">     
                                <button class="btn btn-danger" type="button" (click)="onDelete(i)">-</button>
                            </span>
                        </div>
                    </div>
                    <br>
                    <span>
                        <button class="btn btn-success" type="button" (click)="addGoal()">Add Goal</button>
                        <button class="btn btn-primary">Save</button>
                    </span>
                </form>`,
    styleUrls: ["./goals.css"],
})

export class GoalComponent implements OnInit{
//variable that will be used to create dynamic goal list.
    goalForm = new FormGroup({
        goals: new FormArray([
            new FormControl()
        ]),
        director: new FormControl()
    });

    directorsArr : String[];

    constructor(private authService:AuthService){}

    //used to get information from our dynamic goal list and make use of calls in other methods
    get goals(): FormArray{return this.goalForm.get('goals') as FormArray;}


    ngOnInit(){
        this.authService.getDirectors()
            .subscribe((data : String[])=>{
                console.log(data);
                this.directorsArr = data;
            })
    }

    addGoal(){
        this.goals.push(new FormControl());
    }

    onDelete(i : number){
        this.goals.removeAt(i);
    }

    saveGoals(goalForm : FormGroup){
        //ToDo: implement save call to the database / adding goals
    }
}
