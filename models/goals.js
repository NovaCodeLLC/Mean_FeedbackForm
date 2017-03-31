/**
 * Created by Thomas Lesperance on 3/28/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    director: {type: Schema.Types.ObjectId, ref: 'User'},
    year: {type: String, required: true},
    goals:[{type: String, required: true}],
});


schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Goals', schema);