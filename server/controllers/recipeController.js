const e = require('express');
const db = require('../models/homeModels');

const recipeController = {};

recipeController.addRecipe = (req, res, next) => {
  const { title, description, allergens, country_of_origin, meal_type, cook_id, image_url, price, servings } = req.body;

  const text = `INSERT INTO Recipes(title, description, allergens, country_of_origin, meal_type, cook_id, image_url, price, servings) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
  const vals = [`${title}`, `${description}`, `${allergens}`, `${country_of_origin}`, `${meal_type}`, `${cook_id}`, `${image_url}`, `${price}`, `${servings}`];
  
  db
    .query(text, vals)
    .then(data => {
      res.locals.recipe = data.rows
    })
    .catch(e => {next({
      log: `recipeController.addRecipe: ${e}`,
      message: { err: 'recipeController.addRecipe: ERROR: Check server logs for details' }
    })
    }
    ).then(() => next());

}
// http://localhost:8080/api/getUser/?cook_id='cook_id'
recipeController.getAllRecipesByCook = (req, res, next) => {
  const { cook_id } = req.query;

  const text = `SELECT * from Recipes WHERE cook_id = $1`;
  const val = [`${cook_id}`];

  db
    .query(text, val)
    .then(data => {
      res.locals.recipes = data.rows;
    })
    .catch(e => {next({
      log: `recipeController.getAllRecipesByCook: ${e}`,
      message: { err: 'recipeController.getAllRecipesByCook: ERROR: Check server logs for details' }
    })
    }
    ).then(() => next());

}

recipeController.getAllRecipes = (req, res, next) => {
  const text = `SELECT * from Recipes`;

  db
    .query(text)
    .then(data => {
      res.locals.recipes = data.rows;
    })
    .catch(e => {next({
      log: `recipeController.getAllRecipesByCook: ${e}`,
      message: { err: 'recipeController.getAllRecipesByCook: ERROR: Check server logs for details' }
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

recipeController.updateRecipe = (req, res, next) => {
  // attach column/field, change needed to be made, and recipe id
  const { column, change, recipe_id } = req.body;
   
  const text = `UPDATE Recipes SET ${column} = $1 WHERE recipe_id = ${recipe_id};`;
  const val = [`${change}`];
  
  db
    .query(text, val)
    .then(data => {
      res.status(200);
    })
    .catch(e => {next({
      log: `recipeController.updateRecipe: ${e}`,
      message: { err: 'recipeController.updateRecipe: ERROR: Check server logs for details' }
    })
    }
    ).then(() => next());

}


// recipeController.addImageUrl = (req, res, next) => {

//   const { ulr } = req.query;

//   const text = ``
// }


// get recipe

// delete recipe

// edit recipe

module.exports = recipeController;