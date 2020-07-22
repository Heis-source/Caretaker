'use strict';

const express = require('express');
const router = express.Router();
const adsSchema = require('../../models/ads');
const userSchema = require('../../models/users');
const nodemailer = require('nodemailer');

router.post('/', async (req, res, next) => {
    try {
      
      const Busername = req.body.Busername;
      const _id = req.body._id;
      const User = await userSchema.findOne({ username: Busername });
      const Ad = await adsSchema.findOne({ _id: _id });

      if (!User) {
        res.status(403).send("Email is not in database")
  
      } else {
        
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { 
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
          },
        })
    
        const mailOptions = {
          from: 'hodeidev@gmail.com',
          to: `${User.email}`,
          subject: 'Caretaker wants your attention!',
          html:
          'You are receiving this becouse some else want your attention, this is the message:<br/>'
          + '-------------------------------------------------------------------<br/>'
          + `<a href="http://localhost:3000/details/${_id}">This is the ad</a><br/>`
          + '-------------------------------------------------------------------<br/>'
          + `<a href="http://localhost:9000/api/booking?bUsername=${Busername}&sUsername=${Ad.username}&id=${_id}&status=ok">Accept</a> <a href="http://localhost:9000/api/booking?bUsername=${Busername}&sUsername=${Ad.username}&id=${_id}&status=ko">Decline</a>`,
        }
    
        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.error('there was an error: ', err);
          } else {
            console.log('here is the res: ', response);
            res.status(200).json('Booking email sent')
          }
        })
  
      }
    } catch(err) {
      next(err);
    }
})

router.get('/', async (req, res, next) => {
    try {
      
      const Busername = req.query.bUsername;
      const Susername = req.query.sUsername;
      const Status = req.query.status;
      const _id = req.query.id;

      const User = await userSchema.findOne({ username: Susername });
      const Ad = await adsSchema.findOne({ _id: _id });

      if (!User || !Ad) {
        res.status(403).send("Email or Ad is not in database")
  
      } else {
        
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { 
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD ,
          },
        })
        
        if (Status === 'ok') {
            const mailOptions = {
                from: 'hodeidev@gmail.com',
                to: `${Busername}`,
                subject: 'Caretaker wants your attention!',
                html:
                `Greaaaaaaat! ${Susername} accept your petition!`
                + '-------------------------------------------------------------------<br/>'
                + `<a href="http://localhost:3000/details/${_id}">This is the ad</a><br/>`
                + '-------------------------------------------------------------------<br/>'
                + `<a href="http://localhost:9000/booking?bUsername=${Busername}&sUsername=${Ad.username}&id=${_id}&status=ok">Accept</a> <a href="http://localhost:9000/booking?bUsername=${Busername}&sUsername=${Ad.username}&id=${_id}&status=ko">Decline</a>`,
            }
            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                  console.error('there was an error: ', err);
                } else {
                  console.log('here is the res: ', response);
                  res.status(200).json('Booking email sent')
                }
              })
        } else if (Status === 'ko') {
            const mailOptions = {
                from: 'hodeidev@gmail.com',
                to: `${Busername}`,
                subject: 'Caretaker wants your attention!',
                html:
                `${Susername} decline you petition`,
            }
            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                  console.error('there was an error: ', err);
                } else {
                  console.log('here is the res: ', response);
                  res.status(200).json('Booking email sent')
                }
            })
        }
      }
    } catch(err) {
      next(err);
    }
})


module.exports = router;