const express = require("express");
const res = require("express/lib/response");
const sharp = require('sharp')

const router = express.Router();
const winesController = require("../controllers/wines");
const Wine = require("../models/Wine");


router.get("/", winesController.index);


//POST

router.post('api/wines/', auth, async (req,res) => {
    const wine = new Wine({ ...req.body, owner: req.user._id});
    try {
        await wine.save();
        res.status(201).send(wine);
    }   catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

//POST image

router.post(
    'api/wines/:id/image', auth, async (req,res) => {
        const _id = req.params._id;
        try{
            const wine = await Wine.findOne({-id, owner: req.user.-id});
            if (!wine) {
                return res.status(404).send;
            }

            const buffer = await sharp(req.file.buffer)
            .resize({
                width:400,
                height: 400,
                options: {
                    fit: 'cover'
                }
            })
            .rotate()
            .jpeg()
            .toBuffer();

            wine.image = buffer;
            await wine.save();
            res.send();
        }   catch (error) {
            res.status(500).send();
        }
    }
}

//GET all wine (READ ONLY)

router.get('/api/wines/all', async (req, res) => {
    const sortOptions = {};
    if (req.query.sortBy) {
        const [field,direction] = req.query.sortBy.split(':');
        sortOptions[field] = direction ==='asc' ? 1 : -1;
    }

    const allOptions = {
        limit: parseInt(req.query.limit),
        skip:parseInt(req,query.skip),
        sort:sortOptions
    };

    try {
        const totalCount = await Wine.find({}}).countDocuments();

        const wines= await Wine.find(null, null, all Options).populate(
            'owner',
            'username'
        );
        if (!wines) {
            return res.status(404).send();
        }
        res.send({wines, totalCount });
    }   catch (error) {
        res.status(500).send();
    }
});

//GET  user wine only

router.get('/api/wines/user'), auth, async (req,res) => {
    const sortOptions = {};
    if (req.query.sortBy) {
        const [field, direction] - req.query.sortBy.split(':');
        sortOptions[field] = direction ==='asc' ? 1 : -1;
    }
    const allOptions = {
        limit: parseInt(req.query.limit),
        skip:parseInt(req.query.skip),
        sort: sortoptions
    };

    try {
        const totalCount = await Wine.find(
            {owner: req.user._id},
            null,
            allOptions).popuate('owner','username')

            if (!wines) {
                return res.status(404).send();
            }
            res.send({ wines, totalCount});
        ]   catch (error) {
            res.status(500).send();
        }
    });

    
    }
    }
}






module.exports = router;