'use strict';

const mongoose = require('mongoose');

const stateSchema = mongoose.Schema({
  provincia: String ,
});

stateSchema.statics.stateList = function () {
    const query = State.distinct('provincia');
   
    return query.exec();
}

const State = mongoose.model('provincia', stateSchema);

module.exports = State;