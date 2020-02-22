const app = require('../index')
const chai = require('chai')
const chaiHttp = require('chai-http')

const { expect } = chai
chai.use(chaiHttp)

describe('ADD', () => {
    it('should add a user to db', done => {
        chai.request(app)
            .post('/api/users/register')
            .send({
                username: 'widePeepoHappy',
                password: 'mucus'
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.success).to.equals(true)
                done()
            })
    })

    it('should return error code if trying to register a user with a name that already exists', done => {
        chai.request(app)
            .post('/api/users/register')
            .send({
                username: 'Makeli',
                password: "asdlöjgäearihgnasdkghaoäih"
            })
            .end((err, res) => {
                expect(res).to.have.status(400)
                expect(res.body.success).to.equals(false)
                done()
            })
    })
})

describe('LOGIN', () => {
    it('should login with a user', done => {
        chai.request(app)
            .post('/api/users/login')
            .send({
                username: 'widePeepoHappy',
                password: 'mucus'
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.success).to.equals(true)
                done()
            })
    })
})