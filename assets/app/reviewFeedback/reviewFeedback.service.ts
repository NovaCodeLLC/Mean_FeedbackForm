/**
 * Created by TXL8009 on 3/13/2017.
 */

import {Injectable} from "@angular/core";
import {Http, Response} from '@angular/http';

import {Feedback} from "../feedbackSubmission/feedback.model";

import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class reviewFeedbackService{
    private feedbacks: Feedback[];

    constructor(private http: Http) {}

    getFeedback() {
        return this.http.get('http://localhost:3000/feedback')
            .map((response: Response) => {
                const feedbacks = response.json().obj;
                let transformedFeedbacks: Feedback[] = [];
                for (let feedback of feedbacks) {
                    transformedFeedbacks.push(new Feedback( feedback.nameBox,
                        feedback.productBox,
                        feedback.upsBox,
                        feedback.downsBox,
                        feedback.feedbackID));
                }
                this.feedbacks = transformedFeedbacks;
                return transformedFeedbacks;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteFeedback() {
        return this.http.delete('http://localhost:3000/feedback')
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
}