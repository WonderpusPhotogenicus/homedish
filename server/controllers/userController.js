const e = require('express');
const db = require('../models/homeModels');

const userController = {};
// http://localhost:8080/api/signup
userController.createUser = (req, res, next) => {
  console.log(req.body)
  const { name, email_address, password, address, phone_number, allergies, profile_img, is_cook } = req.body;
  
  const text = 'INSERT INTO Users(name, email_address, password, address, phone_number, allergies, profile_img, is_cook, created_on, last_login) VALUES($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING user_id, name, email_address, address, phone_number, allergies, profile_img, is_cook, created_on, last_login;';
  const val = [`${name}`, `${email_address}`, `${password}`, `${address}`, `${phone_number}`, `${allergies}`, `${profile_img}`, `${is_cook}`];

  db
    .query(text, val)
    .then(data => {
      const userData = data.rows[0];
      userData.token = req.body.token;
      res.locals.user = userData;
    })
    .catch(e => {next({
      log: `userController.createUser: ${e}`,
      message: { err: 'userController.createUser: ERROR: Check server logs for details' }
    })
    }
    ).then(() => next());

}
// http://localhost:8080/api/getUser/?email='email'
userController.getUser = (req, res, next) => {
  let email;
  const { token } = res.locals;
  // get email if query
  if (req.query.email) { 
    email = req.query.email;
  } else {
    email = req.body.username;
  }
  
  const text = `SELECT name, email_address, address, phone_number, allergies, is_cook, last_login FROM Users WHERE email_address = $1;`
  const val = [`${email}`]

  db
    .query(text, val)
    .then(data => {
      res.locals.user = data.rows[0];
      res.locals.user.token = token
    })
    .catch(e => {next({
      log: `userController.getUser: ${e}`,
      message: { err: 'userController.getUser: ERROR: Check server logs for details' }
    })
    }
    ).then(() => next());

}

userController.getUserId = (req, res, next) => {
  const { email } = req.query;
  const text = `SELECT user_id FROM Users WHERE email_address = $1;`
  const val = [`${email}`]

  db
    .query(text, val)
    .then(data => {
      res.locals.userId = data.rows[0].user_id;
    })
    .catch(e => {next({
      log: `userController.getUser: ${e}`,
      message: { err: 'userController.getUser: ERROR: Check server logs for details' }
    })
    }
    ).then(() => next());

}
// http://localhost:8080/api/updateUser/?email='email'
userController.updateUser = (req, res, next) => {
  const user = res.locals.userId;
  const { column, change } = req.body;
   
  const text = `UPDATE Users SET ${column} = $1 WHERE user_id = ${user};`;
  const val = [`${change}`];
  
  db
    .query(text, val)
    .then(data => {
      res.status(200);
    })
    .catch(e => {next({
      log: `userController.updateUser: ${e}`,
      message: { err: 'userController.updateUser: ERROR: Check server logs for details' }
    })
    }
    ).then(() => next());

}

userController.deleteUser = (req, res, next) => {
  const user = res.locals.userId;
  
  const text = 'DELETE from Users WHERE user_id = $1;';
  const val = [`${user}`];

  db
    .query(text, val)
    .then(data => {
      res.status(200).send('User deleted');
    })
    .catch(e => {next({
      log: `userController.updateUser: ${e}`,
      message: { err: 'userController.updateUser: ERROR: Check server logs for details' }
    })
    }
    ).then(() => next());

}


module.exports = userController;