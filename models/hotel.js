const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    zip: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    owner: { type: mongoose.Types.ObjectId, required: true}
});

module.exports = mongoose.model('Hotel', hotelSchema);
