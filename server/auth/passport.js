const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models/homeModels');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy((email_address, password, done) => {
  
  db.query('SELECT user_id, email_address, password FROM Users WHERE email_address=$1;', [email_address], (err, result) => {
    if(err) {
      console.log('Error when selecting user on login', err)
      return done(err)
    }

    if(result.rows.length > 0) {
      const first = result.rows[0]
      bcrypt.compare(password, first.password, function(err, res) {
        if (res) {
          done(null, { user: first.user_id, email_address: first.email_address })
         } else {
          done(null, false)
         }
       })
     } else {
       cb(null, false)
     }
  })
}))


passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((id, cb) => {
  db.query('SELECT user_id, email_address FROM Users WHERE id = $1', [parseInt(id, 10)], (err, results) => {
    if(err) {
      console.log('error selecting user on session deserialize', err)
      return cb(err)
    }

    cb(null, results.rows[0])
  })
})