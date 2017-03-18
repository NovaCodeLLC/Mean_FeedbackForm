/**
 * Created by TXL8009 on 3/13/2017.
 */

import {Injectable} from "@angular/core";
import {Http, Response} from '@angular/http';

import {Feedback} from "../feedbackSubmission/feedback.model";

import 'rxjs/Rx';
import 'rxjs/add/operator/map'
import { Observable } from "rxjs";
import {feedbackService} from "../feedbackSubmission/feedback.service";

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
        console.log("putting data");
    }

    patchFeedback(feedback : Feedback[]){
        console.log("patching data");
    }

    deleteFeedback() {
        return this.http.delete('http://localhost:3000/reviewFeedback')
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
}