import {User} from "./user.model";
import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/Rx'
import {Observable} from "rxjs";
/**
 * Created by Thomas Lesperance on 3/25/2017.
 */

@Injectable()
export class AuthService{

    constructor(private  http: Http){}

    signUp(user:User){
        const body = JSON.stringify((user));
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user', body, {headers: headers})
            .map((response : Response) => response.json())
            .catch((error: Response)=> Observable.throw(error.json()));
    }

    signIn(user:User){
        const body = JSON.stringify((user));
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
            .map((response : Response) => response.json())
            .catch((error: Response)=> Observable.throw(error.json()));
    }

    logout(){
        localStorage.clear();
    }

    isLoggedIn(){
        return localStorage.getItem('token') != null;
    }
}