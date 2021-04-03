import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Reviews from "./Reviews";

import { useParams } from "react-router-dom";

const RecipeDetails = ( {user, location } ) => {
  const recipeDetails = location.state.recipe;
  // const { id } = useParams();
  // const [recipeDetails, setRecipeDetails] = useState({
  //   id,
  //   name: "Best Dish Ever",
  //   price: '3',
  //   ratings: '4',
  //   mealType: 'Dinner',
  //   ingredients: 'crackers and cucumbers',
  //   allergens: 'nuts',
  //   description: 'Signature dish featuring cheez its and pickles',
  //   countryOfOrigin: 'Leoland',
  //   servingsLeft: '3',
  // });

  // const [recipeDetails, setRecipeDetails] = useState({

  // })

  // useEffect(async () => {
  //   const recipe = await fetch(``);
  //   const recipeJSON = await recipe.json();
  //   setRecipeDetails({
  //     id,
  //     name: recipeJSON.title,
  //     price: "3",
  //     ratings: "4",
  //     mealType: "Dinner",
  //     ingredients: "crackers and cucumbers",
  //     allergens: "nuts",
  //     description: "Signature dish featuring cheez its and pickles",
  //     countryOfOrigin: "Leoland",
  //     servingsLeft: "3",
  //   });
  // }, [id])

  const handleOrder = async () => {
    const order = await fetch(`someOrderAPI`);
  };
  /*
address: "123 New Street New Jersey, NJ 20623"
allergens: "Dairy"
allergies: "none"
cook_id: 9
cooking_experience: 5
country_of_origin: "USA"
created_on: "2021-03-31T05:42:26.033Z"
description: "It's got grapes"
email_address: "vhuang@gmail.com"
image_url: "https://www.eatwell101.com/wp-content/uploads/2019/04/Blackened-Chicken-and-Avocado-Salad-recipe-1.jpg"
is_cook: true
kitchen_name: "Valerie's Kitchen"
last_login: "2021-03-31T05:42:26.033Z"
meal_type: "Lunch"
name: "Valerie Huang"
password: "$2b$10$EzkHG.7SFu6i7Ux9aw9n3.dAzJ1cIfwZGz5t6H745nt0BwYPtps1W"
phone_number: "145928324"
price: 20
profile_img: "img"
rating: null
recipe_id: 9
servings: 10
title: "Chicken Salad"
user_id: 54
*/
  return (
    <div
      style={{
        width: '60%',
        margin: '0 auto',
        border: '1.5px solid grey',
        padding: '25px',
      }}
    >
      <div>
        <div
          style={{ display: 'flex', justifyContent: 'space-between' }}
          className="recipe-card-row"
        >
          <div style={{ color: 'red' }}>{recipeDetails.title}</div>
          <div>Price: {recipeDetails.price} Tokens</div>
        </div>
        <div
          style={{ display: 'flex', justifyContent: 'space-between' }}
          className="recipe-card-row"
        >
          <div>Rating: {'⭐'.repeat(5)}</div>
          <div>
            {/* {recipeDetails.servingsLeft} Servings Left for{' '} */}
            {recipeDetails.meal_type}
          </div>
        </div>
        <div className="recipe-card-row">
          Country of Origin: {recipeDetails.country_of_origin}
        </div>
        <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            {/* <div className="recipe-card-row">
              Ingredients: {recipeDetails.ingredients}
            </div> */}
            <div className="recipe-card-row">
              {recipeDetails.description}
            </div>
          </div>
          <img
            src={recipeDetails.image_url}
            style={{ width: '200px' }}
          />
        </div>
        <span style={{marginLeft: 0, marginBottom: '10px' }} className="recipe-card-row allergens">
          Contains {recipeDetails.allergens}
        </span>
      </div>
      <Button onClick={handleOrder} style={{marginTop: '20px'}} variant="contained" color="secondary">
        Order Now
      </Button>
      <Reviews user={user} />
    </div>
  );
}


export default withRouter(RecipeDetails); 



