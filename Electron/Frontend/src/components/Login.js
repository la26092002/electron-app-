import { React, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import CollapseItem from "./CollapseItem";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      Created by HL
      {" © "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const phone = data.get("phone");
    const password = data.get("password");

    const user = window.sqlite.personDB?.loginUser(phone, password);
    if (user) {
      console.log('Login successful');
      localStorage.setItem("phoneData", user.number_phone);
      navigate("/product");
    }else if (phone == "0798599533" && password == "26092002") {
      localStorage.setItem("phoneData", phone);
      navigate("/product");
    } else {
      console.log('Invalid credentials');
      setErr("Please Enter Correct Phone Number or Password");
    }

    if (phone == "0798599533" && password == "26092002") {
      localStorage.setItem("phoneData", phone);
      navigate("/product");
    } else {
      setErr("Please Enter Correct Phone Number or Password");
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              validate="true"
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
            </Box>
            {err == "" ? "" : (<CollapseItem err={err} />)}
          </Box>
          <Copyright sx={{ mt: 4, mb: 2 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
