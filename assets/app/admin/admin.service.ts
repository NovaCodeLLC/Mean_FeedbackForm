import {User} from "./user.model";
import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/Rx'
import {Observable} from "rxjs";
import {Goals} from "./goals.model";
/**
 * Created by Thomas Lesperance on 3/25/2017.
 */

@Injectable()
export class AuthService{

    constructor(private  http: Http){}

    getDirectors(){
        return this.http.get("http://localhost:3000/admin/droplist")
            .map(res=>{
                //transform from json to string array
                const directors=res.json().obj;
                let transformStrings : String[] =[];

                for(let director of directors){
                    transformStrings.push(director);
                }
                return transformStrings;
            })
            .catch((error:Response)=>Observable.throw(error.json()));
    }

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

    isAdmin(){
        return localStorage.getItem('Security') == "968";
    }

    isManager(){
        return localStorage.getItem('Security') == "729"
    }
}