const router = require('express').Router()
const multer = require('multer')
const upload = multer({ dest: '../uploads' })
const fs = require('fs')
const passport = require('passport')
require('../../config/passport')(passport)

// item model
const Item = require('../../models/Items')

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
        .catch(err => {
            console.log(err)
            res.status(401).json({
                status: 'Unauthorized',
                success: false
            })
        })
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
                status: 'No such item',
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
            .catch(err => {
                console.log(err)
                res.status(401).json({
                    status: 'Unauthorized',
                    success: false
                })
            })
    })
})

module.exports = router