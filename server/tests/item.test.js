const app = require('../index')
const chai = require('chai')
const chaiHttp = require('chai-http')
const fs = require('fs')

const { expect } = chai
chai.use(chaiHttp)

let token

before(done => {
    chai.request(app)
        .post('/api/users/login')
        .send({
            username: 'widePeepoHappy',
            password: 'mucus'
        })
        .end((err, res) => {
            token = res.body.token
            done()
        })
})

describe('GET', () => {
    it('gets all items', done => {
        chai.request(app)
            .get('/api/items/get')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.success).to.equals(true)
                done()
            })
    })

    it('gets items based on category', done => {
        chai.request(app)
            .get('/api/items/get/category/things')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.success).to.equals(true)
                done()
            })
    })

    it('gets items based on country', done => {
        chai.request(app)
            .get('/api/items/get/location/Finland')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.success).to.equals(true)
                done()
            })
    })

    it('gets items based on country and city', done => {
        chai.request(app)
            .get('/api/items/get/location/Finland/Helsinki')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.success).to.equals(true)
                done()
            })
    })

    it('gets items based on date of posting', done => {
        chai.request(app)
            .get('/api/items/get/date/2020-02-20')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.success).to.equals(true)
                done()
            })
    })
})

describe('POST/PUT', () => {
    it('posts an item', done => {
        chai.request(app)
            .post('/api/items/add')
            .set('Authorization', `Bearer ${token}`)
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

    it('puts images to items', done => {
        chai.request(app)
            .post('/api/add-image/5e4e4ae6d5e05a14fcc2432d')
            .field('Content-Type', 'multipart/form-data')
            .set('Authorization', `Bearer ${token}`)
            .send({
                img: fs.readFileSync('./uploads/2019-postimerkki.jpg'),
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.success).to.equals(true)
                done()
            })
    })
})