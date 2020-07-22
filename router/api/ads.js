'use strict';

const express = require('express');
const router = express.Router();
const adsSchema = require('../../models/ads');
const cote = require('cote');
const multer = require('multer');
const upload = multer({ dest: './public/img/ads/' });

router.get('/', async (req, res, next) => {
    try {
        const name = req.query.name;
        const price = req.query.price;
        const sell = req.query.sell;
        const where = req.query.where;
        const limit = parseInt(req.query.limit || 10);
        const start = parseInt(req.query.start || 0);
        const sort = req.query.sort || '_id';

        const filter = {};

        if (typeof name !== 'undefined') {
            filter.name = name;
        }

        if (typeof sell !== 'undefined') {
            filter.sell = sell;
        }

        if (typeof where != 'undefined') {
            filter.where = where;
        }

        if (typeof price !== 'undefined') {
            const spacePrice = price.split('-');

            if (spacePrice[1] === '') {
                filter.price = {$gte: spacePrice[0]};
            }
            else if (spacePrice[0] === '') {
                filter.price = {$lte: spacePrice[1]};
            }
            else if (spacePrice.length === 1) {
                filter.price = spacePrice[0];
            }
            else {
                filter.price = {$gte: spacePrice[0], $lte: spacePrice[1]};
            }
        }

        const docs = await adsSchema.list(filter, limit, start, sort);
        res.json(docs);

    } catch(err) {
      next(err);
    }
})

router.post('/', upload.single('photo'), async (req, res, next) => {
    try {

        req.body.photo = req.file.filename;
        req.body.thumb = req.body.photo;

        const adsGetData = req.body;
        const adsData = new adsSchema(adsGetData);

        const adsSaveData = await adsData.save();

        if (adsSaveData) {
            res.status(201).send({ msgFromServer: 'ad created' });
        } else {
            res.status(403).send({ msgFromServer: 'ad error' });
        }
        
        const requester = new cote.Requester({ name: 'ThumbCrafterAds' });
        requester.send({
          type: 'Resize IMG',
          file: req.body.photo,
        })
        
        } catch (err) {
            next(err);
    }
})

router.post('/updateAd', upload.single('photo'), async (req, res, next) => {
    try {

        if (req.file) {
            req.body.photo = req.file.filename;
        }


        req.body.thumb = req.body.photo;

        const adsGetData = req.body;
        const Ads = await adsSchema.findOne({ _id: adsGetData._id })

        if (Ads) {
            adsSchema.updateOne({ _id: adsGetData._id }, { $set: { name: adsGetData.name, where: adsGetData.where, description: adsGetData.description, sell: adsGetData.sell, price: adsGetData.price, photo: adsGetData.photo, provincia: adsGetData.province, updateAd: adsGetData.updateAd }
            })
            .then(() => {
              res.status(200).send({ message: 'ad updated' });
            })
        }
        
        const requester = new cote.Requester({ name: 'ThumbCrafterAds' });
        
        requester.send({
          type: 'Resize IMG',
          file: req.body.photo,
        })
        
        } catch (err) {
            next(err);
    }
})

router.post('/getads', async (req, res, next) => {
    try {
  
        const username = req.body.username;
        const User = await adsSchema.find({ username: username });
  
        if (User) {
            res.status(201).json({ result: User })
        }
  
    } catch (err) {
        next(err);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;

        const ad = await adsSchema.findOne({ _id });
        if (!ad) {
            const err = new Error('not found');
            err.status = 404;
            return next(err);
        }
        res.json({ result: ad });

    } catch (err) {
        next(err);
    }
})

router.get('/edit/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;

        const ad = await adsSchema.findOne({ _id });
        if (!ad) {
            const err = new Error('not found');
            err.status = 404;
            return next(err);
        }
        res.json({ result: ad });

    } catch (err) {
        next(err);
    }
})

module.exports = router;