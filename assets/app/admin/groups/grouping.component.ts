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

@Component({
    selector: 'grouping',
    templateUrl: 'grouping.component.html',
    styleUrls: ["grouping.component.css"],
})

export class GroupingComponent implements OnInit{
    //local variables
    private directorsArr : User[];
    private managerArr : User[];
    private contributorArr: User[];

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

    get managerCtrl(): FormArray{return this.groupingForm.get('managerCtrl') as FormArray;}
    get contributorCtrl(): FormArray{return this.groupingForm.get('contributorCtrl') as FormArray;}

    constructor(private adminService : AdminService){}

    ngOnInit(){
        this.adminService.getUsersByType('Director')
            .subscribe((data : User[])=>{
                this.directorsArr = data;
                console.log(this.directorsArr);
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
}