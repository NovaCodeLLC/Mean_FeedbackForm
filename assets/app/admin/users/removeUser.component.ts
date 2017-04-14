/**
 * Created by TXL8009 on 4/13/2017.
 */

import {Component, OnInit} from "@angular/core";
import {User} from "./user.model";
import {AdminService} from "../admin.service";
import {FormGroup, FormArray, FormControl, FormBuilder, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
    selector: 'remove-user',
    template: `<form [formGroup]="userForm" (ngSubmit)="deleteUsers()">
                    <!--<md-input-container formArrayName="usersToDelete">-->
                        <!--<div *ngFor="let user of usersToDelete.controls; let index = i">-->
                            <!--<input [mdAutocomplete]="auto" mdInput formControlName="i">-->
                        <!--</div>-->
                    <!--</md-input-container>-->
                   <!--<md-autocomplete #auto="mdAutocomplete">-->
                       <!--<md-option *ngFor="let user of users" [ngValue]="user">-->
                          <!--{{ user.lastName }} , {{user.firstName}}-->
                       <!--</md-option>-->
                    <!--</md-autocomplete> -->
            
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
    userForm: FormGroup;

    get usersToDelete() : FormArray{return this.userForm.get('usersToDelete') as FormArray}

    constructor(private adminService:AdminService, builder : FormBuilder){
        this.userForm = builder.group({
                                       usersToDelete : new FormArray([new FormControl()]),
                                      });

    }

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

    deleteUsers(userForm : FormGroup){

    }
}