import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import UserPage from "../features/user/UserPage";
import CustomerPage from "../features/customer/CustomerPage";

import NotFoundPage from "../pages/NotFoundPage";
import MainLayout from "../layouts/MainLayout";
import BlankLayout from "../layouts/BlankLayout";
import AuthRequire from "./AuthRequire";
import DashboardPage from "../pages/DashboardPage";
import ContractPage from "../features/contract/ContractPage";
import InterestPage from "../features/interest/InterestPage";
import PaymentPage from "../features/contract/PaymentPage";
import CheckPage from "../pages/CheckPage";
import {
  UserManagement,
  ContractManagement,
  CustomerManagement,
  InterestManagement,
} from "./managementRole";

function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route index element={<DashboardPage />} />

        <Route
          path="user"
          element={
            <UserManagement>
              <UserPage />
            </UserManagement>
          }
        />
        <Route
          path="contract"
          element={
            <ContractManagement>
              <ContractPage />
            </ContractManagement>
          }
        />
        <Route
          path="customer"
          element={
            <CustomerManagement>
              {" "}
              <CustomerPage />
            </CustomerManagement>
          }
        />
        <Route
          path="interest"
          element={
            <InterestManagement>
              <InterestPage />
            </InterestManagement>
          }
        />
        <Route path="payment/:contractId" element={<PaymentPage />} />
        {/*<Route path="user/:userId" element={<UserProfilePage />} />*/}
      </Route>
      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="check" element={<CheckPage />} />
    </Routes>
  );
}

export default AppRouter;
