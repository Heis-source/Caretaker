'use strict';

const express = require('express');
const router = express.Router();
const userSchema = require('../../models/users');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res, next) => {
  try {

    const userGetData = req.body;
    const userSaveData = new userSchema(userGetData);

    const userCreated = await userSaveData.save();
    res.status(201).json({ result: userCreated });
    
    /*const requester = new cote.Requester({ name: 'ThumbCrafter' });

    requester.send({
      type: 'Resize IMG',
      file: req.body.photo,
    });*/

  } catch (err) {
    next(err);
  }
});


router.post('/logon', async (req, res, next) => {
  try {

    const email = req.body.email;
    const password = req.body.password;

    const User = await userSchema.findOne({ email: email });

    if (!User || password !== User.password) {
      const error = new Error('invalid credentials');
      error.status = 401;
      next(error);
      return;
    }

    const token = jwt.sign({
      _id: User._id
    }, process.env.JWT_SECRET, {expiresIn: '2d'});

    res.json({token: token });

  } catch (err) {
    next(err);
  }
});

module.exports = router;