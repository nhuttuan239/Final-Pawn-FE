import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerListAsync } from "./customerSlice";

import CustomersTable from "./CustomersTable";
import { LoadingButton } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";

import { Box, Fab, Card, Container, Stack, Typography } from "@mui/material";
import FormModalCustomer from "./FormModalCustomer";
import ConfirmModalCustomer from "./ConfirmModalCustomer";

function CustomerPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [mode, setMode] = useState("create");
  const dispatch = useDispatch();

  const handleClickNew = () => {
    setMode("create");
    setOpenForm(true);
  };

  const handleEditCustomer = (customer) => {
    setMode("edit");
    setOpenForm(true);
    setSelectedCustomer(customer);
  };
  const handleDeleteCustomer = (customer) => {
    setOpenConfirm(true);
    setSelectedCustomer(customer);
  };

  const {
    customersById,
    currentPageCustomers,
    count: totalCustomers,
  } = useSelector((state) => state.customer);

  const customers = currentPageCustomers.map(
    (customerId) => customersById[customerId]
  );
  console.log(customers);

  // getCustomerListAsync
  useEffect(() => {
    dispatch(
      getCustomerListAsync({
        page: page + 1,
        limit: rowsPerPage,
      })
    );
  }, [rowsPerPage, page, dispatch]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3, mt: 10 }} color="primary">
        Customer Manager
      </Typography>
      <ConfirmModalCustomer
        open={openConfirm}
        selectedCustomer={selectedCustomer}
        handleClose={() => {
          setOpenConfirm(false);
        }}
      />
      <FormModalCustomer
        open={openForm}
        refreshData={() => {
          setOpenForm(false);
          setSelectedCustomer(null);
        }}
        selectedCustomer={selectedCustomer}
        handleClose={() => {
          setOpenForm(false);
          setSelectedCustomer(null);
        }}
        mode={mode}
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
        <CustomersTable
          handleEditCustomer={handleEditCustomer}
          handleDeleteCustomer={handleDeleteCustomer}
          customers={customers}
        />
      </Card>
    </Container>
  );
}

export default CustomerPage;
