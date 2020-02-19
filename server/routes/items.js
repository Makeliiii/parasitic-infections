const router = require('express').Router()
const multer = require('multer')
const upload = multer({ dest: '../uploads' })
const fs = require('fs')
const passport = require('passport')
require('../config/passport')(passport)

// item model
const Item = require('../models/Items')

// @ROUTE POST /api/items/add
// @DESC add an item to the database
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    const {
        title,
        description,
        category,
        location,
        price,
        deliveryType,
    } = req.body

    // new item object
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

    // save the item object to db
    newItem.save()
        .then(item => res.status(200).json({
            item,
            status: 'Item added',
            success: true
        }))
        .catch(err => console.log(err))
})

// @ROUTE PUT /api/items/add-image/:id
// @DESC add the images to the desired item based on item id
router.put('/add-image/:id', upload.array('img', 4), passport.authenticate('jwt', { session: false }), (req, res) => {
    const images = req.files

    // rename each image to its' original name
    images.forEach(img => {
        fs.rename(img.path, `./uploads/${img.originalname}`, (err) => {
            if (err) throw err
            console.log('Images renamed')
        })
    })

    // find the item by id and user id
    Item.findOne({ _id: req.params.id, sellerInfo: req.user._id }).then(item => {
        // if no item is found
        if (!item) {
            return res.status(404).json({
                status: 'No such item or you\'re not authenticated to edit the item',
                success: false
            })
        }

        // item.img is an array so just save images into it
        item.img = images

        // save the modified item into db
        item.save()
            .then(item => res.status(200).json({
                item,
                status: 'Images added successfully',
                success: true
            }))
            .catch(err => console.log(err))
    })
})

// @ROUTE PUT /api/items/edit/:id
// @DESC edit the desired item
router.put('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const {
        title,
        description,
        category,
        location,
        price,
        deliveryType,
    } = req.body

    Item.findOne({ _id: req.params.id, sellerInfo: req.user._id  }).then(item => {
        // if no item is found
        if (!item) {
            return res.status(404).json({
                status: 'No such item or you\'re not authenticated to edit the item',
                success: false
            })
        }

        // update the item object
        item.title = title
        item.description = description
        item.category = category
        item.location = location
        item.price = price
        item.deliveryType = deliveryType

        // save the modified item into db
        item.save()
            .then(item => res.status(200).json({
                item,
                status: 'Item updated successfully',
                success: true
            }))
            .catch(err => {
                console.log(err)
                res.status(400).json({
                    status: 'Some fields are empty',
                    success: false
                })
            })
    })
})

// @ROUTE DELETE /api/items/delete/:id
// @DESC delete an item based on its' id
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    // find the item by id and user id
    Item.findOneAndDelete({ _id: req.params.id, sellerInfo: req.user._id }).then(doc => {
        // error handling
        if (!doc) {
            return res.status(404).json({
                status: 'No such item or you\'re not authenticated to delete the item',
                success: false
            })
        }

        // return this object if deletion is successful
        return res.status(200).json({
            status: 'Deletion succesful',
            success: true
        })
    })
})

// @ROUTE GET /api/items
// @DESC get all items
router.get('/get', (req, res) => {
    // find all items
    Item.find((err, items) => {
        if (err) {
            console.log(err)
            return res.status(404).json({
                status: 'Items not found',
                success: false
            })
        }

        // return all items
        return res.status(200).json({
            items,
            status: 'Items found',
            success: true
        })
    })
})

module.exports = router