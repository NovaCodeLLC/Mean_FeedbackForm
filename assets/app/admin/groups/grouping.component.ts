/**
 * Created by Thomas Lesperance on 4/8/2017.
 */

/*
The purpose of this component is to create groups
 */

import {Component, OnInit} from '@angular/core'
import {AdminService} from "../admin.service";
import {FormGroup, FormArray, FormControl, Validators} from "@angular/forms";
import {User} from "../users/user.model";
import {Group} from "./group.model";
import {Response} from "@angular/http";
import {isNull} from "util";

@Component({
    selector: 'grouping',
    templateUrl: 'grouping.component.html',
    styleUrls: ["grouping.component.css"],
})

export class GroupingComponent implements OnInit{
    //local variables
    private directorArr : User[];
    private managerArr : User[];
    private contributorArr: User[];
    private groupID : String;

    //generate groupingForm
    groupingForm = new FormGroup({
        //single controls
        directorCtrl: new FormControl('', Validators.required),

        //arrays of controls
        contributorCtrl: new FormArray([
            new FormControl('', Validators.required)
        ]),

        managerCtrl: new FormArray([
            new FormControl(('', Validators.required))
        ])
    });

    //getter methods
    get managerCtrl(): FormArray{return this.groupingForm.get('managerCtrl') as FormArray;}
    get contributorCtrl(): FormArray{return this.groupingForm.get('contributorCtrl') as FormArray;}

    constructor(private adminService : AdminService){

        //listens to changes on the directorCtrl formControl in our FormBuilder Model
        this.groupingForm.controls['directorCtrl'].valueChanges.subscribe((data)=>{
            console.log(this.groupingForm.get('directorCtrl').value);
            this.adminService.getGroup(this.groupingForm.get('directorCtrl').value._id)
                .subscribe((data : any) => {
                    console.log(data);
                    //clear current arrays
                    this.groupingForm.controls['contributorCtrl'] = new FormArray([new FormControl()]);
                    this.groupingForm.controls['managerCtrl'] = new FormArray([new FormControl()]);

                    //set groupID
                    this.groupID = data.obj._id;

                    //todo: consider that the information is an array of ID values.  Must cross reference values against arrays
                });
        });
    }

    ngOnInit(){
        this.adminService.getUsersByType('Director')
            .subscribe((data : User[])=>{
                this.directorArr = data;
                console.log(this.directorArr);
            });

        this.adminService.getUsersByType('Manager')
            .subscribe((data : User[]) => {
                this.managerArr = data;
                console.log(this.managerArr);
            });

        this.adminService.getUsersByType('Contributor')
            .subscribe((data : User[]) => {
                this.contributorArr = data;
                console.log(this.contributorArr);
            });
    }

    addManager(){
        this.managerCtrl.push(new FormControl());
        console.log(this.managerCtrl);
    }

    addContributor(){
        console.log("in add contributor");
        this.contributorCtrl.push(new FormControl());
    }

    onDeleteMgr(i:number) {
        if (this.managerCtrl.length > 1) {
            this.managerCtrl.removeAt(i);
        }
    }

    onDeleteContrib(i:number){
        if (this.contributorCtrl.length >1){
            this.contributorCtrl.removeAt(i);
        }
    }

    saveGrouping(groupForm : FormGroup){
        //this will be the group object to pass to the observable
        let group : Group;

        //holders to handle converting data
        let managerObj = this.managerCtrl.value;
        let contributorObj = this.contributorCtrl.value;

        //transformed arrays where converted data will be stored
        let managerIDs : String[] = [];
        let contributorIDs : String[] = [];

        //extract array of IDs
        managerObj.forEach((item)=>{
            managerIDs.push(item._id);
        });

        contributorObj.forEach((item)=>{
            contributorIDs.push(item._id);
        });

        group = new Group(  groupForm.get('directorCtrl').value._id,
                            managerIDs,
                            contributorIDs);

        console.log("this is your group: " + JSON.stringify(group));
         this.adminService.putGroup(group)
             .subscribe((data : Response) => console.log(data));
    }
}