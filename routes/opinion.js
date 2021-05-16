const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const opinionCtrl = require('../controllers/opinion');


router.route('/')
    .get(opinionCtrl.getAllOpinions)
    .post(opinionCtrl.addOpinion);

router.param('opinionId', opinionCtrl.getOpinionMiddleware);
router.route('/:opinionId')
    .get(opinionCtrl.getOpinion)
    .delete(opinionCtrl.deleteOpinion);

module.exports = router;
