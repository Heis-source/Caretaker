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
});

router.post('/', upload.single('photo'), async (req, res, next) => {
    try {

        req.body.photo = req.file.filename;
        req.body.thumb = req.body.photo;

        const adsGetData = req.body;
        const adsData = new adsSchema(adsGetData);

        const adsSaveData = await adsData.save();
        res.status(201).json({ result: adsSaveData });
        
        const requester = new cote.Requester({ name: 'ThumbCrafterAds' });
        requester.send({
          type: 'Resize IMG',
          file: req.body.photo,
        })
        
        } catch (err) {
      next(err);
    }
});

module.exports = router;