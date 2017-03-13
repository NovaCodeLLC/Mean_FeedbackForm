/**
 * Created by TXL8009 on 3/13/2017.
 */
/**
 * Created by TXL8009 on 3/13/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    nameBox: {type: String, required: true},
    productBox: {type: String, required: true},
    upsBox:{type: String, required: true},
    downsBox: {type: String, required: true}
});


schema.plugin(mongoose-unique-validator);

module.exports = mongoose.model('Feedback', schema);