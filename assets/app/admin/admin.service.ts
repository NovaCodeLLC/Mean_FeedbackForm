import {User} from "./users/user.model";
import {Injectable} from "@angular/core";
import {Http, Headers, Response, RequestOptions} from "@angular/http";
import 'rxjs/Rx'
import {Observable} from "rxjs";
import {Goals} from "./feedbackgoals/goals.model";
import {Group} from "./groups/group.model";
import {deleteUserModel} from "./users/deleteUserGroup.model";
/**
 * Created by Thomas Lesperance on 3/25/2017.
 */

@Injectable()
export class AdminService{

    constructor(private  http: Http){}

    updateUsersGroupID(group:Group){
        const body = JSON.stringify(group);
        const headers = new Headers({'Content-Type' : 'application/json'});
        return this.http.put('http://localhost:3000/admin/group/updateGroupID/', body, {headers: headers})
                        .map((res : Response) => {return res.json()})
                        .catch((error:Response) => Observable.throw(error.json()));
    }

    deleteUsers(users : deleteUserModel){
        const body = JSON.stringify(users);
        const headers = new Headers({'Content-Type' : 'application/json'});
        console.log(body);
        return this.http.delete("http://localHost:3000/admin/user/delete/", new RequestOptions({body: body, headers: headers}))
                    .map((res: Response) => {return res.json()})
                    .catch((error:Response)=>Observable.throw(error.json()));
    }

    deleteGroup(groupID : String){
        return this.http.delete("http://localhost:3000/admin/group/"+groupID)
            .map((res:Response) =>{return res.json();})
            .catch((error:Response) => Observable.throw(error.json()));
    }

    getGroup(directorId : String){
        return this.http.get("http://localhost:3000/admin/group/" + directorId)
                        .map((res : Response) => {return res.json();})
                        .catch ((error : Response) => Observable.throw(error.json()));
    }

    putGroup(group:Group){
        const body = JSON.stringify(group);
        const headers = new Headers({'Content-Type' : 'application/json'});
        return this.http.put("http://localhost:3000/admin/group/", body, {headers: headers})
            .map((res:Response)=>res.json())
            .catch((error:Response) =>Observable.throw(error));
    }

    getUsersByType(type? : String){
        return this.http.get("http://localhost:3000/admin/droplist/" + type)
            .map(res=>{return res.json().obj;})
            .catch((error:Response)=>Observable.throw(error.json()));
    }

    putGoals(goal : Goals){
        const body = JSON.stringify(goal);
        const headers = new Headers({'Content-Type' : 'application/json'});
        return this.http.put('http://localhost:3000/admin/goal', body, {headers:headers})
            .map((res : Response) => res.json())
            .catch((error : Response) => Observable.throw(error.json()));
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

    getGoals(selectedDirector : String, selectedYr : String){
        return this.http.get('http://localhost:3000/admin/goals/' + selectedDirector + '/' + selectedYr)
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