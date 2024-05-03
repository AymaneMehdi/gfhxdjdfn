import React, { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { loginFailure } from '../../posts/redux/Actions/login_Type';
import { loginSuccess } from '../../posts/redux/Actions/login_Type';
import CustomTextField from "../../../components/forms/theme-elements/CustomTextField";
import { useDispatch } from 'react-redux';

const AuthLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://back-end-k1r6.onrender.com/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  
      const data = await response.json();
      // Assuming data contains the token
      const token = data.token;
      
      // Store token securely
      localStorage.setItem('token', token);
  
      // Dispatch login success action
      dispatch(loginSuccess(token));
      
      // Navigate to the desired page
      navigate("/all-posts");
    } catch (error) {
      // Set error message based on the type of error
      let errorMessage = "Something went wrong. Please try again later.";
      if (error instanceof TypeError) {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (error.message === "Unauthorized") {
        errorMessage = "Invalid email or password.";
      }
      setErrorMessage(errorMessage);
      
      // Dispatch login failure action
      dispatch(loginFailure(errorMessage));
    }
  };


  return (
    <>

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
          >
            Email
          </Typography>
          <CustomTextField
            id="email"
            variant="outlined"
            fullWidth  
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Mot de passe
          </Typography>
          <CustomTextField
            id="password"
            type="password"
            variant="outlined"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        ></Stack>
      </Stack>
      {errorMessage && <span className="text-red-500">{errorMessage}</span>}
      <Box>
      <Button
  color="primary"
  variant="contained"
  size="large"
  fullWidth
  component={Link}
  to="/"
  type="button"
  onClick={handleSubmit}
  style={{ backgroundColor: '#003566', color: 'white' }} // Adding style attributes
>
  Se connecter
</Button>
      </Box>

    </>
  );
};

export default AuthLogin;
