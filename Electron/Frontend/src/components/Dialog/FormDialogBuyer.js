import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDataContext } from '../../Context/DataContext';
import { Alert, Snackbar } from '@mui/material';

export default function FormDialogBuyer() {
  const { state, dispatch } = useDataContext();


  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");
  const [snackbarMessage, setSnackbarMessage] = React.useState("");


  const handleClose = () => {
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
        open={state.Dialog.isOpenBuyer}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const idBuyer = formJson.idBuyer;
            const nameBuyer = formJson.nameBuyer;

            console.log("Data : ", state.Dialog.data?.id)

            if (idBuyer == state.Dialog.data.id) {
              const modifyBuyer = window.sqlite.personDB?.modifyBuyer(state.Dialog.data.id, nameBuyer);
              console.log(idBuyer, nameBuyer);
              dispatch({
                type: "modifyBuyer", payload: {
                  id: state.Dialog.data.id,
                  name: nameBuyer,
                }
              });


              setSnackbarSeverity("success");
      setSnackbarMessage("Buyer data successfully updated!");
            } else {
              console.log("err");

              setSnackbarSeverity("error");
      setSnackbarMessage("Error: Buyer ID does not match.");
            }
            setOpenSnackbar(true);
            handleClose();
          },
        }}
      >
        <DialogTitle>Update Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To modify the buyer's name, please provide the Buyer ID ({state.Dialog.data?.id ? state.Dialog.data.id : 'N/A'}) along with the updated Buyer Name.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="idBuyer"
            name="idBuyer"
            label="Id Buyer"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="nameBuyer"
            name="nameBuyer"
            label="name Buyer"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
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
  )
}
