import React, { useState, useEffect } from 'react';
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Reviews from "./Reviews";

import { useParams } from "react-router-dom";

const RecipeDetails = ({user}) => {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({
    id,
    name: "Best Dish Ever",
    price: '3',
    ratings: '4',
    mealType: 'Dinner',
    ingredients: 'crackers and cucumbers',
    allergens: 'nuts',
    description: 'Signature dish featuring cheez its and pickles',
    countryOfOrigin: 'Leoland',
    servingsLeft: '3',
  });

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
    
  }

  return (
    <div
      style={{
        width: "60%",
        margin: "0 auto",
        border: "1.5px solid grey",
        padding: "25px",
      }}
    >
      <div>
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="recipe-card-row"
        >
          <div style={{ color: "red" }}>{recipeDetails.name}</div>
          <div>Price: {recipeDetails.price} Tokens</div>
        </div>
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="recipe-card-row"
        >
          <div>Rating: {"⭐".repeat(Number(recipeDetails.ratings))}</div>
          <div>
            {recipeDetails.servingsLeft} Servings Left for{" "}
            {recipeDetails.mealType}
          </div>
        </div>
        <div className="recipe-card-row">
          Country of Origin: {recipeDetails.countryOfOrigin}
        </div>
        <div style={{ marginTop: "50px", display: "flex" }}>
          <div>
            <div className="recipe-card-row">
              Ingredients: {recipeDetails.ingredients}
            </div>
            <div className="recipe-card-row">
              Signature dish a la chef Leo .... {recipeDetails.description}
            </div>
          </div>
          <img
            src="https://v1.nitrocdn.com/gdQToJpjwmoFSVXcSlvjpaoApjexzIdE/assets/static/source/rev-a573ee2/wp-content/uploads/2020/04/tomato-goat-cheese-pasta-recipe-1-720x1080.jpg"
            style={{ width: "100px" }}
          />
        </div>
        <div className="recipe-card-row">
          Contains {recipeDetails.allergens}
        </div>
      </div>
      <Button onClick={handleOrder} variant="contained" color="secondary">
        Order Now
      </Button>
      <Reviews user={user}/>
    </div>
  );
}


export default RecipeDetails; 



