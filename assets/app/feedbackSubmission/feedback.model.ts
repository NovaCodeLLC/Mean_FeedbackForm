/**
 * Created by TXL8009 on 3/13/2017.
 */
export class Feedback {

    constructor(public nameBox: String,
                public productBox: String,
                public upsBox: String[],
                public downsBox: String[],
                public feedbackID?:String,
                public userID? : String,
                public groupID? : String,
                public goalID? : String) {}
}