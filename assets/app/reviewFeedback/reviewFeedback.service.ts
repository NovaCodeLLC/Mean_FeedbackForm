/**
 * Created by TXL8009 on 3/13/2017.
 */

import {Injectable} from "@angular/core";
import {Http, Response, Headers} from '@angular/http';

import {Feedback} from "../feedbackSubmission/feedback.model";

import 'rxjs/Rx';
import 'rxjs/add/operator/map'
import { Observable } from "rxjs";
import {feedbackService} from "../feedbackSubmission/feedback.service";
import forEach = require("core-js/fn/array/for-each");

@Injectable()
export class reviewFeedbackService{
    private feedback: Feedback;

    constructor(private http: Http) {}

    getFeedback(){
        return this.http.get('http://localhost:3000/feedback')
            .map(res => {
                const feedbacks = res.json().obj;
                let transformedFeedback : Feedback[] = [];
                for(let feedback of feedbacks){
                    transformedFeedback.push(
                        new Feedback(   feedback.nameBox,
                                        feedback.productBox,
                                        feedback.upsBox,
                                        feedback.downsBox,
                                        feedback._id));
                }
                return transformedFeedback;
            })
            .catch((error: Response) => Observable.throw(new Error(error.toString())));
    }

    putFeedback(feedback : Feedback){
        const body = JSON.stringify(feedback);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put("http://localhost:3000/feedback/" +
                                feedback.feedbackID,
                                body,
                                {headers: headers}
                                )
                        .map((res : Response) => res.json())
            .catch((error: Response)=>Observable.throw(error.json()));
    }

    patchFeedback(feedback : Feedback[]){

        const body = JSON.stringify(feedback);
        const headers = new Headers({'Content-Type' : 'application/json'});
        console.log(body);
        return this.http.patch("http://localhost:3000/feedback", body, {headers: headers})
                        .map((res:Response) =>res.json())
                        .catch((error : Response) => Observable.throw(error.json()));
    }

    deleteFeedback(feedback : Feedback) {
         return this.http.delete('http://localhost:3000/feedback/' + feedback.feedbackID)
                    .map((response: Response) => response.json())
                    .catch((error: Response) => Observable.throw(new Error(error.toString())));
    }
}