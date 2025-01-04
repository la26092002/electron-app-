import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useDataContext } from "../Context/DataContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { dispatch } = useDataContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure sqlite methods are available before accessing them
    if (window.sqlite?.personDB) {
      const buyers = window.sqlite.personDB.readAllBuyers() || [];
      const products = window.sqlite.personDB.readAllProducts() || [];

      dispatch({ type: "getBuyers", payload: buyers });
      dispatch({ type: "getProducts", payload: products });

      // Only navigate if needed
      navigate("/product");
    } else {
      console.error("sqlite.personDB is not initialized");
    }
  }, [navigate,dispatch]);

  return (
    <Box
      sx={{
        mt: 10,
        mx: "auto",
        maxWidth: "90%",
        textAlign: "center",
      }}
    >
      <Grid container spacing={4} sx={{ mt: 4 }}>
        loading ...
      </Grid>
    </Box>
  );
}
