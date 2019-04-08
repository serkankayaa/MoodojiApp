const UserModel = require('../models/User');

module.exports = {
    //Post User
    PostUser: (req, res) => {
        const userName = req.body.user_name;
        const phoneNumber = req.body.phone_number;
        const moodId = req.body.mood_id;
        
        UserModel.findOne({ user_name: userName}, (err, data) => {
            var user = new UserModel({
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
        UserModel.find({},(err, allUser) => {
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
        phoneNumbers = phoneNumbers.map(String);

        UserModel.find({}, (err, allUser) => {
            if (!err){
                if(allUser.length == 0){
                    res.send("No data found");
                }
              
              var dbPhone = [];
                
              // Compare phone number in db and UI Contact Number
              allUser.forEach((item, value) => {
                dbPhone = item.phone_number;
                dbPhone = dbPhone.toString();
                const iterator = phoneNumbers;
                for (const item of iterator) {
                    var phoneValue = item.toString();
                    if(phoneValue.includes('+9')){
                        phoneValue = phoneValue.split('+9')[1];
                    }
                    if(phoneValue.startsWith('9')){
                        phoneValue = phoneValue.substring(1);
                    }
                    console.log(phoneValue);
                    phoneValue = phoneValue.replace(/\D/g,'');
                    if(dbPhone == phoneValue){
                        phoneNumbersData.push(dbPhone);
                    }
                  }
              });

              const checkData = phoneNumbersData.map(Number);

              UserModel.find({ phone_number: { $in: checkData } }, (err, userContacts) => {
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
        UserModel.deleteMany(err => {
            console.log("Deleted all data successfully");
        });
    },

    //To remove indexes
    DropIndexes: () => {
        UserModel.collection.dropAllIndexes((err, results) => {
            console.log("Dropped Indexes");
        });
    }
}