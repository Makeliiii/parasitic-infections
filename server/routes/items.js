const router = require('express').Router()
const multer = require('multer')
const upload = multer({ dest: '../uploads' })
const fs = require('fs')
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
        price,
        deliveryType,
    } = req.body

    const newItem = new Item({
        title: title,
        description: description,
        category: category,
        location: location,
        img: [],
        price: price,
        deliveryType: deliveryType,
        sellerInfo: req.user._id
    })

    newItem.save()
        .then(item => res.status(200).json({
            item,
            status: 'Item added',
            success: true
        }))
        .catch(err => console.log(err))
})

router.put('/add-image/:id', upload.array('img', 4), passport.authenticate('jwt', { session: false }), (req, res) => {
    const images = req.files

    images.forEach(img => {
        fs.rename(img.path, `./uploads/${img.originalname}`, (err) => {
            if (err) throw err
            console.log('Images renamed')
        })
    })

    Item.findByIdAndUpdate({ _id: req.params.id, sellerInfo: req.user._id }).then(item => {
        if (!item) {
            return res.status(404).json({
                status: 'No such item or you\'re not authenticated to edit the item',
                success: false
            })
        }

        item.img = images

        item.save()
            .then(item => res.status(200).json({
                item,
                status: 'Images added successfully',
                success: true
            }))
            .catch(err => console.log(err))
    })
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