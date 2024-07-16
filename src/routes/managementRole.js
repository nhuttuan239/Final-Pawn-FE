import React from "react";
import useAuth from "../hooks/useAuth";

import LoadingScreen from "../pages/LoadingScreen";
import CustomerPage from "../features/customer/CustomerPage";
import ContractPage from "../features/contract/ContractPage";
import UserPage from "../features/user/UserPage";
import InterestPage from "../features/interest/InterestPage";
import { Typography } from "@mui/material";

const UserManagement = () => {
  const { user, isInitialized } = useAuth();

  if (!isInitialized) {
    return <LoadingScreen />;
  }
  if (user.role !== "Admin") {
    return (
      <Typography variant="h4" sx={{ ml: 20, mb: 3, mt: 20 }} color="primary">
        Not Authorized
      </Typography>
    );
  }
  return <UserPage />;
};

const ContractManagement = () => {
  const { user, isInitialized } = useAuth();

  if (!isInitialized) {
    return <LoadingScreen />;
  }
  if (user.role !== "Manager" && user.role !== "Employee") {
    return (
      <Typography variant="h4" sx={{ ml: 20, mb: 3, mt: 20 }} color="primary">
        Not Authorized
      </Typography>
    );
  }
  return <ContractPage />;
};

const CustomerManagement = () => {
  const { user, isInitialized } = useAuth();

  if (!isInitialized) {
    return <LoadingScreen />;
  }
  if (user.role !== "Manager") {
    return (
      <Typography variant="h4" sx={{ ml: 20, mb: 3, mt: 20 }} color="primary">
        Not Authorized
      </Typography>
    );
  }
  return <CustomerPage />;
};

const InterestManagement = () => {
  const { user, isInitialized } = useAuth();

  if (!isInitialized) {
    return <LoadingScreen />;
  }
  if (user.role !== "Manager") {
    return (
      <Typography variant="h4" sx={{ ml: 20, mb: 3, mt: 20 }} color="primary">
        Not Authorized
      </Typography>
    );
  }
  return <InterestPage />;
};

export {
  UserManagement,
  ContractManagement,
  CustomerManagement,
  InterestManagement,
};
