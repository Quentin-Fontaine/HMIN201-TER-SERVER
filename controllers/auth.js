const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Member = require('../models/member');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const member = new Member({
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                email: req.body.email.toLowerCase().trim(),
                password: hash,
                role: req.body.role
            });
            console.log(member);
            member.save()
                .then(() => res.status(201).json({ message: 'Membre créé !'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));   // 500 for server error
};

exports.login = async (req, res, next) => {
    try {
        const member = await Member.findOne({ email: req.body.email });
        if (!member) {
            return res.status(404).json({ error: 'Membre non trouvé' });
        }
        if (!await bcrypt.compare(req.body.password, member.password)) {
            return res.status(404).json({ error: 'Mot de passe incorrect !' });
        }
        return res.status(200).json({
            memberId: member._id,
            token: jwt.sign(
                { memberId: member._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h'}
            )
        });
    } catch (error) {
        return res.status(500).send(error);
    }

    // Member.findOne({ email: req.body.email })
    //     .then(member => {
    //         if (!member) {
    //             throw { error: 'Membre non trouvé !', statusCode: 404 };
    //         }
    //         return bcrypt.compare(req.body.password, member.password);
    //     })
    //     .then(valid => {
    //         if (!valid) {
    //             throw { error: 'Mot de passe incorrect !', statusCode: 401 };
    //         }
    //         res.status(200).json({
    //             memberId: member._id,
    //             token: jwt.sign(
    //                 { memberId: member._id },
    //                 'RANDOM_TOKEN_SECRET',
    //                 { expiresIn: '24h'}
    //             )
    //         });
    //     })
    //     .catch(error => {
    //         console.error(error);
    //         res.status(error.statusCode || 500).json({ error: error.error || error });
    //     });
};
