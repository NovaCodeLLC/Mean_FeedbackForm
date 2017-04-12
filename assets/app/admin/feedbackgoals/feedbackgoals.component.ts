/**
 * Created by TXL8009 on 3/27/2017.
 */

import {Component, OnInit} from "@angular/core";
import {FormGroup, FormArray, FormControl, Validators} from "@angular/forms";
import {AdminService} from "../admin.service";
import {User} from "../users/user.model";
import {Goals} from "./goals.model";
import {isNullOrUndefined} from "util";
import {isNull} from "util";

@Component({
    selector: 'goalTemplate',
    templateUrl: 'feedbackgoals.component.html',
    styleUrls: ["goals.css"],
})

export class GoalComponent implements OnInit{
    //variables
    private directorsArr : User[];
    private goalYrs : number [] = [];
    private goalId : String;
    private selectedDirector : String;
    private selectedYr : String;

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

    constructor(private adminService:AdminService){}

    //initialize the data on the form.
    ngOnInit(){
        this.adminService.getUsersByType("Director")
            .subscribe((data : User[])=>{
                this.directorsArr = data;
                console.log(this.directorsArr);
            });

        for(let i=0; i<=50; i++){
            this.goalYrs.push(2017 + i);
        }
    }

    //setters to prevent undefined problems with html tags
    setDirector(director : number){
        console.log(director);
        this.selectedDirector = this.directorsArr[director]._id;
        this.onSelection();
    }

    setGoalYr(year : string){
        console.log(year);
        this.selectedYr = year;
        this.onSelection();
    }

    onSelection(){
        console.log("in onSelection director = " + this.selectedDirector +"\n" + "year = " + this.selectedYr);
        if(!isNullOrUndefined(this.selectedDirector) && !isNullOrUndefined(this.selectedYr)){

            this.goalForm.controls['goals'] = new FormArray([new FormControl()]);

            this.adminService.getGoals(this.selectedDirector, this.selectedYr)
                .subscribe(
                (data : any)=>{
                        this.goals.removeAt(0);
                        data.obj.goals.forEach((item)=> {
                            if(!isNull(item)) {
                                this.goals.push(new FormControl(item.toString()));
                            } else {
                                this.goals.push(new FormControl());
                            }
                        });
                        this.goals.push(new FormControl());
                        this.goalId = data.obj._id;
                },
                    (error : any) =>{
                        console.log(error);
                    });
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
            let goals = goalForm.get('goals').value;

            let filteredGoals = goals.filter((item)=>{
               return (item != (undefined || '' || null));
            });

            //switch up instantiation based on available values
            if(this.goalId !=null){
               goalObj = new Goals(this.selectedDirector,
                    goalForm.get('selGoalYr').value,
                    filteredGoals,
                    this.goalId);
            } else {
                goalObj = new Goals(this.selectedDirector,
                    goalForm.get('selGoalYr').value,
                    filteredGoals)
            }

            console.log("goal object is");
            console.log(goalObj);
            //call service to save data
            this.adminService.putGoals(goalObj)
                .subscribe( (data:any) => {
                    console.log(data);
                    this.goalForm.controls['goals'] = new FormArray([]);

                    data.obj.goals.forEach((item)=> {
                            if(!isNull(item)) {
                                this.goals.push(new FormControl(item.toString()));
                            } else {
                                this.goals.push(new FormControl());
                            }
                        });
                        this.goals.push(new FormControl());
                        this.goalId = data.obj._id;
                },
                            error => console.log(error));
        }
}
