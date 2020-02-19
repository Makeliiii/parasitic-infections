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
        // find user by matching the id in payload with one in the db
        User.findById(jwt_payload.id, (err, user) => {
            // in case of errors
            if (err) {
                return done(err, false)
            }

            // if user was found or not, return done() accordingly
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
    }))
}