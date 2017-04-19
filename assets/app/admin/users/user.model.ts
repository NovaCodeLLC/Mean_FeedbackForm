import {Feedback} from "../../feedbackSubmission/feedback.model";
export class User {
    constructor(public email: String,
                public password: String,
                public firstName?: String,
                public lastName?: String,
                public role?: String,
                public feedback?: Feedback[],
                public _id? : String,
                public groupID? : String) {}
}