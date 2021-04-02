const e = require('express');
const db = require('../models/homeModels');

const cookController = {};

cookController.addCook = (req, res, next) => {
  if (!res.locals.user.is_cook) return next();

  const cookData = {
    cooking_experience: parseInt(req.body.cooking_experience),
    kitchen_name: req.body.kitchen_name
  };
  
  const { user_id } = res.locals.user;
  
  const text = `INSERT INTO Cooks(user_id, cooking_experience, kitchen_name) VALUES($1, $2, $3) RETURNING cooking_experience, kitchen_name;`;
  const vals = [`${user_id}`, `${cookData.cooking_experience}`, `${cookData.kitchen_name}`];
  
  db
    .query(text, vals)
    .then(data => {
      res.locals.user['cookInfo'] = data.rows[0];
    })
    .catch(e => {next({
      log: `cookController.addCook: ${e}`,
      message: { err: 'cookController.addCook: ERROR: Check server logs for details' }
    })
    }
    ).then(() => next());

}

cookController.getCook = (req, res, next) => {
  const { user_id } = req.body;

  const text = `SELECT * FROM Cooks WHERE user_id = $1`;
  const val = [`${user_id}`];

  db
    .query(text, val)
    .then(data => {
      res.locals.cook = data.rows[0];
    })
    .catch(e => {next({
      log: `cookController.getCook: ${e}`,
      message: { err: 'cookController.getCook: ERROR: Check server logs for details' }
    })
    }
    ).then(() => next());

}
module.exports = cookController;