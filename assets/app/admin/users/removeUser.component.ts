/**
 * Created by TXL8009 on 4/13/2017.
 */

import {Component, OnInit} from "@angular/core";
import {User} from "./user.model";
import {AdminService} from "../admin.service";
import {FormGroup, FormArray, FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import findIndex = require("core-js/fn/array/find-index");
import {deleteUserModel} from "./deleteUserGroup.model";

@Component({
    selector: 'remove-user',
    template: `<form [formGroup]="userForm" (ngSubmit)="deleteUsers(userForm)" *ngIf="users">
                    <div formArrayName="usersToDelete">
                        <div *ngFor="let user of usersToDelete.controls;let i = index" id="i">
                            <span class="inputDeleteUserRow">
                                <md-input-container>
                                        <input type="text" [mdAutocomplete]="auto" mdInput [formControlName]="i">
                                </md-input-container>
                                
                                <button class="btn btn-danger" type="button" (click)="onDelete(i)">-</button>
                                
                               <md-autocomplete #auto="mdAutocomplete" [displayWith]="displayFn" >
                                   <md-option *ngFor="let user of users" [value]="user">
                                      {{ user.lastName }} , {{user.firstName}}
                                   </md-option>
                                </md-autocomplete> 
                            </span>
                        </div>
                    </div>
                    
                    <span class="fixedBtns">
                        <button class="btn btn-primary">Remove Users</button>
                        <button type="button" class="btn btn-success" (click)="addUser()">+</button>
                    </span>
                    <!--<div formArrayName="usersToDelete">-->
                        <!--<div *ngFor="let user of usersToDelete.controls; let i = index">-->
                            <!--<span class="inputRowSpan">-->
                                <!--<input type="text" id="i" class="form-control">-->
                                <!--<button class="btn btn-danger" type="button" (click)="onDelete(i)">-</button>-->
                            <!--</span>-->
                        <!--</div>-->
                    <!--</div>-->
                </form>`
})

export class RemoveUserComponent implements OnInit{
    private users:User[];
    //filteredOptions: Observable<any>;

    userForm = new FormGroup({
        usersToDelete : new FormArray([new FormControl()]),
    });

    get usersToDelete() : FormArray{return this.userForm.get('usersToDelete') as FormArray}

    constructor(private adminService:AdminService){}

    ngOnInit(){

        this.adminService.getUsersByType()
            .subscribe((data:User[])=>{
               this.users = data;
               console.log("your user array");
               console.log(this.users);
            });
    }

    addUser(){
        this.usersToDelete.push(new FormControl());
    }

    onDelete(i:number){
        this.usersToDelete.removeAt(i);
    }

    displayFn(user:User){
        return user ? user.lastName + ", " + user.firstName: user;
    }

    filter(name: string): User[] {
        console.log("name is: " + name);
        return this.users.filter(option => new RegExp(`^${name}`, 'gi').test(option.lastName) || new RegExp(`^${name}`, 'gi').test(option.firstName));
    }

    deleteUsers(userForm : FormGroup){

        let UserModel : deleteUserModel = new deleteUserModel([],[],[],[]);
        console.log(UserModel);
        this.userForm.value.usersToDelete.forEach(item=>{
            console.log(item._id);
           switch (item.role){
               case "Director":
                   UserModel.directorID.push(item._id);
                   break;
               case "Contributor":
                   UserModel.contributorID.push(item._id);
                   break;
               case "Manager":
                   UserModel.managerID.push(item._id);
                   break;
               case "Admin":
                   UserModel.adminsID.push(item._id);
                   break;
            }
        });
       console.log("id array: " + JSON.stringify(UserModel));

        this.adminService.deleteUsers(UserModel)
            .subscribe(data => console.log(data),
                        error=>console.log(error));
    }
}