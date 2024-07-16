import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BarChart from "../components/BarChart";
import { Typography, Box, Container } from "@mui/material";
import CardDashboard from "../components/CardDashboard";
import Grid from "@mui/material/Grid";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { Button, CardActionArea, CardActions } from "@mui/material";
import { getContractListAsync } from "../features/contract/contractSlice";
import { getCustomerListAsync } from "../features/customer/customerSlice";

function DashboardPage() {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    contractsById,
    currentPageContracts,
    count: totalContracts,
  } = useSelector((state) => state.contract);

  const contracts = currentPageContracts.map(
    (contractId) => contractsById[contractId]
  );

  // getContractListAsync
  useEffect(() => {
    dispatch(
      getContractListAsync({
        page: page + 1,
        limit: rowsPerPage,
        name: filterName,
      })
    );
  }, [dispatch]);

  const {
    customersById,
    currentPageCustomers,
    count: totalCustomers,
  } = useSelector((state) => state.customer);
  console.log(customersById);
  console.log(currentPageCustomers);
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
  }, [dispatch]);
  return (
    <Container>
      <Typography marginTop={10}></Typography>
      <Box height={30} />
      <Box sx={{ display: "flex", flexGrow: 1, p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CardDashboard customers={customers} contracts={contracts} />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={12}>
            <BarChart />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default DashboardPage;
