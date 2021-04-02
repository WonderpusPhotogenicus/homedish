//creates the token to be used for local storage
// const TOKEN_KEY = 'jwt';

//sets the token key in users local storage
export const login = (token) => {
  localStorage.setItem('auth_token', token);
}
// removes the token key from local storage
export const logout = () => {
  localStorage.removeItem('auth_token');
}

//checks to see if there is a valid token key in users local storage
export const isLogin = () => {
  if (localStorage.getItem('auth_token')) {
    return true;
  }

  return false;
}