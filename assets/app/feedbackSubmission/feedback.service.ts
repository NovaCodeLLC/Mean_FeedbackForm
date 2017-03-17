/**
 * Created by TXL8009 on 3/13/2017.
 */

import {Injectable, EventEmitter} from "@angular/core";
import {Http, Headers, Response} from '@angular/http';

import {Feedback} from "./feedback.model";

import {Observable} from "rxjs";

import 'rxjs/Rx'
import 'rxjs/add/operator/map'

@Injectable()
export class feedbackService{

    constructor(private http: Http) {}

    addFeedback(feedback: Feedback) {
        const body = JSON.stringify(feedback);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/feedback', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
}