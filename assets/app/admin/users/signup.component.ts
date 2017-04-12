import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {AdminService} from "../admin.service";
import {User} from "./user.model";

@Component({
    selector: 'app-signup',
    templateUrl: 'addUser.component.html'
})
export class AddUserComponent implements OnInit {
    myForm: FormGroup;

    constructor(private authService: AdminService){}

    onSubmit() {

        let accessLevel : string;

        switch(this.myForm.value.role){
            case('1'):
                accessLevel = "Admin";
                break;
            case('2'):
                accessLevel = "Director";
                break;
            case('3'):
                accessLevel = "Manager";
                break;
            case('4'):
                accessLevel = "Contributor";
                break;
        }

        const user = new User(  this.myForm.value.email,
                                this.myForm.value.password,
                                this.myForm.value.firstName,
                                this.myForm.value.lastName,
                                accessLevel);

        this.authService.signUp(user)
            .subscribe(data=>console.log(data),
                        error => console.error(error)
                        );
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required),
            role: new FormControl(null, Validators.required)
        });
    }
}