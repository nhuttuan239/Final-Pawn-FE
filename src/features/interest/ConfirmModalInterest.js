import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteInterest } from "./interestSlice";
import { useDispatch } from "react-redux";

export default function ConfirmModalInterest({
  open,
  handleClose,
  selectedInterest,
}) {
  const dispatch = useDispatch();
  const handleConfirm = async () => {
    const customerId = selectedInterest?._id;
    dispatch(deleteInterest(customerId));

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{`Delete ${selectedInterest?.interestCode}?`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete the {selectedInterest?.interestCode}?
          This action is irreversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="warning" onClick={handleConfirm} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
