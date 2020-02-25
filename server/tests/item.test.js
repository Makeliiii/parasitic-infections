const app = require('../index')
const chai = require('chai')
const chaiHttp = require('chai-http')
const fs = require('fs')

const { expect } = chai
chai.use(chaiHttp)

let token
let id

before(done => {
    chai.request(app)
        .post('/api/users/login')
        .send({
            username: 'apina',
            password: 'jeebus'
        })
        .end((err, res) => {
            token = res.body.token
            done()
        })
})

before(done => {
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
            id = res.body.item._id
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
            .put(`/api/items/add-image/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .attach('img', fs.readFileSync('./uploads/2019-postimerkki.jpg'), '2019-postimerkki.jpg')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.success).to.equals(true)
                done()
            })
    })

    it('edits an item', done =>  {
        chai.request(app)
            .put(`/api/items/edit/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                "title": "hahaha",
                "description": "outo juttu jutussa",
                "category": "jutut",
                "location": {
                    "country": "Finland",
                    "city": "Helsinki"
                },
                "price": 666.666,
                "deliveryType": "pickup"
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.success).to.equals(true)
                done()
            })
    })
})

describe('DELETE', () => { 
    it('deletes an item', done => {
        chai.request(app)
            .delete(`/api/items/delete/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.success).to.equals(true)
                done()
            })
    })
})