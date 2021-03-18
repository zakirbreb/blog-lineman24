const express = require('express');
const morgan = require('morgan');
const session= require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const config = require('config')

const { bindeUserWithRequest } = require('./authMiddleware');
const setLocals = require('./setLocals')

// const mongoDB_URI = `mongodb+srv://${config.get('db-username')}:${config.get('db-password')}@cluster0.nine7.mongodb.net/exp-blog?retryWrites=true&w=majority`
const mongoDB_URI = 'mongodb://localhost:27017/exp-blog'

const store = new MongoDBStore({
    uri: mongoDB_URI,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 2
});


const middlewares = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
    session({
        secret: config.get('secret'),
        resave: false,
        saveUninitialized: false,
        store: store

    }),
    flash(),
    bindeUserWithRequest(),
    setLocals()
    
];

module.exports = app =>{
    middlewares.forEach(m=>{
        app.use(m)
    })
};