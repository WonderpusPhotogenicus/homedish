import React, { useState } from 'react';
import clsx from 'clsx';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import InputBase from '@material-ui/core/InputBase';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

// fake sample data

const arraySample = 
    [ {id: 1,
        url: 'https://www.roadaffair.com/wp-content/uploads/2018/07/vegan-street-food-nyc-shutterstock_404195452-1024x683.jpg',
        name: 'Squash Soup',
        cook_name: 'Sandra Song',
        meal_type: 'dinner',
        allergens: 'none',
        rating: 4,
        price: 8,
        servings: 2 //this we would need as well
      },
      {id: 2,
        url: 'https://www.roadaffair.com/wp-content/uploads/2018/07/vegan-street-food-nyc-shutterstock_404195452-1024x683.jpg',
        name: 'Squash Soup2',
        cook_name: 'Sandra Song',
        meal_type: 'dinner',
        allergens: 'none',
        rating: 4,
        price: 8
      },
      {id: 3,
        url: 'https://www.roadaffair.com/wp-content/uploads/2018/07/vegan-street-food-nyc-shutterstock_404195452-1024x683.jpg',
        name: 'Squash Soup3',
        cook_name: 'Sandra Song',
        meal_type: 'dinner',
        allergens: 'none',
        rating: 4,
        price: 8
      },
      {id: 4,
        url: 'https://www.roadaffair.com/wp-content/uploads/2018/07/vegan-street-food-nyc-shutterstock_404195452-1024x683.jpg',
        name: 'Squash Soup4',
        cook_name: 'Sandra Song',
        meal_type: 'dinner',
        allergens: 'none',
        rating: 4,
        price: 8
      },
      {id: 5,
        url: 'https://www.roadaffair.com/wp-content/uploads/2018/07/vegan-street-food-nyc-shutterstock_404195452-1024x683.jpg',
        name: 'Squash Soup5',
        cook_name: 'Sandra Song',
        meal_type: 'dinner',
        allergens: 'none',
        rating: 4,
        price: 8
      },
    ];

const mealType = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Dessert',
    ];

const rating = [
    '5 or less',
    '4 or less',
    '3 or less',
    '2 or less',
    '1 star'
    ];

const price = [
    '10 or less',
    '9 or less',
    '8 or less',
    '7 or less',
    '6 or less',
    '5 or less',
    '4 or less',
    '3 or less',
    '2 or less',
    '1 token',
    ];

// TODO: need to standardize allergens and diets

const preferences = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Dessert',
    ];

const Search = () => {
    // const [arraySample, updateSample] = useState(arraySample);

    function searchCity() {
        return console.log(document.getElementsByName("search-city-field")[0].value);
    }

    return (
        <div className="search">
            <div className="subtitle">
                Dishes available near you
                </div>
            <div className="search-loc">
                <div>
                <LocationOnOutlinedIcon />
                </div>
                <div>
                <InputBase
                    name="search-city-field"
                    placeholder="Search your zip code" 
                    inputProps={{ 'aria-label': 'search' }}
                />
                </div>
                <div>
                    <ArrowForwardIcon onClick={() => { searchCity(); }} />
                </div>
            </div>

            <div className="filters">
                <MultipleSelect />
            </div>

            <div className="results">
                {arraySample.map((el) => {
                    return (
                        <Result 
                            key={el.id}
                            recipeUrl={el.url}
                            recipeName={el.name}
                            recipeCook={el.cook_name}
                            recipeMealType={el.meal_type}
                            allergens={el.allergens}
                            rating={el.rating}
                            recipePrice={el.price} />
                    )
                })}
            </div>
        </div>
    )
}

// filters components

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));
  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
  function getStyles(name, filters, theme) {
    return {
      fontWeight:
        filters.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  
const MultipleSelect = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [mealTypeFilters, setMealTypes] = useState([]);
    const [ratingFilters, setRatings] = useState([]);
    const [priceFilters, setPrices] = useState([]);
    const [preferencesFilters, setPreferences] = useState([]);
  
    const handleMealChange = (event) => {
      setMealTypes(event.target.value);
    };

    const handleRatingChange = (event) => {
      setRatings(event.target.value);
    };

    const handlePriceChange = (event) => {
      setPrices(event.target.value);
    };
    
    const handlePrefsChange = (event) => {
      setPreferences(event.target.value);
    };
  
    // const handleChangeMultiple = (event) => {
    //   const { options } = event.target;
    //   const value = [];
    //   for (let i = 0, l = options.length; i < l; i += 1) {
    //     if (options[i].selected) {
    //       value.push(options[i].value);
    //     }
    //   }
    //   setRatings(value);
    // };
  
    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-mutiple-name-label">Meal Type</InputLabel>
          <Select
            labelId="demo-mutiple-name-label"
            id="demo-mutiple-name"
            multiple
            value={mealTypeFilters}
            onChange={handleMealChange}
            input={<Input />}
            MenuProps={MenuProps}
          >
            {mealType.map((name) => (
              <MenuItem key={name} value={name} style={getStyles(name, mealTypeFilters, theme)}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-mutiple-name-label">Rating</InputLabel>
          <Select
            labelId="demo-mutiple-name-label"
            id="demo-mutiple-name"
            value={ratingFilters}
            onChange={handleRatingChange}
            input={<Input />}
            MenuProps={MenuProps}
          >
            {rating.map((name) => (
              <MenuItem key={name} value={name} style={getStyles(name, ratingFilters, theme)}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-mutiple-name-label">Price</InputLabel>
          <Select
            labelId="demo-mutiple-name-label"
            id="demo-mutiple-name"
            value={priceFilters}
            onChange={handlePriceChange}
            input={<Input />}
            MenuProps={MenuProps}
          >
            {price.map((name) => (
              <MenuItem key={name} value={name} style={getStyles(name, priceFilters, theme)}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-mutiple-name-label">Preferences</InputLabel>
          <Select
            labelId="demo-mutiple-name-label"
            id="demo-mutiple-name"
            multiple
            value={preferencesFilters}
            onChange={handlePrefsChange}
            input={<Input />}
            MenuProps={MenuProps}
          >
            {preferences.map((name) => (
              <MenuItem key={name} value={name} style={getStyles(name, preferencesFilters, theme)}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }

const Result = ( { key, recipeUrl, recipeName, recipeCook, recipeMealType, allergens, rating, recipePrice }) => {
    const starRating = [];

    for (let i = 0; i < 5; i++) {
        if (i < rating) { 
            starRating.push(<StarIcon style={{ fontSize: 'small' }} />);
        } else {
            starRating.push(<StarBorderIcon style={{ fontSize: 'small' }} />);
        }
    }

    return (
        <div className="result" key={key}>
            <img src={recipeUrl} />

            <div className="result-name">
                <b>{recipeName}</b> by {recipeCook}
            </div>

            <div className="result-details">
                {recipeMealType} 
                <div className="allergens"> 
                    {/* /* this should loop */}
                    {allergens}
                </div>
                <div>
                    {starRating}
                </div>
            </div>

            <div className="result-price">
                {recipePrice} Tokens
            </div>
        </div>
  );
}

export default Search;