'use strict';

const mongoose = require('mongoose');

const adsSchema = mongoose.Schema({
    name: String,
    idUser: String,
    where: String,
    description: String,
    sell: Boolean,
    price: Number,
    photo: String,
    thumb: String,
    provincia: String,
    createdAt: String
});

adsSchema.statics.list = function (filter, limit, start, sort) {
    const query = Ads.find(filter);
    query.limit(limit);
    query.skip(start);
    query.sort(sort)

    return query.exec();
}

const Ads = mongoose.model('Ads', adsSchema);

module.exports = Ads;