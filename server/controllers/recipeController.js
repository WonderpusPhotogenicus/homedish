const e = require('express');
const db = require('../models/homeModels');

const recipeController = {};

recipeController.addRecipe = (req, res, next) => {
  const { title, description, allergens, country_of_origin, meal_type, cook_id, image_url, price, servings } = req.body;
  console.log(req.body)
  const text = `INSERT INTO Recipes(title, description, allergens, country_of_origin, meal_type, cook_id, image_url, price, servings) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
  const vals = [`${title}`, `${description}`, `${allergens}`, `${country_of_origin}`, `${meal_type}`, `${cook_id}`, `${image_url}`, `${price}`, `${servings}`];
  
  db
    .query(text, vals)
    .then(data => {
      res.locals.recipe = data.rows[0]
    })
    .catch(e => {next({
      log: `recipeController.addRecipe: ${e}`,
      message: { err: 'recipeController.addRecipe: ERROR: Check server logs for details' }
    })
    }
    ).then(() => next());

}
// http://localhost:8080/api/getUser/?cook_id='cook_id'
recipeController.getAllRecipes = (req, res, next) => {
  const { cook_id } = req.query;

  const text = `SELECT * from Recipes WHERE cook_id = $1`;
  const val = [`${cook_id}`];

  db
    .query(text, val)
    .then(data => {
      res.locals.recipe = data.rows[0];
    })
    .catch(e => {next({
      log: `recipeController.getAllRecipes: ${e}`,
      message: { err: 'recipeController.getAllRecipes: ERROR: Check server logs for details' }
    })
    }
    ).then(() => next());

}
// http://localhost:8080/api/getUser/?recipe_id='recipe_id'
recipeController.deleteRecipe = (req, res, next) => {
  const { recipe } = req.query;
  
  const text = 'DELETE from Recipes WHERE recipe_id = $1;';
  const val = [`${user}`];

  db
    .query(text, val)
    .then(data => {
      res.status(200).send('User deleted');
    })
    .catch(e => {next({
      log: `recipeController.deleteRecipe: ${e}`,
      message: { err: 'recipeController.deleteRecipe: ERROR: Check server logs for details' }
    })
    }
    ).then(() => next());

}

// get recipe

// delete recipe

// edit recipe

module.exports = recipeController;