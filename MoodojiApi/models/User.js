const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const numberVal = Schema.Types.Number;
const stringVal = Schema.Types.String;

var schema = new Schema({
    record_id: {
        type: numberVal
    },
    name: {
        type: stringVal,
        unique: true,
    }
});

schema.pre('save', function(){
    console.log("Model saved succesfully");
});

module.exports = mongoose.model('User', schema);