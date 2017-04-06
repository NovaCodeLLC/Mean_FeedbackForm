import {Feedback} from "../feedbackSubmission/feedback.model";
export class User {
    constructor(public email: string,
                public password: string,
                public firstName: string,
                public lastName: string,
                public role: string,
                public feedback?: Feedback[],
                public _id? : string) {}
}