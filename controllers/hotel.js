const Hotel = require('../models/hotel');
const Opinion = require('../models/opinion');

exports.getAllHotels = (req, res, next) => {
    Hotel.find()
        .then(hotels => res.status(200).json(hotels))
        .catch(error => res.status(500).json({ error }));
};

exports.addHotel = (req, res, next) => {
    delete req.body._id;
    const hotel = new Hotel({
        ...req.body
    });
    hotel.save()
        .then(() => res.status(201).json({ message : 'Hotel registered' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getHotelMiddleware = (req, res, next, hotelId) => {
    Hotel.findOne({ _id: hotelId })
        .then(hotel => {
            if (!hotel) {
                return res.status(404).json({ error: 'Hotel not found'});
            }
            req.hotel = hotel;
            return next();
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getHotel = (req, res) => {
    return res.status(200).json(req.hotel);
};

exports.updateHotel = (req, res) => {
    Hotel.updateOne({ _id: req.hotel._id }, { ...req.body, _id: req.hotel._id })
        .then(() => res.status(200).json({ message: "Hotel modified !" }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteHotel = (req, res) => {
    Hotel.deleteOne({ _id: req.hotel._id })
        .then(() => res.status(204).send())
        .catch(error => res.status(500).json({ error }));
};

exports.getOpinionsHotel = (req, res) => {
    Opinion.find({ hotel: req.hotel._id })
        .then(advices =>  res.status(200).json(advices))
        .catch(error => res.status(500).json({ error }));
};
