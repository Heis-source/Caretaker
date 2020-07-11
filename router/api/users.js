'use strict';

const express = require('express');
const router = express.Router();
const userSchema = require('../../models/users');
const stateSchema = require('../../models/state');
const jwt = require('jsonwebtoken');
const cote = require('cote');
const multer = require('multer');
const upload = multer({ dest: './public/img/ads' });
const crypto = require('crypto');
const nodemailer = require('nodemailer');

require('dotenv').config();


router.post('/', upload.single('photo'), async (req, res, next) => {
  try {

    const userGetData = req.body;
    const userSaveData = new userSchema(userGetData);

    const userCreated = await userSaveData.save();
    res.status(201).json({ result: userCreated });
    
    const requester = new cote.Requester({ name: 'ThumbCrafterProfile' });

    requester.send({
      type: 'Resize IMG',
      file: req.body.photo,
    });

  } catch (err) {
    next(err);
  }
});

router.post('/session', async (req, res, next) => {
  try {

    const token = req.body.token;
    const User = await userSchema.findOne({ token: token });

    if (!User || token !== User.token) {
      const error = new Error('You have to logon again');
      error.status = 401;
      next(error);
      return;
    }

    res.status(201).json({ result: User });

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

    res.json({ token: token });
    const userUpdate = await userSchema.updateOne({ email: email }, { $set: { token: token } })

  } catch (err) {
    next(err);
  }
});

router.get('/state', async (req, res, next) => {
  try {

    const docs = await stateSchema.stateList();
    res.json(docs);

  } catch(err) {
    next(err);
  }
});

router.post('/passwordForgot', async (req, res, next) => {
  try {
    
    const email = req.body.email;
    const User = await userSchema.findOne({ email: email });

    if (!User) {
      res.status(403).send("Email is not in database")

    } else {

      const token = crypto.randomBytes(20).toString('hex');
      await userSchema.updateOne({ email: email }, { $set: { resetPasswordToken: token, resetPasswordExpire: Date.now() + 3600000 } })
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { 
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD ,
        },
      })
  
      const mailOptions = {
        from: 'hodeidev@gmail.com',
        to: `${email}`,
        subject: 'Reset your Caretaker account',
        text:
        'You are receiving this becaouse you (or some else) have requested the reset of the password for your account\n\n'
        + 'Please click on the following link or paste this in your browser to complete the process within one of for receveing it: \n\n'
        + `http://localhost:3000/reset/${token}\n\n`
        + 'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      }
  
      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error('there was an error: ', err);
        } else {
          console.log('here is the res: ', response);
          res.status(200).json('Recovery email sent')
        }
      })

    }
  } catch(err) {
    next(err);
  }
});

router.get('/reset', async (req, res, next) => {
  try {

    const token = req.body.resetPasswordToken;

    const User = await userSchema.findOne({ 
      where: { 
        resetPasswordToken: token,
        resetPasswordExpire: { 
          $gt: Date.now(),
        },
      },
    })

  } catch(err) {
    next(err);
  }
});

router.post('/updatePassword', async (req, res, next) => {
  try {

    const email = req.body.email;
    const password = req.body.password;

    const User = await userSchema.findOne({ email: email })

    if (User) {
      userSchema.updateOne({ email: email }, { $set: { password: password, resetPasswordToken: null, resetPasswordExpire: null }
    })
    .then(() => {
      res.status(200).send({ message: 'password updated' });
    })
    } else {
      res.status(404).json('no user exists in db to update');
    }
    
  } catch(err) {
    next(err);
  }
});


module.exports = router;