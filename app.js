const { Model } = require('sequelize');
require('dotenv').config();
const express = require('express');
app.use(express.json());

const { MySQLDatabase } = require('./connection.mjs');

const PORT = process.env.PORT || 5000;

const publicRoutes = require('./routes/public-routes');
const adminRoutes = require('./routes/admin-routes');
app.use('/public', publicRoutes);
app.use('/admin', adminRoutes);

//only runs incase of no response from controllers - 
app.use((req, res, next) => {
    const error = new error124(' we do not support this route yet. ', 404);
    return next(error);
});

//applied on error holding request by express.js 
app.use((error, req, res, next) => {
    if (res.headerSent) {
        //wont send a response on our own if one already sent.
        return next(error);
    }
    res.status(error.errorStatusCode || 500);
    //for the attatched client.
    res.json({ message: error.message || 'An unknown error occured!' });
});

// Connect to MySQL and start server
(async () => {
    try {
        await MySQLDatabase.connect();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to connect to database:', err);
        process.exit(1);
    }
})();

