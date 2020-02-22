const index = require('../index')
const chai = require('chai')
const chaiHttp = require('chai-http')

const { expect } = chai
chai.use(chaiHttp)

describe('GET', () => {
    it('gets all items', done => {
        chai
            .request(index)
            .get('/api/items/get')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.success).to.equals(true)
                done()
            })
    })

    it('gets items based on category', done => {
        chai
            .request(index)
            .get('/api/items/get/category/things')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.success).to.equals(true)
                done()
            })
    })

    it('gets items based on country', done => {
        chai
            .request(index)
            .get('/api/items/get/location/Finland')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.success).to.equals(true)
                done()
            })
    })

    it('gets items based on country and city', done => {
        chai
            .request(index)
            .get('/api/items/get/location/Finland/Helsinki')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.success).to.equals(true)
                done()
            })
    })

    it('gets items based on date of posting', done => {
        chai
            .request(index)
            .get('/api/items/get/date/2020-02-20')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.success).to.equals(true)
                done()
            })
    })
})

describe('POST', () => {
    it('posts and item', done => {
        chai
            .request(index)
            .post('/api/items/add')
            .send({
                "title": "jajajaja",
                "description": "olio jutussa",
                "category": "things",
                "location": {
                    "country": "Finland",
                    "city": "Jurva"
                },
                "price": 666.666,
                "deliveryType": "delivery"
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.success).to.equals(true)
                done()
            })
    })
})