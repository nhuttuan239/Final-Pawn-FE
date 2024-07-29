import React, { useEffect, useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Divider from "@mui/material/Divider";

import { Stack, Typography } from "@mui/material";
import apiService from "../../app/apiService";

import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { createContract, updateContract } from "./contractSlice";

const FormModalContract = ({
  open,
  handleClose,
  mode,
  selectedContract,
  refreshData,
}) => {
  const defaultValues = {
    fullname: selectedContract ? selectedContract.customerName : "",
    phone: selectedContract ? selectedContract.customerPhone : "",
    nationalId: selectedContract ? selectedContract.customerNationalId : "",
    address: selectedContract ? selectedContract.customerAddress : "",
    interestType: selectedContract ? selectedContract.interestType : "",
    product: selectedContract ? selectedContract.product : "",
    description: selectedContract ? selectedContract.description : "",
    price: selectedContract ? selectedContract.price : "",
  };
  console.log(selectedContract);
  console.log(defaultValues);
  const [data, setData] = useState(defaultValues);
  console.log(data);

  const [customerOptions, setCustomerOptions] = useState([]);
  // const [selectedCustomer, setSelectedCustomer] = useState(null);

  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Customer name is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^[0-9]{10}$/, "Phone is valid"),
    address: Yup.string().required("CustomerAddress is required"),

    nationalId: Yup.number().required("NationalID must be number"),

    product: Yup.string().required("Product Name is required"),
    productType: Yup.string().required("Product Type is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price is Positive"),
  });

  const {
    control,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  //------Search Customers--------------//

  // const handleCustomerSearch = async (event, value) => {
  //   if (value.length > 0) {
  //     try {
  //       const response = await apiService.get(`/customers?q=${value}`);
  //       console.log(response.data.customers);
  //       setCustomerOptions(response.data.customers.slice(0, 5));
  //     } catch (error) {
  //       console.error("Error fetching customers:", error);
  //     }
  //   } else {
  //     setCustomerOptions([]);
  //   }
  // };

  // const handleCustomerSelect = (event, newValue, value) => {
  //   setSelectedCustomer(newValue);
  //   if (newValue) {
  //     setValue("fullname", newValue.fullname);
  //     setValue("phone", newValue.phone);
  //     setValue("address", newValue.address);
  //     setValue("nationalId", newValue.nationalId);
  //     // setData({
  //     //   ...data,
  //     //   fullname: newValue.fullname,
  //     //   phone: newValue.phone,
  //     //   address: newValue.address,
  //     //   nationalId: newValue.nationalId,
  //     // });
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // const handleChangeSelect = (event) => {
  //   setProductType(event.target.value);
  // };

  const handleEdit = async (data) => {
    dispatch(
      updateContract({
        ...data,
        contractId: selectedContract._id,
      })
    );
  };

  const handleCreate = async (data) => {
    dispatch(createContract(data));
  };

  const handleSubmit = () => {
    if (mode === "create") handleCreate(data);
    else handleEdit(data);
    handleClose();
  };

  useEffect(() => {
    if (selectedContract?._id) {
      setData(selectedContract);
    } else setData(defaultValues);
  }, [selectedContract]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...modalStyle }}>
        <h2 id="modal-modal-title" color="primary" variant="h5">
          {mode === "create"
            ? "Create a new Contract"
            : `Update info ${selectedContract?.cnumber}`}
        </h2>
        <form>
          {/*   
          <Autocomplete
            freeSolo
            options={customerOptions}
            getOptionLabel={(option) => `${option.fullname} - ${option.phone}`}
            onInputChange={handleCustomerSearch}
            onChange={handleCustomerSelect}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Customer"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            )}
          />
        */}

          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Stack spacing={0.5}>
                <Typography>Customer Name</Typography>
                <Controller
                  name="fullname"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      value={data.fullname}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={Boolean(errors.fullname)}
                      helperText={errors.fullname?.message}
                      onChange={handleChange}
                    />
                  )}
                />
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack spacing={0.5}>
                <Typography>Customer Phone</Typography>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      value={data.phone}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={Boolean(errors.phone)}
                      helperText={errors.phone?.message}
                      onChange={handleChange}
                    />
                  )}
                />
              </Stack>
            </Grid>

            <Grid item xs={8}>
              <Stack spacing={0.5}>
                <Typography>Customer Address</Typography>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      value={data.address}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={Boolean(errors.address)}
                      helperText={errors.address?.message}
                      onChange={handleChange}
                    />
                  )}
                />
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack spacing={0.5}>
                <Typography>NationalId</Typography>
                <Controller
                  name="nationalId"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      value={data.nationalId}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={Boolean(errors.nationalId)}
                      helperText={errors.nationalId?.message}
                      onChange={handleChange}
                    />
                  )}
                />
              </Stack>
            </Grid>
          </Grid>
          <Divider />
          {/*----------------Input Product---------------------- */}
          <Typography color="primary" variant="h6" mt={3}>
            Product Info
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Controller
                name="product"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={data.product}
                    label="Product"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.product)}
                    helperText={errors.product?.message}
                    onChange={handleChange}
                  />
                )}
              />
            </Grid>

            <Grid item xs={4}>
              <Box sx={{ minWidth: 400 }} mt={2}>
                <Select
                  name="interestType"
                  labelId="select-product-type"
                  id="demo-simple-select"
                  value={data.productType}
                  label="Product Type"
                  defaultValue={"Mobile"}
                  onChange={handleChange}
                >
                  <MenuItem value={"Mobile"}>Mobile</MenuItem>
                  <MenuItem value={"Laptop"}>Laptop</MenuItem>
                  <MenuItem value={"Bike"}>Bike</MenuItem>
                </Select>
              </Box>
            </Grid>

            <Grid item xs={8}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={data.description}
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.description)}
                    helperText={errors.description?.message}
                    onChange={handleChange}
                  />
                )}
              />
            </Grid>

            <Grid item xs={4}>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={data.price}
                    label="Price"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.price)}
                    helperText={errors.price?.message}
                    onChange={handleChange}
                  />
                )}
              />
            </Grid>
          </Grid>
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
        </form>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default FormModalContract;
