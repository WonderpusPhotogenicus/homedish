import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const RecipeCard = () => {
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [meal_type, setMealType] = useState("");
  const [country_of_origin, setCountry] = useState("");
  const [allergens, setAllergens] = useState("");
  const [diets, setDiets] = useState("");
  const [servings, setServings] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [validationMap, setValidationMap] = useState({});

  const handleNewRecipe = async () => {
    const fields = {
      title: title,
      meal_type: meal_type,
      country_of_origin: country_of_origin,
      allergens: allergens,
      diets: diets,
      servings: servings,
      price: price,
      description: description,
      image_url: "https://bigseventravel.com/wp-content/uploads/2020/01/hard-times-sundae-nyc.jpg", // TODO: this is hard-coded
      cook_id: 1 // TODO: this is hard-coded
    };

    console.log(fields);

    const newRecipeErrors = {};
    for (const key in fields) {
      if (!fields[key]) {
        newRecipeErrors[key] = `${key} is required`;
      } 
    }

    if (Object.keys(newRecipeErrors).length > 0) {
      setValidationMap(newRecipeErrors);
      console.log(newRecipeErrors);
      return;
    }

    fetch("/api/addRecipe", {
        method: "POST",
        body: JSON.stringify(fields),
        headers: {
        "Content-Type": "application/json",
        },
    })
    .then(res => {
        if (res.ok) {
        return res.json();
        }else {
        throw "recipe not created"
        }
    })
    .then(data => {
        history.push('/search');
    })
    .catch(err => console.log(err))
  };

  return (
    <>
      <form>
        <p>
          <TextField
            id="title"
            type="text"
            label="Recipe Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!validationMap.title}
            helperText={validationMap.title}
            variant="outlined"
          />
        </p>
        <p>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">
              Meal Type
            </InputLabel>
            <Select
              id="meal-type"
              label="Meal Type"
              value={meal_type}
              onChange={(e) => setMealType(e.target.value)}
              error={!!validationMap.meal_type}
              helperText={validationMap.meal_type}
              variant="outlined"
            >
              <MenuItem value="Breakfast">Breakfast</MenuItem>
              <MenuItem value="Lunch">Lunch</MenuItem>
              <MenuItem value="Dinner">Dinner</MenuItem>
              <MenuItem value="Dessert">Dessert</MenuItem>
            </Select>
          </FormControl>
        </p>
        <p>
          <TextField
            id="country"
            label="Country of Origin"
            value={country_of_origin}
            onChange={(e) => setCountry(e.target.value)}
            error={!!validationMap.country_of_origin}
            helperText={validationMap.country_of_origin}
            variant="outlined"
          />
        </p>
        <p>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">
              Allergens
            </InputLabel>
            <Select
              id="allergens"
              label="Allergens"
              value={allergens}
              onChange={(e) => setAllergens(e.target.value)}
              error={!!validationMap.allergens}
              helperText={validationMap.allergens}
              variant="outlined"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Dairy">Dairy</MenuItem>
              <MenuItem value="Eggs">Eggs</MenuItem>
              <MenuItem value="Nuts">Nuts</MenuItem>
              <MenuItem value="Fish">Fish</MenuItem>
              <MenuItem value="Wheat">Wheat</MenuItem>
              <MenuItem value="Soy">Soy</MenuItem>
            </Select>
          </FormControl>
        </p>
        <p>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">
              Diets
            </InputLabel>
            <Select
              id="diets"
              label="Diets"
              value={diets}
              onChange={(e) => setDiets(e.target.value)}
              error={!!validationMap.diets}
              helperText={validationMap.diets}
              variant="outlined"
            >
              <MenuItem value="Vegetarian">Vegetarian</MenuItem>
              <MenuItem value="Vegan">Vegan</MenuItem>
              <MenuItem value="Gluten-Free">Gluten-Free</MenuItem>
            </Select>
          </FormControl>
        </p>
        <p>
          <TextField
            id="servings"
            label="Servings Available"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            error={!!validationMap.servings}
            helperText={validationMap.servings}
            variant="outlined"
          />
        </p>
        <p>
          <TextField
            id="price"
            label="Price per Serving"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            error={!!validationMap.price}
            helperText={validationMap.price}
            variant="outlined"
          />
        </p>
        <p>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!validationMap.description}
            helperText={validationMap.description}
            variant="outlined"
          />
        </p>
        <Button color="primary" onClick={handleNewRecipe}>
          Create
        </Button>
      </form>
    </>
  );
};

export default RecipeCard;