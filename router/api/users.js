'use strict';

const express = require('express');
const router = express.Router();
const userSchema = require('../../models/users');
const stateSchema = require('../../models/state');
const adsSchema = require('../../models/ads');
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
    
    if (userCreated) {
      res.status(201).json({ 
        result: userCreated,
        msgFromServer: 'user created',
      })
    } else {
      res.status(400).json({ 
        msgFromServer: 'generic error',
      })
    }
        
    const requester = new cote.Requester({ name: 'ThumbCrafterProfile' });

    requester.send({
      type: 'Resize IMG',
      file: req.body.photo,
    });

  } catch (err) {
    next(err);
  }
})

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
})

router.post('/logon', async (req, res, next) => {
  try {

    const email = req.body.email;
    const password = req.body.password;

    let User = await userSchema.findOne({ email: email });

    if (!User || password !== User.password) {
      const error = new Error('invalid credentials');
      error.status = 401;
      next(error);
      return;
    }

    const token = jwt.sign({
      _id: User._id
    }, process.env.JWT_SECRET, {expiresIn: '2d'});

    User = await userSchema.updateOne({ email: email }, { $set: { token: token } })
    res.json({ User, token });

  } catch (err) {
    next(err);
  }
})

router.get('/state', async (req, res, next) => {
  try {

    const docs = await stateSchema.stateList();
    res.json(docs);

  } catch(err) {
    next(err);
  }
})

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
})

router.get('/reset', (req, res, next) => {
  try {

    const token = req.query.resetPasswordToken;

    const User = userSchema.findOne({ resetPasswordToken: token,
        resetPasswordExpire: { 
          $gt: Date.now(),
      },
    })
    .then(user => {
      if (user == null) {
        res.json('password reset link invalid or has expired')
      } else {
        console.log(user.email)
        res.status(200).send({
          email: user.email,
          message: 'password reset link a-ok',
        })
      }
    })

  } catch(err) {
    next(err);
  }
})

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
      res.status(404).send({ message: 'no user exists in db to update' });
    }
    
  } catch(err) {
    next(err);
  }
})

router.post('/usernameAds', async (req, res, next) => {
  try {

    const username = req.body.username;
    const User = await userSchema.findOne({ username: username });

    if (!User) {
      const error = new Error('You have to logon again');
      error.status = 401;
      next(error);
      return;
    }

    res.status(201).json({ result: User });

  } catch (err) {
    next(err);
  }
})

router.post('/deleteuser', async (req, res, next) => {
  try {

    const username = req.body.username;
    
    const User = await userSchema.deleteOne({ username: username });
    const Ads = await adsSchema.deleteMany({ username: username });

    if (User || Ads) {
      res.status(201).send({ msgFromServer: 'all data deleted' });
    } else {
      res.status(403).send({ msgFromServer: 'delete error' });
    }    

  } catch (err) {
    next(err);
  }
})

module.exports = router;