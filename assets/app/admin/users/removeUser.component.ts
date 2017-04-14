/**
 * Created by TXL8009 on 4/13/2017.
 */

import {Component, OnInit} from "@angular/core";
import {User} from "./user.model";
import {AdminService} from "../admin.service";
import {FormGroup, FormArray, FormControl} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
    selector: 'remove-user',
    template: `<form [formGroup]="userForm" (ngSubmit)="deleteUsers()">
                    <div formArrayName="usersToDelete">
                        <div *ngFor="let user of usersToDelete.controls; let i = index">
                            <span class="inputRowSpan">
                                <input type="text" id="i" class="form-control">
                                <button class="btn btn-danger" type="button" (click)="onDelete(i)">-</button>
                            </span>
                        </div>
                    </div>
                </form>`
})

export class RemoveUserComponent implements OnInit{
    private users:User[];

    userForm = new FormGroup({
       usersToDelete : new FormArray([new FormControl()])
    });

    get usersToDelete() : FormArray{return this.userForm.get('usersToDelete') as FormArray}

    constructor(private adminService:AdminService){

    }

    ngOnInit(){
        this.adminService.getUsersByType()
    }

    addUser(){
        this.usersToDelete.push(new FormControl());
    }

    onDelete(i:number){
        this.usersToDelete.removeAt(i);
    }

    deleteUsers(userForm : FormGroup){

    }
}