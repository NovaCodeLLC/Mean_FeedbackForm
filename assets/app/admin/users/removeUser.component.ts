/**
 * Created by TXL8009 on 4/13/2017.
 */

import {Component, OnInit} from "@angular/core";
import {User} from "./user.model";
import {AdminService} from "../admin.service";

@Component({
    selector: 'remove-user',
    template: `<div formArrayName="contributorCtrl">
                    <div *ngFor="let contributorItem of contributorCtrl.controls; let i = index">
                        <span class="inputRowSpan">
                            <select [formControlName]="i" class="form-control">
                                <option selected disabled value="0">Choose a Contributor</option>
                                <option *ngFor="let contributor of contributorArr" [ngValue]="contributor">
                                    {{contributor.firstName}} {{contributor.lastName}}
                                </option>
                            </select>
                            <button class="btn btn-danger" type="button" (click)="onDeleteContrib(i)">-</button>
                        </span>
                    </div>
                </div>`
})

export class RemoveUser implements OnInit{
    private users:User[];

    constructor(adminService:AdminService){}

    ngOnInit(){
        this.adminService.getUsersByType()
    }
}