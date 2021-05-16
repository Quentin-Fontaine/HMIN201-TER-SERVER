const express = require('express');
const router = express.Router();

const memberCtrl = require('../controllers/member');

router.route('/')
    .get(memberCtrl.getAllMembers);

router.param('memberId', memberCtrl.getMemberMiddleware);
router.route('/:memberId')
    .get(memberCtrl.getMember)
    .delete(memberCtrl.deleteMember);

module.exports = router;
