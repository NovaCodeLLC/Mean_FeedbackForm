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
    private feedbacks: Feedback[];
    messageIsEdit = new EventEmitter<Feedback>();

    constructor(private http: Http) {}

    addFeedback(feedback: Feedback) {
        const body = JSON.stringify(feedback);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/feedback', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }



    // editMessage(message: Message) {
    //     this.messageIsEdit.emit(message);
    // }

    // updateMessage(message: Message) {
    //     const body = JSON.stringify(message);
    //     const headers = new Headers({'Content-Type': 'application/json'});
    //     return this.http.patch('http://localhost:3000/message/' + message.messageId, body, {headers: headers})
    //         .map((response: Response) => response.json())
    //         .catch((error: Response) => Observable.throw(error.json()));
    // }

    deleteFeedback() {
        return this.http.delete('http://localhost:3000/feedback')
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }getFeedback() {
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
}