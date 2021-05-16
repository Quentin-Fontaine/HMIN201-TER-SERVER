const Opinion = require('../models/opinion');

exports.addOpinion = (req, res, next) => {
    delete req.body._id;
    const opinion = new Opinion({
        ...req.body
    });
    opinion.save()
        .then(() => res.status(201).json({ message : 'Opinion registered' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllOpinions = (req, res, next) => {
    Opinion.find()
        .then(opinions => res.status(200).json(opinions))
        .catch(error => res.status(500).json({ error }));
};

exports.getOpinionMiddleware = (req, res, next, opinionId) => {
    Opinion.findOne({ _id: opinionId })
        .then(opinion => {
            if (!opinion) {
                return res.status(404).json({ error: 'Opinion not found'});
            }
            req.opinion = opinion;
            return next();
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOpinion = (req, res) => {
    return res.status(200).json(req.opinion);
};

exports.deleteOpinion = (req, res) => {
    Opinion.deleteOne({ _id: req.hotel._id })
        .then(() => res.status(204).send())
        .catch(error => res.status(500).json({ error }));
};
