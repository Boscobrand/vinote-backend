const mongoose = require("../db/connection");

const wineSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.types.ObjectId,
            required: true,
            ref: 'User'
        },
        name: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
            required: true
        },
        varietal: {
            lowercase: true,
            required: true,
            enum: ['Red - Cabernet Sauvignon', 'Red - Pinot Noir', 'Red - Merlot', 'Red - Malbec', 'Red- Zinfandel', 'Red - Bordeaux', 'Red - Rioja', 'Red - Syrah', 'Red - Tempranillo', 'White - Chardonnay', 'White - Sauvignon Blanc', 'White - Pinot Gris', 'White - Pinot Grigio', 'White - Riesling', 'White - Gewurtztraimer', 'White - Chenin Blanc', 'Rosé', 'Dessert - Port', 'Dessert - Sauternes','Dessert - Icewine','Dessert - Sherry', 'Sparkling - Champagne', 'Sparkling - Traditional', 'Sparkling - Moscato', 'Sparkling - Prosecco', 'Sparkling - Cava', 'Sparkling - Cremant'],
        },
        vineyard: {
            type: String
        },
        country: {
            type: String,            
        },
        region: {
            type: String,            
        },
        image: {
            type: Buffer,
        },
       notes: {
            type: String,
        },
        likes: {
            type: Number,
            default: 0
        },
        location: {
            type: String,
            required: true            
        },
        who_with: {
            type: String,
            required: true,
        },
        occasion: {
            type: String,
            required: true,
        },
        when:{
            type: Date,
            required: true
        },
        reminder:{
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

const Wine = mongoose.model('Wine', wineSchema);

module.exports = Wine;


