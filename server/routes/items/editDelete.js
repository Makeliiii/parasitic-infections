const router = require('express').Router()
const passport = require('passport')
require('../../config/passport')(passport)

// item model
const Item = require('../../models/Items')

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

module.exports = router