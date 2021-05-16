const mongoose = require('mongoose');

const opinionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    writer: { type: mongoose.Types.ObjectId, required: true},
    hotel: { type: mongoose.Types.ObjectId, required: true }
});

module.exports = mongoose.model('Opinion', opinionSchema);
