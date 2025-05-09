const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password', session: false },async (username, password, done) => {
    try {
        let user = await User.findOne({ username: username })
        if (!user) {
            return done(null, false, { message: "incorrect username" })
        }
        const isMatch = await user.verifyPassword(password)
        if (!isMatch) {
            return done(null, false, { message: "wrong password" })
        }
        return done(null, user)
    } catch (err) {
        return done(err,false)
    }
}))

module.exports=passport