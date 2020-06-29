'use strict';

const mongoose = require('mongoose');

const adsSchema = mongoose.Schema({
    name: String,
    idUser: String,
    sell: Boolean,
    price: Number,
    photo: String,
    thumb: String,
    tags: [String]
});

adsSchema.statics.list = function (filter, limit, start, sort) {
    const query = Anuncio.find(filter);
    query.limit(limit);
    query.skip(start);
    query.sort(sort)

    return query.exec();
}

adsSchema.statics.tagList = function () {
    const query = Anuncio.distinct('tags');
   
    return query.exec();
}

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;