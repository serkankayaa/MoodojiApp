const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    contact_name: {
        type: Schema.Types.String,
    },
    user_name: {
        type: Schema.Types.String,
        unique: true,
        required: [true, 'User name is required']
    },
    phone_number: {
        type: Schema.Types.String,
        unique: true,
        required: [true, 'Phone number is required']
    },
    mood_id: {
        type: Schema.Types.ObjectId,
        default: null
    },
    created_date: {
        type: Schema.Types.Date,
        default: Date.now
    }
});

schema.pre('save', function(){
    console.log("User Model saved succesfully");
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model('User', schema);