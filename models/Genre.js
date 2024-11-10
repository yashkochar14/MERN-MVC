const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    type : { type: String, required: true },
});

module.exports = mongoose.model('Genre', genreSchema);