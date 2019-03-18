const UserModel = require('../models/User');

module.exports = {
    //Post User
    PostUser: (req, res) => {
        const contactName = req.body.contact_name;
        const userName = req.body.user_name;
        const phoneNumber = req.body.phone_number;
        const moodId = req.body.mood_id;
        
        UserModel.findOne({ user_name: userName}, function(err, data) {
            var user = new UserModel({
                contact_name: contactName,
                user_name: userName,
                phone_number: phoneNumber,
                mood_Id: moodId,
            });

            if(err){
                return res.status(400).json(err);
            }
            
            if(data != null){
                res.send(userName + " has already saved");
                return;
            }
            else{
                user.save((userErr, userData) => {
                    if(userErr) {
                        return res.status(400).json(userErr);
                    }
                    return res.json({ userData });
                });    
            }
        });
    },

    //Get All User
    GetAllUser: (req, res) => {
        UserModel.find({}, function(err, allUser) {
            if (!err){
                if(allUser.length == 0){
                    res.send("No data found");
                }
              
            res.send(allUser);
            }
            else{
                throw err;
            }
        });
    },

    //Get Users Group
    GetUserData: (req, res, phoneNumbers) => {
        const phoneNumbersData = [];

        UserModel.find({}, function(err, allUser) {
            if (!err){
                if(allUser.length == 0){
                    res.send("No data found");
                }
              
              // Compare phone number in db and UI Contact Number
              allUser.forEach(function(item, value){
                const iterator = phoneNumbers.values();
                for (const phoneValue of iterator) {
                    if(item.phone_number == phoneValue){
                        phoneNumbersData.push(item.phone_number);
                    }
                  }
              });

              UserModel.find({ phone_number: { $in: phoneNumbersData } }, function(err, userContacts){
                if(err != null){
                    console.log(err);
                    return res.status(400).json(err);                
                }

                res.send(userContacts);     
            });
            }
            else{
                throw err;
            }
        });
    },

    //Delete all data
    DeleteAllData: () => {
        UserModel.deleteMany( function(err) {
            console.log("Deleted all data successfully");
        });
    },

    //To remove indexes
    DropIndexes: () => {
        UserModel.collection.dropAllIndexes(function (err, results) {
            console.log("Dropped Indexes");
        });
    }
}