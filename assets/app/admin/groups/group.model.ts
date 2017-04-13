/**
 * Created by Thomas Lesperance on 4/11/2017.
 */

export class Group{
    constructor(
      public directorID: String,
      public managerIDs: String[],
      public contributorIDs: String[],
      public _id? : String
    ){};
}