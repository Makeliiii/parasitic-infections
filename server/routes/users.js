const router = require('express').Router()

// user model
const User = require('../models/Users')

router.post('/users/add', (req, res) => {
    User.findOne({ username: req.body.username }).then(user => {
        if (user) {
            return res.status(400).json({ status: "Username already exists" })
        } else {
            const newUser = new User({
                username: req.body.username,
                password: req.body.password
            })

            newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log(err))
        }
    })
})

module.exports = router