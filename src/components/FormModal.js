import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import SearchInput from "./SearchInput";
import { DatePicker } from "@mui/x-date-pickers";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import apiService from "../app/apiService";
import Joi from "joi";
import moment from "moment";

const initial_form = {
  interest_type: "",
  product: "",
  description: "",
  price: 0,
  release_date: "",

  size: "",
  style: "",
};

export default function FormModal({
  open,
  handleClose,
  mode,
  selectedCar,
  modalKey,
  refreshData,
}) {
  const [form, setForm] = useState(initial_form);
  const [errors, setErrors] = useState({});
  const schema = Joi.object({
    interest_type: Joi.string().valid("Mobile", "Laptop", "Bike").required(),
    product: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().integer().min(1000).required(),
    release_date: Joi.number()
      .integer()
      .min(1900)
      .max(new Date().getFullYear())
      .required(),

    size: Joi.string().valid("Compact", "Midsize", "Large").required(),
    style: Joi.string().required(),
  }).options({ stripUnknown: true, abortEarly: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleEdit = async (newForm) => {
    try {
      await apiService.put(`/car/${selectedCar?._id}`, { ...newForm });
      refreshData();
    } catch (err) {
      console.log(err);
    }
  };
  const handleCreate = async (newForm) => {
    try {
      const res = await apiService.post("/car", { ...newForm });
      refreshData();
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleSubmit = () => {
    const validate = schema.validate(form);
    if (validate.error) {
      const newErrors = {};
      validate.error.details.forEach(
        (item) => (newErrors[item.path[0]] = item.message)
      );
      setErrors(newErrors);
    } else {
      if (mode === "create") handleCreate(validate.value);
      else handleEdit(validate.value);
      // handleClose();
    }
  };
  useEffect(() => {
    if (selectedCar?._id) {
      setErrors({});
      setForm(selectedCar);
    } else setForm(initial_form);
  }, [selectedCar]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} key={modalKey}>
      <Dialog
        open={open}
        onClose={() => {
          handleClose();
          setErrors({});
        }}
      >
        <DialogTitle>
          {mode === "create" ? "CREATE A NEW CONTRACT" : "EDIT CONTRACT"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <SearchInput handleSubmit={handleSubmit} />

            <FormControl
              error={errors.product_type}
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
            >
              <InputLabel id="product_type_label">Product Type</InputLabel>
              <Select
                labelId="product_type_label"
                name="product_type"
                value={form.product_type}
                onChange={handleChange}
                label="Product Type"
              >
                {["Mobile", "Laptop", "Bike"].map((item) => (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              {errors.product_type ? (
                <FormHelperText>{errors.product_type}</FormHelperText>
              ) : null}
            </FormControl>
            <TextField
              error={errors.product}
              helperText={errors.product ? errors.product : null}
              value={form.product}
              autoFocus
              margin="dense"
              name="product"
              label="Product"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              error={errors.description}
              helperText={errors.description ? errors.description : null}
              value={form.description}
              onChange={handleChange}
              autoFocus
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              value={form.price}
              onChange={handleChange}
              error={errors.price}
              helperText={errors.price ? errors.price : null}
              margin="dense"
              name="price"
              label="Price"
              type="number"
              variant="standard"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>
            {mode === "create" ? "Create" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
