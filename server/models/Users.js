const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const saltyRoundy = 10

const now = new Date().toISOString().slice(0, 10)
const phoneRegEx = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
// somewhat bad of a regex cause it filters a lot of top level domains but you can just add them here as you encouter problems
const emailRegEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|fi|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/

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
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return phoneRegEx.test(v)
            }
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return emailRegEx.test(v)
            }
        }
    },
    date: {
        type: Date,
        default: now
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