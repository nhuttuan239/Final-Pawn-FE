import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteUser } from "./userSlice";
import { useDispatch } from "react-redux";

export default function ConfirmModalUser({ open, handleClose, selectedUser }) {
  const dispatch = useDispatch();
  const handleConfirm = async () => {
    const userId = selectedUser?._id;
    dispatch(deleteUser(userId));

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{`Delete ${selectedUser?.username}?`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete the {selectedUser?.username}? This
          action is irreversible.
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
