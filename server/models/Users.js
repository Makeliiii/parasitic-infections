const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const saltyRoundy = 10

// user schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

// password hash middleware
UserSchema.pre('save', function(next) {
    let user = this

    // salt gen
    bcrypt.genSalt(saltyRoundy, function(err, salt) {
        if (err) return next(err)

        // hash pass with salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err)

            // replace cleartext pass with hashed one
            user.password = hash;
            next()
        })
    })
})

// compare passwords function
UserSchema.methods.comparePasswords = function(givenPass, cb) {
    // compare given password to the password in db
    bcrypt.compare(givenPass, this.password, (err, isMatch) => {
        // return an error if there is one, otherwise return isMatch
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

module.exports = User = mongoose.model('User', UserSchema)