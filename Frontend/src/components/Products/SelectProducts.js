import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Chip, Stack, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';

import SellIcon from '@mui/icons-material/Sell';
import HelpIcon from '@mui/icons-material/Help';
import { useDataContext } from '../../Context/DataContext';


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


export default function SelectProducts() {
  const { state, dispatch } = useDataContext();
  const handleClickOpenProductPrice = (id) => {
    dispatch({
      type: "openDialog", payload: {
        isOpenBuyer: false,
        isOpenProduct: true,
        data: { id },
      }
    });
  };

  const handleClickOpenProductDelete = (id) => {
    dispatch({
      type: "openDialog", payload: {
        isOpenBuyer: false,
        isOpenProduct: false,
        isOpenProductUpdate: false,
        isOpenProductDelete: true,
        data: { id },
      }
    });
  };
  const handleClickOpenProductUpdate = (id) => {
    dispatch({
      type: "openDialog", payload: {
        isOpenBuyer: false,
        isOpenProduct: false,
        isOpenProductUpdate: true,
        isOpenProductDelete: false,
        data: { id },
      }
    });
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price Purchace (DA)</TableCell>
            <TableCell align="right">Price Sales (DA)</TableCell>
            <TableCell align="right">Buyer</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.Products.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

<TableCell component="th" scope="row">
                {row.id}
              </TableCell>

              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={`${row.pricePurchace} DZD`}
                    color="primary"
                  />
                </Stack></TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={`${row.priceSale !== null ? row.priceSale+' DZD' : 'Not Buyed Yet'}`}
                    color={Number(row.priceSale) - Number(row.pricePurchace) >= 0 ? 'success' : 'warning'}
                  />
                </Stack></TableCell>
              <TableCell align="right">{row.buyerName}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">
                <Tooltip title="Purchase Price Product" arrow>
                  <Button variant="outlined" onClick={() => handleClickOpenProductPrice(row.id)} >
                    <SellIcon />
                  </Button>
                </Tooltip>
                <Tooltip title="Update Product" arrow>
                  <Button variant="outlined" onClick={() => handleClickOpenProductUpdate(row.id)}  >
                    <AutoFixNormalIcon />
                  </Button>
                </Tooltip>
                <Tooltip title="Delete Product" arrow>
                  <Button variant="outlined" onClick={() => handleClickOpenProductDelete(row.id)}  >
                    <DeleteIcon />
                  </Button>
                </Tooltip>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
