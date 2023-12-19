const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT;

//! Signup
router.post('/signup', async (req, res) => {

    try {

        const user = new User({
            firstName: req.body.first,
            lastName: req.body.last,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 13)
        });

        const newUser = await user.save();

        const token = jwt.sign({id: newUser._id}, SECRET, {expiresIn: "1 day"});

        res.status(200).json({
            user: newUser,
            message: "Success",
            token
        })

    } catch (err) {
        res.status(500).json({
            ERROR: err.message
        })
    }
});

//! Login
router.post('/login', async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({email: email});

        if(!user) throw new Error('Email or Password does not match.');
        
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch) throw new Error('Email or Password does not match.');

        const token = jwt.sign({id: user._id}, SECRET, {expiresIn: 60 * 60 * 12});

        res.status(200).json({
            message: "Logged in!",
            user,
            token
        })

    } catch (err) {
        res.status(500).json({
            ERROR: err.message
        })
    }
})

module.exports = router;