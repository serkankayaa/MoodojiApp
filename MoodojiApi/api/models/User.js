const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
    record_id: {
        type: Schema.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: [true, "User name is required"],
        unique: [true, "This user name is already saved"]
    },
    mood_id : {
        type: Schema.ObjectId,
    },
});

UserSchema.plugin(uniqueValidator);

module.exports = User = mongoose.model('User', UserSchema);
