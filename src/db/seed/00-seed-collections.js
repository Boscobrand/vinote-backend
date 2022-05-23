const User = require('../../models/User');
const Wine = require('../../models/Wine');

const userRawData = require('../data/userRaw.json');
const wineRawData = require('../data/wineRaw.json');

const userInfo = userRawData.map(userRawItem => {
    const vinoteUser = {}
    vinoteUser.name = userRawItem.name
    vinoteUser.email = userRawItem.email
    vinoteUser.username = userRawItem.username
    //vinoteUser.password = userRawItem.password

})