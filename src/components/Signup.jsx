import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const Signup = ({ setUser, setIsLoggedIn }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [allergies, setAllergies] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [kitchenName, setKitchenName] = useState("");
  const [experience, setExperience] = useState("");
  const [is_cook, setUserType] = useState("false");
  const [validationMap, setValidationMap] = useState({});
  const history = useHistory();

  const handleSignup = async () => {
    const fields = {
      "first name": firstName,
      "last name": lastName,
      email,
      password: password,
      "re-enter password": reenterPassword,
      "phone number": phoneNumber,
      street: street,
      city: city,
      state: state,
      zip: zip,
      allergies: allergies,
      is_cook: is_cook
    };

    const signUpErrors = {};
    for (const key in fields) {
      if (!fields[key]) {
        signUpErrors[key] = `${key} is required`;
      } else if (key === "password" || key === "re-enter password") {
        if (fields["password"] !== fields["re-enter password"]) {
          signUpErrors["password"] = "passwords must match";
          signUpErrors["re-enter password"] = "passwords must match";
        }
      } else if (key === "allergies" && !fields[key]) {
        signUpErrors[key] = "Indicate none if no allergies";
      } else if (key === "phoneNumber" && phoneNumber.length !== 10) {
        signUpErrors[key] = "Phone Number must be exactly 10 characters long"
      }
    }

    if (Object.keys(signUpErrors).length > 0) {
      setValidationMap(signUpErrors);
      return;
    }
    
    fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        name: `${firstName} ${lastName}`,
        email_address: email,
        password,
        phone_number: phoneNumber,
        address: `${street} ${city}, ${state} ${zip}`,
        allergies,
        profile_img: "img",
        kitchen_name: kitchenName,
        cooking_experience: experience,
        is_cook
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }else {
        throw "user not created"
      }
    })
    .then(data => {
      // can change redirect route later
      setUser(data);
      setIsLoggedIn(true);
      data.is_cook ? history.push('/create-recipe') : history.push('/dashboard');
    })
    .catch(err => console.log(err))
    
    
  };

  return (
    <>
      <Button onClick={() => setUserType('false')}>Eat</Button>
      <Button onClick={() => setUserType('true')}>Cook</Button>
      <form>
        <p>
          <TextField
            type="text"
            id="firstname"
            label="First Name"
            name="firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={!!validationMap['first name']}
            helperText={validationMap['first name']}
            variant="outlined"
            style={{ marginRight: '10px' }}
          />
          {/* </p>
        <p> */}
          <TextField
            label="Last Name"
            type="text"
            id="lastname"
            name="lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={!!validationMap['last name']}
            helperText={validationMap['last name']}
            variant="outlined"
          />
        </p>
        <p>
          <TextField
            label="Email"
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!validationMap['email']}
            helperText={validationMap['email']}
            variant="outlined"
          />
        </p>
        <p>
          <TextField
            label="Password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!validationMap['password']}
            helperText={validationMap['password']}
            variant="outlined"
          />
        </p>
        <p>
          <TextField
            label="Re-enter Password"
            type="password"
            id="re-enter"
            name="re-enter"
            value={reenterPassword}
            onChange={(e) => setReenterPassword(e.target.value)}
            error={!!validationMap['re-enter password']}
            helperText={validationMap['re-enter password']}
            variant="outlined"
          />
        </p>
        {/* {add input for phone number} */}
        <p>
          <TextField
            label="Phone Number"
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            error={!!validationMap['phoneNumber']}
            helperText={validationMap['phoneNumber']}
            variant="outlined"
          />
        </p>
        <p>
          <TextField
            label="Street Address"
            type="text"
            id="street"
            name="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            error={!!validationMap['street']}
            helperText={validationMap['street']}
            variant="outlined"
            style={{ width: '500px' }}
          />
        </p>
        <p>
          <TextField
            label="City"
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            error={!!validationMap['city']}
            helperText={validationMap['city']}
            variant="outlined"
          />
        </p>
        <p>
          <TextField
            label="Zipcode"
            type="text"
            id="zip"
            name="zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            error={!!validationMap['zip']}
            helperText={validationMap['zip']}
            variant="outlined"
          />
        </p>
        <p>
          <TextField
            label="State"
            type="text"
            id="state"
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            error={!!validationMap['state']}
            helperText={validationMap['state']}
            variant="outlined"
          />
        </p>
        <p>
          {/* <TextField
            label="Allergies"
            type="text"
            id="allergies"
            name="allergies"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            error={!!validationMap['allergies']}
            helperText={!!validationMap['allergies']}
            variant="outlined"
          /> */}
          <InputLabel>Allergies</InputLabel>
          <Select
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            style={{ width: '200px' }}
          >
            <MenuItem value={'Eggs'}>Eggs</MenuItem>
            <MenuItem value={'Nuts'}>Nuts</MenuItem>
            <MenuItem value={'Dairy'}>Dairy</MenuItem>
            <MenuItem value={'Shellfish'}>Shellfish</MenuItem>
            <MenuItem value={'Fish'}>Fish</MenuItem>
            <MenuItem value={'Soy'}>Soy</MenuItem>
            <MenuItem value={'Dairy'}>Dairy</MenuItem>
            <MenuItem value={'Wheat'}>Wheat</MenuItem>
          </Select>
        </p>
        {is_cook === 'true' && (
          <div>
            <p>
              <TextField
                label="Years of Experience"
                type="number"
                id="experience"
                name="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                error={!experience}
                helperText={
                  experience
                    ? ''
                    : 'Let your eaters know if you are a novice cook or a MasterChef.'
                }
                variant="outlined"
              />
            </p>
            <p>
              <TextField
                label="Kitchen Name"
                type="text"
                id="kitchenName"
                name="kitchenName"
                value={kitchenName}
                onChange={(e) => setKitchenName(e.target.value)}
                error={!kitchenName}
                helperText={
                  kitchenName ? '' : 'This is the name your eaters will see.'
                }
                variant="outlined"
              />
            </p>
          </div>
        )}
        <p>
          <Input
            type="file"
            id="profile-picture"
            name="profile-picture"
            // value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.files[0])}
            style={{ display: 'none' }}
          />
          <label htmlFor="profile-picture" style={{ border: '1px solid grey' }}>
            Upload a photo
          </label>
          {profilePicture && (
            <img
              src={URL.createObjectURL(profilePicture)}
              style={{ width: '200px', height: '200px' }}
            />
          )}
        </p>
        <button className="sign-up-button" onClick={handleSignup}>
          Sign Up
        </button>
      </form>
    </>
  );
};

export default Signup;
