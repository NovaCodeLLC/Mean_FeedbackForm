/**
 * Created by TXL8009 on 3/27/2017.
 */

import {Component, OnInit} from "@angular/core";
import { FormGroup, FormArray, FormControl } from "@angular/forms";
import {AuthService} from "./admin.service";
import {User} from "./user.model";

@Component({
    selector: 'goalTemplate',
    templateUrl: './feedbackgoals.component.html',
    styleUrls: ["./goals.css"],
})

export class GoalComponent implements OnInit{
//variable that will be used to create dynamic goal list.
    goalForm = new FormGroup({
        goals: new FormArray([
            new FormControl()
        ]),
        directorCtrl: new FormControl()
    });

    directorsArr : User[];

    constructor(private authService:AuthService){}

    //used to get information from our dynamic goal list and make use of calls in other methods
    get goals(): FormArray{return this.goalForm.get('goals') as FormArray;}


    ngOnInit(){
        this.authService.getDirectors()
            .subscribe((data : User[])=>{
                this.directorsArr = data;
                console.log(this.directorsArr);
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
