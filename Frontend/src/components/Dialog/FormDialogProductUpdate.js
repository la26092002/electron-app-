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

export default function FormDialogProductUpdate() {
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
                open={state.Dialog.isOpenProductUpdate}
                onClose={handleCloseDialog}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const idProduct = formJson.idProduct;
                        const title = formJson.title;
                        const pricePurchace = formJson.pricePurchace;
                        const description = formJson.description;

                        if (idProduct == state.Dialog.data.id) {
                            const updateProduct = window.sqlite.personDB?.modifyProduct2(state.Dialog.data.id, title, pricePurchace, description);
                            console.log(idProduct);
                            dispatch({
                                type: "modifyProduct", payload: {
                                    id: state.Dialog.data.id,
                                    title, pricePurchace, description
                                }
                            });
                            setSnackbarSeverity("success");
                            setSnackbarMessage("Product updated successfully!");
                        } else {
                            setSnackbarSeverity("error");
                            setSnackbarMessage("Error: Product ID does not match.");
                        }

                        setOpenSnackbar(true);
                        handleCloseDialog();
                    },
                }}
            >
                <DialogTitle>Update Product</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To update the product, please include the Product ID ({state.Dialog.data?.id ? state.Dialog.data.id : 'N/A'}) and the new product details.
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
                        required
                        margin="dense"
                        id="title"
                        name="title"
                        label="Title Product"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="pricePurchace"
                        name="pricePurchace"
                        label="Purchase Price Product"
                        type="number"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description Product"
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
