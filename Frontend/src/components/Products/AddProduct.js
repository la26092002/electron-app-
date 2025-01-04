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
import SelectProducts from "./SelectProducts";
import { useDataContext } from "../../Context/DataContext";

export const AddProduct = () => {
  const [buyerId, setBuyerId] = React.useState(null);
  const [buyerName, setBuyerName] = React.useState("");
  const [name, setName] = React.useState("");
  const [pricepurchase, setPricepurchase] = React.useState("");
  const [description, setDescription] = React.useState("");

  const { state, dispatch } = useDataContext();

  const handleChangeCat = (event) => {
    const selectedBuyer = state.Buyers.find((buyer) => buyer.id === event.target.value);
    setBuyerId(selectedBuyer?.id || null);
    setBuyerName(selectedBuyer?.name || "");
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangePricePurch = (event) => {
    setPricepurchase(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    let data = {
      title: name,
      pricePurchase: parseFloat(pricepurchase),
      id_buyer: buyerId,
      priceSale: null,
      description: description,
    };
    console.log(data);

    let insertProduct = window.sqlite.personDB?.insertProduct(data.title, data.id_buyer, data.pricePurchase, data.priceSale, data.description);

    let newProduct = {
      id: insertProduct,
      title: data.title,
      id_buyer: data.id_buyer,
      buyerName: buyerName, // Using the captured buyerName
      pricePurchace: data.pricePurchase,
      priceSale: data.priceSale,
      description: data.description,
    };

    dispatch({ type: "addProduct", payload: newProduct });


    setBuyerId(null);
    setBuyerName("");
    setName("");
    setPricepurchase("");
    setDescription("");
  };

  return (
    <>
      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} md={4}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={handleChangeName}
            value={name}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="outlined-basic"
            label="Price Purchace (DA)"
            onChange={handleChangePricePurch}
            value={pricepurchase}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
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
        <Grid item xs={12} md={8}>
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            onChange={handleChangeDescription}
            value={description}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            onClick={handleSubmit}
            variant="outlined"
            style={{ height: "100%" }}
            fullWidth
          >
            Add Product
          </Button>
        </Grid>
      </Grid>

      <SelectProducts />
    </>
  );
};
