/**
 * Created by Thomas Lesperance on 4/8/2017.
 */

/*
The purpose of this component is to create groups
 */

import {Component, OnInit, ViewContainerRef} from '@angular/core'
import {AdminService} from "../admin.service";
import {FormGroup, FormArray, FormControl, Validators} from "@angular/forms";
import {User} from "../users/user.model";
import {Group} from "./group.model";
import {Response} from "@angular/http";
import {isNullOrUndefined} from "util";
import {Overlay} from "angular2-modal";
import {Modal} from 'angular2-modal/plugins/bootstrap'

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
            new FormControl('', Validators.required)
        ])
    });

    //getter methods
    get managerCtrl(): FormArray{return this.groupingForm.get('managerCtrl') as FormArray;}
    get contributorCtrl(): FormArray{return this.groupingForm.get('contributorCtrl') as FormArray;}

    constructor(private adminService : AdminService,
                overlay: Overlay,
                vcRef: ViewContainerRef,
                private modal: Modal){

        overlay.defaultViewContainer = vcRef;

        //listens to changes on the directorCtrl formControl in our FormBuilder Model
        this.groupingForm.controls['directorCtrl'].valueChanges.subscribe((data)=>{
            console.log(this.groupingForm.get('directorCtrl').value);
            this.adminService.getGroup(this.groupingForm.get('directorCtrl').value._id)
                .subscribe((data : any) => {
                    console.log(data);

                    let newContributorCtrl =[];
                    let newManagerCtrl = [];

                    //clear current arrays
                    this.groupingForm.controls['contributorCtrl'] = new FormArray([]);
                    this.groupingForm.controls['managerCtrl'] = new FormArray([]);

                    //set groupID
                    this.groupID = data.obj._id;

                    //how this works:
                    //1) access the contributor's ID array (data from DB) and iterate over each entry in the array
                    //2) now take the current contributor's ID (DB data) and compare it to the local contributor's array (local array of contributor user objects in angular)
                    //3) if the IDs match, push the user to an array that'll later be used to populate the form's contributors
                        data.obj.contributorID.forEach(contribID=>{
                            this.contributorArr.forEach(item=>{
                                if(item._id == contribID){
                                    newContributorCtrl.push(item);
                                }
                            });
                        });


                    //in order to use the array of contributors, we create a new form Control in the formArray for each.
                    newContributorCtrl.forEach(user=>{
                        this.contributorCtrl.push(new FormControl());
                    });
                    //now we set the controls to the array of user objects in the new contributor array.  Viola we have a populated set of contributors
                     this.groupingForm.controls['contributorCtrl'].setValue(newContributorCtrl);
                    //now we add a blank entry to the end of the list to allow a person to add new users.
                     this.contributorCtrl.push(new FormControl());


                     //this set of instructions will do the exact same thing as above, but for the mangers now.
                    data.obj.managerID.forEach(mngrID=>{
                            this.managerArr.forEach(item=>{
                                if(item._id == mngrID){
                                    newManagerCtrl.push(item);
                                }
                            });
                        });

                    //in order to use the array of contributors, we create a new form Control in the formArray for each.
                    newManagerCtrl.forEach(user=>{
                        this.managerCtrl.push(new FormControl());
                    });
                    //now we set the controls to the array of user objects in the new contributor array.  Viola we have a populated set of contributors
                    this.groupingForm.controls['managerCtrl'].setValue(newManagerCtrl);
                    //now we add a blank entry to the end of the list to allow a person to add new users.
                    this.managerCtrl.push(new FormControl());
                },
                error=>{
                    //reset my form data, controls, and tracking variables when a record doesn't exist.
                    this.groupingForm.controls['contributorCtrl'] = new FormArray([]);
                    this.groupingForm.controls['managerCtrl'] = new FormArray([]);

                    this.contributorCtrl.push(new FormControl());
                    this.managerCtrl.push(new FormControl());

                    this.groupID = null;
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

        //these next lines will filter null / novalue entries
        let managers = groupForm.get('managerCtrl').value;
        let contributors = groupForm.get('contributorCtrl').value;

        let filteredManagers = managers.filter((item)=>{
            return (item != (undefined || '' || null));
        });

        let filteredContributors = contributors.filter(item=> {
           return (item != (undefined || '' || null));
        });

        //transformed arrays where converted data will be stored
        let managerIDs : String[] = [];
        let contributorIDs : String[] = [];

        //extract array of IDs
        filteredManagers.forEach((item)=>{
            managerIDs.push(item._id);
        });

        filteredContributors.forEach((item)=>{
            contributorIDs.push(item._id);
        });

        //determines if we're creating a new group or updating the current group
        if(isNullOrUndefined(this.groupID)) {
            group = new Group(groupForm.get('directorCtrl').value._id,
                managerIDs,
                contributorIDs);
        } else {
            group = new Group(groupForm.get('directorCtrl').value._id,
                                managerIDs,
                                contributorIDs,
                                this.groupID);
        }

         this.adminService.putGroup(group)
             .subscribe((data : Response) =>{
                                                this.groupID = data.obj._id;
                                                console.log(data);

                                                 this.modal.alert()
                                                     .size('lg')
                                                     .showClose(true)
                                                     .title('Success!')
                                                     .body('Your group has been Updated.')
                                                     .open();
                                        },
                                        error=> console.log("error is :" + error.json()),
                                        ()   =>{
                                            let completedGroup = new Group( group.directorID,
                                                                            group.managerIDs,
                                                                            group.contributorIDs,
                                                                            this.groupID);
                                         this.updateUsersGroupID(completedGroup)});
    }

    updateUsersGroupID(data:any){
        let group : Group = data;
        console.log("updating user's profiles with their new groups");
        console.log(group);
        this.adminService.updateUsersGroupID(group)
            .subscribe((data)=>console.log(data));
    }

    deleteRecord(){
        this.adminService.deleteGroup(this.groupID)
            .subscribe(data => {
                                this.modal.alert()
                                    .size('lg')
                                    .showClose(true)
                                    .title('Success!')
                                    .body('Your group has been deleted!')
                                    .open();

                                console.log(data);

            });
    }
}