/**
 * Created by TXL8009 on 3/27/2017.
 */

import {Component, OnInit} from "@angular/core";
import {FormGroup, FormArray, FormControl, Validators} from "@angular/forms";
import {AuthService} from "./admin.service";
import {User} from "./user.model";
import {Goals} from "./goals.model";

@Component({
    selector: 'goalTemplate',
    templateUrl: './feedbackgoals.component.html',
    styleUrls: ["./goals.css"],
})

export class GoalComponent implements OnInit{
    //variable declarations
    private directorsArr : User[];
    private goalYrs : number [] = [];
    private goalId : String;

    //variable that will be used to create dynamic goal list.
    goalForm = new FormGroup({
        goals: new FormArray([
            new FormControl('', Validators.required)
        ]),
        directorCtrl: new FormControl('', Validators.required),
        selGoalYr: new FormControl('', Validators.required)
    });


    //used to get information from our dynamic goal list and make use of calls in other methods
    get goals(): FormArray{return this.goalForm.get('goals') as FormArray;}

    constructor(private authService:AuthService){}

    //initialize the data on the form.
    ngOnInit(){
        this.authService.getDirectors()
            .subscribe((data : User[])=>{
                this.directorsArr = data;
                console.log(this.directorsArr);
            });

        for(let i=0; i<=50; i++){
            this.goalYrs.push(2017 + i);
        }
    }

    //add a new input item to the form
    addGoal(){
        this.goals.push(new FormControl());
    }

    //delete an input item
    onDelete(i : number){
        this.goals.removeAt(i);
    }

    //save goals to DB. using put
    saveGoals(goalForm : FormGroup){
            //local variable
            let goalObj;

            //switch up instantiation based on available values
            if(this.goalId !=null){
               goalObj = new Goals(goalForm.get('directorCtrl').value,
                    goalForm.get('selGoalYr').value,
                    goalForm.get('goals').value,
                    this.goalId);
            } else {
                let directorID = this.directorsArr[goalForm.get('directorCtrl').value]._id;
                console.log(directorID);
                goalObj = new Goals(directorID,
                    goalForm.get('selGoalYr').value,
                    goalForm.get('goals').value)
            }

            //call service to save data
            this.authService.putGoals(goalObj)
                .subscribe( data => console.log(data),
                            error => console.log(error));
        }
}
