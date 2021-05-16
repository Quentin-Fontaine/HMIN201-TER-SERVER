const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const memberSchema = new mongoose.Schema({
    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
    	type: String,
    	enum: ['Client', 'Owner', 'Administrator'],
    	required: true
    }
    // hotels: { type: [{ type: mongoose.Types.ObjectId, ref: 'Hotel' }], required: false }
});

memberSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Member', memberSchema);
