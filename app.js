const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const memberRoutes = require('./routes/member');
const hotelRoutes = require('./routes/hotel');
const opinionRoutes = require('./routes/opinion');

mongoose.connect('mongodb://localhost:27017/avishotel',
    { useNewUrlParser: true,
             useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !\nDataBase : Avis Hotel'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/opinions', opinionRoutes);

module.exports = app;
