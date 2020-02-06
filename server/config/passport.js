const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

// private key
require('dotenv').config()
const privateKey = process.env.PRIVATE_KEY

const opts = {}

// options
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = privateKey

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id, (err, user) => {
            if (err) {
                return done(err, false)
            }

            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
    }))
}