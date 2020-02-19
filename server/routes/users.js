const router = require('express').Router()
const jwt = require('jsonwebtoken')

// private key
require('dotenv').config()
const privateKey = process.env.PRIVATE_KEY

// user model
const User = require('../models/Users')

// @ROUTE POST /api/users/register
// @DESC register a new user
router.post('/register', (req, res) => {
    // find if username already exists and handle it accordingly
    User.findOne({ username: req.body.username }).then(user => {
        if (user) {
            return res.status(400).json({ 
                status: "Username already exists",
                success: false
            })
        }

        // new user object
        const newUser = new User({
            username: req.body.username,
            password: req.body.password
        })

        // save user in db and handle errors
        newUser.save()
            .then(user => {
                res.status(200).json({
                    user,
                    status: 'User created succesfully',
                    success: true
                })
            })
            .catch(err => console.log(err))
    })
})

// @ROUTE POST /api/users/login
// @DESC login with an existing user
router.post('/login', (req, res) => {
    // find user by username and check if it doesn't exist
    User.findOne({ username: req.body.username }).then(user => {
        if (!user) {
            return res.status(400).json({ 
                status: "User not found",
                success: false
            })
        }

        // compare the passwords
        user.comparePasswords(req.body.password, function(err, isMatch) {
            if (err) throw err

            // if passwords match, proceed to create payload for token
            if (isMatch) {
                const payload = {
                    id: user.id,
                    username: user.username
                }

                // token creation
                jwt.sign(payload, privateKey, { expiresIn: 120 /* DO NOT FORGET TO CHANGE */ }, (err, token) => {
                    if (err) throw err
                    
                    res.status(200).json({
                        success: true,
                        token: token
                    })
                })

            // if passwords don't match; return an error
            } else {
                return res.status(400).json({
                    status: "Password incorrect",
                    success: false
                })
            }
        })
    })
})

module.exports = router