const express = require('express');
const router = express.Router();

const opinionCtrl = require('../controllers/opinion');

router.route('/')
    .post(opinionCtrl.addOpinion);

router.route('/')
    .get(opinionCtrl.getAllOpinions);

router.param('opinionId', opinionCtrl.getOpinionMiddleware);
router.route('/:opinionId')
    .get(opinionCtrl.getOpinion)
    .delete(opinionCtrl.deleteOpinion);

module.exports = router;
