import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useAuth from "../../hooks/useAuth";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import { createCustomer, updateCustomer } from "./customerSlice";

import { Stack } from "@mui/material";
import Joi from "joi";
import moment from "moment";
import apiService from "../../app/apiService";

export default function FormModalCustomer({
  open,
  handleClose,
  mode,
  selectedCustomer,
  modalKey,
  refreshData,
}) {
  console.log(selectedCustomer);
  const initial_form = {
    fullname: selectedCustomer ? selectedCustomer.fullname : "",
    phone: selectedCustomer ? selectedCustomer.phone : "",
    nationalId: selectedCustomer ? selectedCustomer.nationalId : "",
    address: selectedCustomer ? selectedCustomer.address : "",
    createBy: selectedCustomer ? selectedCustomer.createBy : "",
  };

  const [form, setForm] = useState(initial_form);
  const [errors, setErrors] = useState({});
  const { user } = useAuth();
  const dispatch = useDispatch();
  const schema = Joi.object({
    fullname: Joi.string().required("Full name require"),
    phone: Joi.string().required(),
    nationalId: Joi.string(),
    address: Joi.string(),
  }).options({ stripUnknown: true, abortEarly: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value, createBy: user._id });
  };
  const handleEdit = async (form) => {
    dispatch(
      updateCustomer({
        ...form,
        customerId: selectedCustomer._id,
      })
    );
  };

  const handleCreate = async (form) => {
    dispatch(createCustomer(form));
  };
  const handleSubmit = () => {
    if (mode === "create") handleCreate(form);
    else handleEdit(form);
    handleClose();
  };

  // const handleSubmit = () => {
  //   const validate = schema.validate(form);

  //   if (validate.error) {
  //     const newErrors = {};
  //     validate.error.details.forEach(
  //       (item) => (newErrors[item.path[0]] = item.message)
  //     );
  //     setErrors(newErrors);
  //   } else {
  //     if (mode === "create") handleCreate(validate.value);
  //     else handleEdit(validate.value);
  //     // handleClose();
  //   }
  // };
  useEffect(() => {
    if (selectedCustomer?._id) {
      setErrors({});
      setForm(selectedCustomer);
    } else setForm(initial_form);
  }, [selectedCustomer]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} key={modalKey}>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={() => {
          handleClose();
          setErrors({});
        }}
      >
        <DialogTitle color="primary">
          {mode === "create"
            ? "Create a new Customer"
            : `Update info ${selectedCustomer?.fullname}`}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              error={errors.fullname}
              helperText={errors.fullname ? errors.fullname : null}
              value={form.fullname}
              autoFocus
              margin="dense"
              name="fullname"
              label="Full Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />

            <TextField
              error={errors.phone}
              helperText={errors.phone ? errors.phone : null}
              value={form.phone}
              autoFocus
              margin="dense"
              name="phone"
              label="Phone"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              error={errors.nationalId}
              helperText={errors.nationalId ? errors.nationalId : null}
              value={form.nationalId}
              onChange={handleChange}
              autoFocus
              margin="dense"
              name="nationalId"
              label="nationalId"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              value={form.address}
              onChange={handleChange}
              error={errors.address}
              helperText={errors.address ? errors.address : null}
              margin="dense"
              name="address"
              label="Address"
              type="text"
              variant="standard"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="warning" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit}
          >
            {mode === "create" ? "Create" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
