const router = require('express').Router()

// item model
const Item = require('../../models/Items')

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

// @ROUTE GET /api/items/get/category/:category
// @DESC get items based on category
router.get('/get/category/:category', (req, res) => {
    // find items based on category
    Item.find({ category: req.params.category }, (err, items) => {
        if (err) {
            console.log(err)
            return res.status(404).json({
                status: 'Items not found',
                success: false
            })
        }

        // return items
        return res.status(200).json({
            items,
            status: 'Items found',
            success: true
        })
    })
})

// @ROUTE GET /api/items/get/location/:country/:city?
// @DESC get items based on item location
router.get('/get/location/:country/:city?', (req, res) => {
    // find items based only on country if city parameter doesn't exist
    if (!req.params.city) {
        Item.find({ 'location.country': req.params.country }, (err, items) => {
            if (err) {
                console.log(err)
                return res.status(404).json({
                    status: 'Items not found',
                    success: false
                })
            }

            return res.status(200).json({
                items,
                status: 'Items found',
                success: true
            })
        })
    }

    // find items based on country and city
    if (req.params.city) {
        Item.find({ 'location.country': req.params.country, 'location.city': req.params.city }, (err, items) => {
            if (err) {
                console.log(err)
                return res.status(404).json({
                    status: 'Items not found',
                    success: false
                })
            }
    
            return res.status(200).json({
                items,
                status: 'Items found',
                success: true
            })
        })
    }
})

// @ROUTE GET /api/items/get/date/:date
// @DESC get items based on the date of posting
router.get('/get/date/:date', (req, res) => {
    Item.find({ date: req.params.date }, (err, items) => {
        if (err) {
            console.log(err)
            return res.status(404).json({
                status: 'Items not found',
                success: false
            })
        }

        return res.status(200).json({
            items,
            status: 'Items found',
            success: true
        })
    })
})

module.exports = router