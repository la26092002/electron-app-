import React, { useState,useEffect ,useCallback} from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
//import { AddCategory } from "../../Fetch";
import SelectBuyers from "./SelectBuyers";
import { useDataContext } from "../../Context/DataContext";
import PieActiveArc from "./PieActiveArc";



const Buyers = () => {
  const { state, dispatch } = useDataContext();

  const [name, setName] = useState("")
  
  const handleClickAddCat = () =>{
    if (!name ) return 
  
    let insertBuyer = window.sqlite.personDB?.insertBuyer(name);
    //insertBuyer is func that insert buyer and return the last id which inserted now  
    //console.log(insertBuyer)
    let newBuyer = {
      id:insertBuyer,
      name
    }
    
    dispatch({ type: "addBuyer", payload: newBuyer });
    setName("")
  }

  return (
    <>
      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} md={6}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={(e)=> setName(e.target.value)}
            value={name}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button onClick={handleClickAddCat} variant="outlined" style={{ height: "100%" }} fullWidth>
            Add Buyer
          </Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <SelectBuyers  />
        </Grid>
        <Grid item xs={12} md={6}>
          <PieActiveArc />
        </Grid>
      </Grid>
    </>
  );
};

export default Buyers;
