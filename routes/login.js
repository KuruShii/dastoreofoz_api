const express = require('express');
const session = require('express-session');
const validator = require('validator');
const cors = require('cors');

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');

const login = express.Router();
login.use(cors());
const loginDB = require('../db/userDB');

const sess = new session({
    secret: 'gdfhjgdfjkgdf',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'none',
        maxAge: 30000000000,
    },
});

login.use(sess);

login.use(passport.initialize());
login.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.user_id);
})

passport.deserializeUser((id, done) => {
    loginDB.getUserById(id, (err, result) => {
        if (err) return done(err);

        const user = {
            user_id: result.user_id,
            username: result.username,
            email: result.email,
            delivery_id: result.delivery_id,
            billing_id: result.billing_id,
        };

        done(null, user);
    })
})

passport.use(new localStrategy((username, password, done) => {
    username = validator.escape(username);

    loginDB.getUserByUsername(username, async(err, user) => {
        if (err) return done(err);

        if(!user || !await bcrypt.compare(password, user.password)) return done(null, false);

        done(null, user);
    })
}))

login.post('/register', async (req, res) => {
    let { username, password, email } = req.body;

    username = validator.escape(email);
    email = validator.escape(email);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userInfo = {
        username,
        password: hashedPassword,
        email,
    };

    loginDB.createUser(userInfo, (err, result) => {
        if (err) return res.status(500).json(err);

        if (!result) return res.sendStatus(400);

        return res.redirect('/login');
    })
})

login.post('/login', passport.authenticate('local', {failureRedirect: '/login', successRedirect: '/dashboard'}));


module.exports = login;