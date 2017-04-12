/**
 * Created by TXL8009 on 3/13/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    directorID: {type: Schema.Types.ObjectId, ref: 'User'},
    managerID: [{type: Schema.Types.ObjectId, ref: 'User'}],
    contributorID: [{type: Schema.Types.ObjectId, ref: 'User'}]
});


schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Group', schema);
