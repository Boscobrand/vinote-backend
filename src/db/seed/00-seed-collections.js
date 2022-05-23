const User = require('../../models/User');
const Wine = require('../../models/Wine');

const userRawData = require('../data/userRaw.json');
const wineRawData = require('../data/wineRaw.json');

const userInfo = userRawData.map(userRawItem => {
    const vinoteUser = {}
    vinoteUser.name = userRawItem.name
    vinoteUser.email = userRawItem.email
    vinoteUser.username = userRawItem.username
    vinoteUser.avatar = userRawItem.avatar
    //vinoteUser.password = userRawItem.password
    return vinoteUser
})

User.deleteMany({})
    .then(() => {
        User.create(userInfo)
        .then(users => {
            console.log (users)
        })
        .catch(err =>{
            console.log (err)
        })
    })

const wineInfo = wineRawData.map(wineRawItem => {
    const newWine ={}
    newWine.varietal = wineRawItem.varietal
    newWine.name = wineRawItem.name
    newWine.vineyard = wineRawItem.vineyard
    newWine.region = wineRawItem.region
    newWine.country= wineRawItem.country
    newWine.image = wineRawItem.image
    newWine.notes = wineRawItem.notes
    newWine.location = wineRawItem.location
    newWine.who_with = wineRawData.who_with
    newWine.occasion = wineRawData.occasion
    newWine.reminder = wineRawData.reminder
    newWine.likes = wineRawItem.likes
    return newWine
})

Wine.deleteMany({})
    .then(() => {
        Wine.create(wineInfo)
        .then(wines => {
            console.log (wines)
        })
        .catch(err =>{
            console.log (err)
        })
    })
