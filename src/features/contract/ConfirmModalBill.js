import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteBill } from "./contractSlice";
import { useDispatch } from "react-redux";
import { getTime, parseISO } from "date-fns";
import numeral from "numeral";

export default function ConfirmModalBill({
  open,
  handleClose,
  selectedBill,
  contractId,
}) {
  const dispatch = useDispatch();
  const handleConfirm = async () => {
    const billId = selectedBill?._id;

    dispatch(deleteBill(billId, contractId));
    console.log(contractId);

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{`Delete Bill ${selectedBill?.payDate}?`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete bill the {selectedBill?.payDate} with{" "}
          {numeral(selectedBill?.payment).format("0,0")} VND? This action is
          irreversible.
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
