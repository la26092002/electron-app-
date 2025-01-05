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
import PersonIcon from '@mui/icons-material/Person';
import { useDataContext } from '../../Context/DataContext';



export default function SelectBuyers() {
  const { state, dispatch } = useDataContext();

  const handleClickOpen = (id) => {
    dispatch({
      type: "openDialog", payload: {
        isOpenBuyer: true,
        isOpenProduct: false,
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
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.Buyers.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Help" arrow>
                  <Button variant="outlined" onClick={() => handleClickOpen(row.id)} startIcon={<PersonIcon />}>
                    Update
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
