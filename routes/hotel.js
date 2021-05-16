const express = require('express');
const router = express.Router();

const hotelCtrl = require('../controllers/hotel');

router.route('/')
    .get(hotelCtrl.getAllHotels)
    .post(hotelCtrl.addHotel);

router.param('hotelId', hotelCtrl.getHotelMiddleware);
router.route('/:hotelId')
    .get(hotelCtrl.getHotel)
    .put(hotelCtrl.updateHotel)
    .delete(hotelCtrl.deleteHotel);

router.route('/:hotelId/opinions')
    .get(hotelCtrl.getOpinionsHotel);

module.exports = router;
