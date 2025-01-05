import React, { useEffect, useState } from "react";
import SelectBuyers from "./SelectBuyers";
import { Button, Chip, Grid, InputLabel, Stack, TextField } from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

export default function Benefits() {
  const [benefits, setBenefits] = useState(0); // For total benefits
  const [dateFrom, setDateFrom] = useState(""); // Start date
  const [dateTo, setDateTo] = useState(""); // End date

  // Fetch the total benefits whenever dateFrom or dateTo changes
  useEffect(() => {
    const loadBenefits = () => {
      if (!dateFrom || !dateTo) {
        console.log("Please provide both Date Start and Date Delay.");
        return;
      }

      try {
        console.log("Fetching benefits for dates:", dateFrom, dateTo);
        const totalBenefits = window.sqlite.personDB?.calculateTotalBenefit(dateFrom, dateTo);
        setBenefits(totalBenefits);
      } catch (err) {
        console.error("Error calculating total benefits:", err);
        alert("Failed to calculate total benefits. Please check your inputs.");
      }
    };

    loadBenefits();
  }, [dateFrom, dateTo]); // Dependency array ensures this runs whenever dateFrom or dateTo changes

  return (
    <div>
      <Grid container spacing={2} mt={3}>
        <Grid item xs={6} md={6}>
          <InputLabel htmlFor="outlined-basic1">Date Start</InputLabel>
          <TextField
            id="outlined-basic1"
            variant="outlined"
            type="date"
            fullWidth
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <InputLabel htmlFor="outlined-basic2">Date Delay</InputLabel>
          <TextField
            id="outlined-basic2"
            variant="outlined"
            type="date"
            fullWidth
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </Grid>
      </Grid>

{
  dateFrom !== "" && dateTo !== "" && (
    <Grid container spacing={2} mt={3}>
        <Grid item xs={4} md={4}>
          <h1>All Benefits</h1>
          <Stack direction="row" spacing={1}>
            <Chip
              label={`${benefits} DA`}
              color={benefits < 0 ? "warning" : "success"}
            />
          </Stack>
        </Grid>
        <Grid item xs={4} md={8}>
          <h1>Buyers Benefits</h1>
          <SelectBuyers dateFrom={dateFrom} dateTo={dateTo} />
        </Grid>
      </Grid>
  )
}
      
    </div>
  );
}
