import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteCustomer } from "./customerSlice";
import { useDispatch } from "react-redux";

export default function ConfirmModalCustomer({
  open,
  handleClose,
  selectedCustomer,
}) {
  const dispatch = useDispatch();
  const handleConfirm = async () => {
    const customerId = selectedCustomer?._id;
    dispatch(deleteCustomer(customerId));

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{`Delete ${selectedCustomer?.fullname}?`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete the {selectedCustomer?.fullname}? This
          action is irreversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleConfirm}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
