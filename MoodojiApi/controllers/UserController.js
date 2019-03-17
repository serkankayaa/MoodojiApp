const UserModel = require('../models/User');

module.exports = {
    FirstLoad: (req, res, next) => {
        const record_id = req.body.record_id;
        const name = req.body.name;
        console.log(record_id);
        console.log(name);

        var user = new UserModel({
            record_id: record_id,
            name: name
        });

        user.save((userErr, userData) => {
            if(userErr) {
                return res.status(400).json(userErr);
            }
            return res.json({ userData });
        });
    },

    GetData: (req, res, next) => {
        UserModel.find({}, function(err, allUser) {
            if (!err){
                console.log(allUser);
            }
            else{
                throw err;
            }
        });
    },

    //To remove indexes
    DropIndexes: () => {
        UserModel.collection.dropAllIndexes(function (err, results) {
            console.log("Dropped Indexes");
        });
    }
}