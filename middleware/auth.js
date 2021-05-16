const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const memberId = decodedToken.memberId;
        if (req.body.memberId && req.body.memberId !== memberId) {
            return res.status(401).json({ error: 'Tu es une autre personne !'});
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Unauthenticated request !')
        });
    }
};
