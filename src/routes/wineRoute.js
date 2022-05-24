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
            const wine = await Wine.findOne({_id, owner: req.user._id});
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
);

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
        const totalCount = await Wine.find({}).countDocuments();

        const wines= await Wine.find(null, null, allOptions).populate(
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

//GET  active user wine only

router.get('/api/wines/user'), auth, async (req,res) => {
    const sortOptions = {};
    if (req.query.sortBy) {
        const [field, direction] = req.query.sortBy.split(':');
        sortOptions[field] = direction ==='asc' ? 1 : -1;
    }
    const allOptions = {
        limit: parseInt(req.query.limit),
        skip:parseInt(req.query.skip),
        sort: sortOptions
    };

    try {
        const totalCount = await Wine.find(
            {owner: req.user._id},
            null,
            allOptions).popuate('owner','username')

            if (!wines) {
                return res.status(404).send();
            }
            res.send({wines,totalCount});
        }   catch (error) {
            res.status(500).send();
        }
    };

//GET all wines liked by an active user

router.get('/api/wines/'), auth, async (req,res) => {
    const sortOptions = {};
    if (req.query.sortby) {
        const [field, direction] = req.query.sortBy.split(':');
        sortOptions[field] = direction === 'asc' ? 1 : -1;
    }
    
    const allOptions = {
        limit: parseInt(req.query.limit),
        skip:parseInt(req.query.skip),
        sort: sortOptions
    };

    try {
        const totalCoint = req.user.likedWines.length;

        const wines = await Wine.find(
            { _id: req.user.likedWines },
            null,
            null
            ).populate('woner', 'username');

            if (!wines) {
                return res.status(404).send();
            }

            res.send({wines, totalCount});
         }  catch (error) {
             res.status(500).send();
         }
    }
    
    // GET /api/wines/:id
//
// Read details for one wine
router.get('/api/wines/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
      // Ensure this wine's owner is the authenticated user
      const wine = await Wine.findOne({ _id, owner: req.user._id });
  
      if (!wine) {
        return res.status(404).send();
      }
  
      res.send(wine);
    } catch (error) {
      res.status(500).send();
    }
  });
  
  // GET wine image

  router.get('/api/wines/:id/image', async (req, res) => {
    try {
      const wine = await Wine.findById(req.params.id);
      if (!wine || !wine.image) {
        throw new Error();
      }
      res.set('Content-Type', 'image/jpeg');
      res.send(wine.image);
    } catch (error) {
      res.status(404).send();
    }
  });
  
  // UPDATE:

  router.patch('/api/wines/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
      const wine = await Wine.findOne({ _id, owner: req.user._id });
      const propertiesToUpdate = Object.keys(req.body);
      propertiesToUpdate.forEach(property => {
        wine[property] = req.body[property];
      });
      await wine.save();
      res.send(wine);
    } catch (error) {
      res.status(400).send(e);
    }
  });
  
  // DELETE wine 

  router.delete('/api/wines/:id', auth, async (req, res) => {
    try {
      // Locate wine by its id and owner id
      const wine = await Wine.findOneAndDelete({
        _id: req.params.id,
        owner: req.user._id
      });
  
      if (!wine) {
        return res.status(404).send();
      }
      res.send(wine);
    } catch (error) {
      res.status(500).send(e);
    }
  }

  )



module.exports = router;