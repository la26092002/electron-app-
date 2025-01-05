import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useDataContext } from "../../Context/DataContext";
import SelectProductsFilter from "../Products/SelectProductsFilter";
import ProductTable from "../Products/ProductTable";

export const Filter = () => {
  const [buyerId, setBuyerId] = React.useState("");
  const [buyerName, setBuyerName] = React.useState("");


  const [ID, setID] = React.useState("");

  const { state, dispatch } = useDataContext();

  const handleChangeCat = (event) => {
    const selectedBuyer = state.Buyers.find((buyer) => buyer.id === event.target.value);
    setBuyerId(selectedBuyer?.id || null);
    setBuyerName(selectedBuyer?.name || "");
  };

  const handleChangeID = (event) => {
    setID(event.target.value);
  };

  const handleSearch = async () => {
    console.log(ID,buyerId)
    if (Number(ID)>0) {
      dispatch({ type: "setResearchProductId", payload: Number(ID) });
    } else if (Number(buyerId)>0) {
      dispatch({ type: "setResearchBuyerId", payload: Number(buyerId) });
    }
  
    setBuyerId("")
    setBuyerName("")
    setID("")
    console.log(state.research)
    
  };
  



  return (
    <>
      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} md={8}>
          <TextField
            id="outlined-basic"
            label="ID"
            variant="outlined"
            onChange={handleChangeID}
            value={ID}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Button
            onClick={handleSearch}
            variant="outlined"
            style={{ height: "100%" }}
            fullWidth
          >
            Search By ID
          </Button>
        </Grid>

        <Grid item xs={12} md={8}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Buyer</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={buyerId}
              label="buyer"
              onChange={handleChangeCat}
            >
              {state.Buyers.map((row) => (
                <MenuItem key={row.id} value={row.id}>
                  {row.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <Button
            onClick={handleSearch}
            variant="outlined"
            style={{ height: "100%" }}
            fullWidth
          >
            Search By Buyer
          </Button>
        </Grid>
      </Grid>
      <ProductTable buyerId={buyerId} />
      {
        //<SelectProductsFilter />
      }

    </>
  );
};
