import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserListAsync } from "./userSlice";

import UsersTable from "./UsersTable";
import { LoadingButton } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";

import { Box, Fab, Card, Container, Stack, Typography } from "@mui/material";
import FormModalUser from "./FormModalUser";
import ConfirmModalUser from "./ConfirmModalUser";

function UserPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [mode, setMode] = useState("create");
  const dispatch = useDispatch();

  const handleClickNew = () => {
    setMode("create");
    setOpenForm(true);
  };

  const handleEditUser = (user) => {
    setMode("edit");
    setOpenForm(true);
    setSelectedUser(user);
  };
  const handleDeleteUser = (user) => {
    setOpenConfirm(true);
    setSelectedUser(user);
  };

  const {
    users,
    usersById,
    currentPageUsers,
    count: totalUsers,
  } = useSelector((state) => state.user);

  // getUserListAsync
  useEffect(() => {
    dispatch(
      getUserListAsync({
        page: page + 1,
        limit: rowsPerPage,
      })
    );
  }, [rowsPerPage, page, dispatch]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3, mt: 10 }} color="primary">
        User Manager
      </Typography>
      <ConfirmModalUser
        open={openConfirm}
        selectedUser={selectedUser}
        handleClose={() => {
          setOpenConfirm(false);
        }}
      />
      <FormModalUser
        open={openForm}
        refreshData={() => {
          setOpenForm(false);
          setSelectedUser(null);
        }}
        selectedUser={selectedUser}
        handleClose={() => {
          setOpenForm(false);
          setSelectedUser(null);
        }}
        mode={mode}
        users={users}
      />
      <Card>
        <Stack spacing={2}>
          <Stack spacing={3}>
            <Box
              sx={{
                display: "flex",
                alignItem: "center",
                justifyContent: "flex-start",
              }}
            >
              <Fab
                variant="extended"
                color="primary"
                onClick={handleClickNew}
                aria-label="add"
                sx={{ mb: 3 }}
              >
                <AddIcon />
                Add New
              </Fab>
            </Box>
          </Stack>
        </Stack>
        <UsersTable
          users={users}
          handleEditUser={handleEditUser}
          handleDeleteUser={handleDeleteUser}
        />
      </Card>
    </Container>
  );
}

export default UserPage;
