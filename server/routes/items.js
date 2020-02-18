const router = require('express').Router()
const passport = require('passport')
require('../config/passport')(passport)

// item model
const Item = require('../models/Items')

router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    const {
        title,
        description,
        category,
        location,
        img,
        price,
        deliveryType,
    } = req.body

    const newItem = new Item({
        title: title,
        description: description,
        category: category,
        location: location,
        img: img,
        price: price,
        deliveryType: deliveryType,
        sellerInfo: req.user._id
    })

    newItem.save()
        .then(item => res.status(200).json(item))
        .catch(err => console.log(err))
})

module.exports = router