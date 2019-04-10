const UserModel = require('../models/User');
const Hashids = require('hashids');
const hashids = new Hashids();

module.exports = {
    //Post User
    PostUser: (req, res) => {
        const userName = req.body.user_name;
        const phoneNumber = req.body.phone_number;
        const moodId = req.body.mood_id;

        const encodedPhone = hashids.encode(phoneNumber);

        var user = new UserModel({
            user_name: userName,
            phone_number: encodedPhone,  
            mood_Id: moodId,
        });
        
        UserModel.find( { $or:[ {'user_name' : userName}, {'phone_number' : encodedPhone }]}, function(err,data){
                
                if(Object.keys(data).length != 0){
                    if(data[0].phone_number == encodedPhone){
                        return res.status(400).end(hashids.decode(encodedPhone) + " number has already saved");
                    }

                    if(data[0].user_name == userName){
                        return res.status(400).end(userName + " has already saved");
                    }
                }
                else{
                    user.save((userErr, userData) => {
                        if(userErr) {
                            return res.status(400).json(userErr);
                        }

                        return res.status(200).json({ userData });
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
                    return;
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

        UserModel.find({}, (err, allUser) => {
            if (!err){
                if(allUser.length == 0){
                    res.send("No data found");
                }
              
              var dbPhone = [];
                
              // Compare phone number in db and UI Contact Number
              allUser.forEach((item, value) => {
                dbPhone = item.phone_number;
                const encodedPhone = dbPhone;
                dbPhone = hashids.decode(dbPhone);
                dbPhone = dbPhone.toString();
                const iterator = phoneNumbers;

                for (const item of iterator) {
                    var phoneValue = item;
                    phoneValue = ChangeNumberFormat(phoneValue);

                    if(dbPhone == phoneValue){
                        phoneNumbersData.push(encodedPhone);
                    }
                  }
              });

              UserModel.find({ phone_number: { $in: phoneNumbersData } }, (err, userContacts) => {
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

function ChangeNumberFormat(item){
    if(item.includes('+9')){
        item = item.split('+9')[1];
    }

    if(item.startsWith('9')){
        item = item.substring(1);
    }

    item = item.replace(/\D/g,'');

    return item;
}
