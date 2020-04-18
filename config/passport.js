const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const con = require('../config/config')

passport.use(new LocalStrategy(
     
    function(username, password, done) {
        console.log(password)
        
      con.query('SELECT * FROM user WHERE username = ?',[username],(err, user) => {
            console.log(user === true)
            if(!user) {
                return done()
            } else {
                if (!user) {
                
                    return done(null, false, {
                        message: 'Incorrect username'
                    })
                }
                
                 else if (!bcrypt.compareSync(password, user[0].password)) {
                    return done(null, false, {
                        message: 'Incorrect password'
                    })
                }

                return done(null, user)
            }



        })

    }  
))

passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
  
module.exports = passport;