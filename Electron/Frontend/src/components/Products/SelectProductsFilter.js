import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpIcon from '@mui/icons-material/Help';
import { useDataContext } from '../../Context/DataContext';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
export default function SelectProductsFilter() {
  const { state, dispatch } = useDataContext();
  const handleClickOpen = (id) => {
    dispatch({
      type: "openDialog", payload: {
        isOpenBuyer: false,
        isOpenProduct: true,
        data: { id },
      }
    });
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell >Price Purchace (DA)</TableCell>
            <TableCell >Buyer</TableCell>
            <TableCell >Description</TableCell>
            <TableCell >Price Sale (DA)</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.FilterProducts.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell >{row.pricePurchace}</TableCell>
              <TableCell >{row.buyerName}</TableCell>
              <TableCell >{row.description}</TableCell>
              <TableCell >
                <Button variant="outlined" color={row.priceSale != null ? "success" : "error"}>
                  {row.priceSale != null ? row.priceSale : "not yet"}
                </Button></TableCell>
              <TableCell align="right">
                <Tooltip title="Help" arrow>
                  <Button variant="outlined" onClick={() => handleClickOpen(row.id)} startIcon={<HelpIcon />}>
                    Help
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
