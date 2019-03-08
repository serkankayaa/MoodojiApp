const userModel = require('../models/User.js');

module.exports = {
    //First app screen load
    FirstLoad: (req, res) =>{
        const userName = req.body.userName;
        const userId = req.body.userId;

        let user = new userModel({
            record_id: userId,
            name: userName,
        });

        //Save without mood
        user.save((userErr, userData) => {
            if(userErr){
                return res.status(400).json(userErr);
            }
            else
                return res.json(userData);
        });
    },

    AfterLoad: (req, res) =>{
        
    }
}