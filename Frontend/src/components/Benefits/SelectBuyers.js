import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Chip, Stack } from "@mui/material";
import { useDataContext } from "../../Context/DataContext";

export default function SelectBuyers({ dateFrom, dateTo }) {
  const { state, dispatch } = useDataContext();

  // Function to fetch benefits for a buyer
  const getBuyerBenefits = (buyerId) => {
    if (!dateFrom || !dateTo) {
      return "N/A"; // Display "N/A" if date range is not provided
    }

    try {
      const benefit = window.sqlite.personDB?.calculateTotalBenefitByBuyer(buyerId, dateFrom, dateTo);
      return benefit || 0; // Default to 0 if no value
    } catch (err) {
      console.error(`Error calculating benefits for buyer ${buyerId}:`, err);
      return "Error"; // Display "Error" if calculation fails
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Benefits</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.Buyers.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell component="th" scope="row">
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={`${getBuyerBenefits(row.id)} DA`}
                    color={
                      getBuyerBenefits(row.id) < 0 ? "warning" : "success"
                    }
                  />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
