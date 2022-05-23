const User= require('../../models/User');
const Wine = require('../../models/Wine');
const userRawData = require('../data/userRaw.json');

User.find({})
    .then(users => {
        console.log(users) 
        users.forEach(user => {
            let userJSON = userRawData.find(userJSON => userJSON.name === user.name)
            Wine.findOne({ title: userJSON.wine })
                .then(wine => {
                    user.wine = wine._id
                    user.save()
                })
        })
    })

