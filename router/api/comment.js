'use strict';

const express = require('express');
const router = express.Router();
const commentSchema = require('../../models/comment');

router.post('/', async (req, res, next) => {
    try {
        let noModDate = new Date();
        let date = ("0" + noModDate.getDate()).slice(-2);
        let month = ("0" + (noModDate.getMonth() + 1)).slice(-2);
        let year = noModDate.getFullYear();
        let hours = noModDate.getHours();
        let minutes = noModDate.getMinutes();
        let lastDate = date + "-" + month + "-" + year + " " + hours + ":" + minutes
        
        const commentGetData = req.body;
        const commentData = new commentSchema(commentGetData);

        const commentSaveData = await commentData.save();
        res.status(201).json({ result: commentSaveData });
        
    } catch (err) {
      next(err);
    }
});

module.exports = router;