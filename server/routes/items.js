const router = require('express').Router()
const passport = require('passport')
require('../config/passport')(passport)

// item model
const Item = require('../models/Items')

// post a new item
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

// delete item by id
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Item.findOneAndDelete({ _id: req.params.id, sellerInfo: req.user._id }).then(doc => {
        if (!doc) {
            return res.status(404).json({
                status: 'No such item or you\'re not authenticated to delete the item',
                success: false
            })
        }

        return res.status(200).json({
            status: 'Deletion succesful',
            success: true
        })
    })
})

module.exports = router