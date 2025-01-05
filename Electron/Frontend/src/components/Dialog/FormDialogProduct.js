import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDataContext } from '../../Context/DataContext';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function FormDialogProduct() {
  const { state, dispatch } = useDataContext();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const handleCloseDialog = () => {
    dispatch({ type: "closeDialog" });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Dialog
        open={state.Dialog.isOpenProduct}
        onClose={handleCloseDialog}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const idProduct = formJson.idProduct;
            const priceSale = formJson.priceSale;

            if (idProduct == state.Dialog.data.id) {
              const modifyProductPriceSale = window.sqlite.personDB?.modifyProductPriceSale(state.Dialog.data.id, parseFloat(priceSale));
              console.log(idProduct, priceSale);
              dispatch({
                type: "modifyProductPriceSale", payload: {
                  id: state.Dialog.data.id,
                  priceSale: parseFloat(priceSale)
                }
              });
              setSnackbarSeverity("success");
              setSnackbarMessage("Product price updated successfully!");
            } else {
              setSnackbarSeverity("error");
              setSnackbarMessage("Error: Product ID does not match.");
            }

            setOpenSnackbar(true);
            handleCloseDialog();
          },
        }}
      >
        <DialogTitle>Update Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add the purchase price, please include the Product ID ({state.Dialog.data?.id ? state.Dialog.data.id : 'N/A'}) and the corresponding price details.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="idProduct"
            name="idProduct"
            label="Id Product"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="priceSale"
            name="priceSale"
            label="Price Sale"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button type="submit">Update</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
