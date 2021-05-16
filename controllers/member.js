const Member = require('../models/member');

exports.getAllMembers = (req, res, next) => {
    Member.find()
        .then(members => res.status(200).json(members))
        .catch(error => res.status(500).json({ error }));
};

exports.getMemberMiddleware = (req, res, next, memberId) => {
    Member.findOne( { _id: memberId })
        .then(member => {
            if (!member) {
                return res.status(404).json({ error: 'Member not found' });
            }
            req.member = member;
            return next();
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getMember = (req, res) => {
    return res.status(200).json(req.member);
};

exports.deleteMember = (req, res) => {
    Member.deleteOne({ _id: req.member._id })
        .then(() => res.status(204).send())
        .catch(error => res.status(500).json({ error }));
};
