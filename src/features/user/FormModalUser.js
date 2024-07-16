import React, { useEffect, useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import useAuth from "../../hooks/useAuth";

import { Stack, Typography } from "@mui/material";
import apiService from "../../app/apiService";

import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { createUser, updateUser } from "./userSlice";

const FormModalUser = ({
  open,
  handleClose,
  mode,
  selectedUser,
  refreshData,
  users,
}) => {
  const defaultValues = {
    username: selectedUser ? selectedUser.username : "",
    email: selectedUser ? selectedUser.email : "",
    password: selectedUser ? selectedUser.password : "",
    role: selectedUser ? selectedUser.role : "",
    description: selectedUser ? selectedUser.description : "",
    reportTo: selectedUser ? selectedUser.reportTo : "",
  };

  const [data, setData] = useState(defaultValues);

  const [selectedManager, setSelectedManager] = useState("");
  const handleChangeManager = (event) => {
    setSelectedManager(event.target.value);
  };

  const managers = users.filter((employee) => employee.role === "Manager");
  const admins = users.filter((employee) => employee.role === "Admin");
  console.log(admins);
  console.log(data);
  const { user } = useAuth();

  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required"),
    role: Yup.string().required("Role is required"),
    description: Yup.string().required("Description is required"),
    reportTo: Yup.string().required("reportTo is required"),
  });

  const {
    control,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleEdit = async (data) => {
    dispatch(
      updateUser({
        ...data,
        userId: selectedUser._id,
      })
    );
  };

  const handleCreate = async (data) => {
    dispatch(createUser(data));
  };

  const handleSubmit = () => {
    if (mode === "create") handleCreate(data);
    else handleEdit(data);
    handleClose();
  };

  useEffect(() => {
    if (selectedUser?._id) {
      setData(selectedUser);
    } else setData(defaultValues);
  }, [selectedUser]);

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
            ? "Create a new User"
            : `Update info ${selectedUser?.username}`}
        </h2>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Stack spacing={0.5}>
                <Typography>Username</Typography>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      value={data.username}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={Boolean(errors.username)}
                      helperText={errors.username?.message}
                      onChange={handleChange}
                    />
                  )}
                />
              </Stack>
            </Grid>

            <Grid item xs={6}>
              <Stack spacing={0.5}>
                <Typography>Password</Typography>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      value={data.password}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={Boolean(errors.password)}
                      helperText={errors.password?.message}
                      onChange={handleChange}
                    />
                  )}
                />
              </Stack>
            </Grid>

            <Grid item xs={8}>
              <Stack spacing={0.5}>
                <Typography>Email</Typography>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      value={data.email}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
                      onChange={handleChange}
                    />
                  )}
                />
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack spacing={0.5}>
                <Typography>Role</Typography>
                <Box mt={3.5}>
                  <Select
                    name="role"
                    labelId="select-role"
                    id="demo-simple-select"
                    value={data.role}
                    label="Role"
                    defaultValue={"Employee"}
                    onChange={handleChange}
                    sx={{ minWidth: 150 }}
                  >
                    <MenuItem value={"Employee"}>Employee</MenuItem>
                    <MenuItem value={"Manager"}>Manager</MenuItem>
                  </Select>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={8}>
              <Stack spacing={0.5}>
                <Typography>Description</Typography>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      value={data.description}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={Boolean(errors.description)}
                      helperText={errors.description?.message}
                      onChange={handleChange}
                    />
                  )}
                />
              </Stack>
            </Grid>
            {data.role === "Manager" ? (
              <Grid item xs={4}>
                <Stack spacing={0.5}>
                  <Typography>Report to</Typography>

                  <Box mt={3.5}>
                    <Select
                      name="reportTo"
                      labelId="select-reportTo"
                      id="demo-simple-select"
                      value={data.reportTo}
                      onChange={handleChange}
                      sx={{ minWidth: 150 }}
                    >
                      {admins.map((admin) => (
                        <MenuItem value={admin._id}>{admin.username}</MenuItem>
                      ))}
                    </Select>
                  </Box>
                </Stack>
              </Grid>
            ) : (
              data.role === "Employee" && (
                <Grid item xs={4}>
                  <Stack spacing={0.5}>
                    <Typography>Report to</Typography>
                    <Box mt={3.5}>
                      <Select
                        name="reportTo"
                        labelId="select-reportTo"
                        id="demo-simple-select"
                        value={data.reportTo}
                        onChange={handleChange}
                        sx={{ minWidth: 150 }}
                      >
                        {managers.map((manager) => (
                          <MenuItem value={manager._id}>
                            {manager.username}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  </Stack>
                </Grid>
              )
            )}
          </Grid>
          <Stack spacing={2} direction="row" mt={3}>
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
          </Stack>
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

export default FormModalUser;
