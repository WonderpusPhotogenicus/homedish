import React, { useState } from 'react';
import Login from './../components/Login.jsx';
import Signup from '../components/Signup.jsx';
import Landing from '../components/Landing.jsx';
import RecipeCard from '../components/RecipeCard.jsx';
import Search from '../components/Search.jsx';
import RecipeDetails from '../components/RecipeDetails.jsx';
import PrivateRoute from '../components/privateRoute';
import PublicRoute from '../components/publicRoute';
import HomePage from '../components/HomePage';

import { Switch, Route, Link, withRouter } from "react-router-dom";

const MainContainer = () => {
  const mockRecipesFromBackend = [
    { name: 'recipe 1', id: 1 },
    { name: 'recipe 2', id: 2 },
    { name: 'recipe 3', id: 3 },
  ];

  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <>
      <div className="nav">
        <div>
          <Link to="/">
            <h2>HomeDish</h2>
          </Link>
        </div>
        <div className="home-nav">
          {isLoggedIn && <div style={{color: "green"}}>Welcome {user.name}!</div>}
          {!isLoggedIn && (
            <div className="login-link">
              <Link to="/login">Login</Link>
            </div>
          )}
          {!isLoggedIn && (
            <div className="signup-link">
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </div>
        {/*mockRecipesFromBackend
         .map((recipe) => <Link to={`/recipe-details/${recipe.id}`}>placeholder</Link>)*/}
        <div className="auth-cook-nav" style={{ display: 'none' }}>
          <Link to="/create-recipe">Create a Recipe</Link>
          {/* <Link to="/search">My Active Recipes</Link>
            <Link to="/search">Search</Link> */}
        </div>

        <div className="auth-nav" style={{ display: 'none' }}>
          <Link to="/search">Search</Link>
          {/* <Link to="/search">Profile</Link>  */}
        </div>
      </div>

      <Switch>
        <PublicRoute restricted={false} component={Landing} path="/" exact />
        <PublicRoute restricted={true} component={Login} path="/login" exact>
          <Login setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>
        </PublicRoute>
        <PublicRoute restricted={true} component={Signup} path="/signup" exact>
          <Signup setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
        </PublicRoute>
        {/* <PrivateRoute component={Homepage} path="/home" exact /> */}
        <PrivateRoute component={HomePage} path="/dashboard" exact/>
        <PrivateRoute component={RecipeCard} path="/create-recipe" exact />
        <PrivateRoute component={Search} path="/search" exact />
        <PrivateRoute component={(props) => <RecipeDetails {...props } user={user} />} path="/recipe-details/:id" exact />
      </Switch>
    </>
  );
}

{/* 
   Old Routes
  <Route path="/home">
          <Landing />
        </Route>
        <Route path="/create-recipe">
          <RecipeCard />
        </Route>
        <Route path="/search">
          <Search />
          <Route path="/login">
            <Login />
        </Route>
        <Route path="/signup">
            <Signup setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
        </Route> */}

export default MainContainer;