'use strict';

const express = require('express');
const router = express.Router();
const commentSchema = require('../../models/comment');
const commentForUserSchema = require('../../models/commentforUsers');

router.post('/add', async (req, res, next) => {
    try {
        let noModDate = new Date();
        let date = ("0" + noModDate.getDate()).slice(-2);
        let month = ("0" + (noModDate.getMonth() + 1)).slice(-2);
        let year = noModDate.getFullYear();
        let hours = noModDate.getHours();
        let minutes = noModDate.getMinutes();
        let lastDate = date + "-" + month + "-" + year + " " + hours + ":" + minutes
        
        req.body.createdAt = lastDate;

        const commentGetData = req.body;
        const commentData = new commentSchema(commentGetData);

        const commentSaveData = await commentData.save();
        res.status(201).json({ result: commentSaveData });
        
    } catch (err) {
      next(err);
    }
});

router.get('/search', async (req, res, next) => {
  try {
          
    const ad_Id = req.query.ad_Id
    const limit = parseInt(req.query.limit);
    const sort = req.query.sort || '_id';

    const filter = {};

    filter.ad_Id = ad_Id;

    const Comment = await commentSchema.list(filter, limit, sort);

    res.status(201).json({ result: Comment });
      
  } catch (err) {
    next(err);
  }
});

module.exports = router;