import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContractListAsync } from "./contractSlice";

import { ContractTable } from "./ContractTable";

import AddIcon from "@mui/icons-material/Add";

import { Box, Fab, Card, Container, Stack, Typography } from "@mui/material";
import ConfirmModalContract from "./ConfirmModalContract";

import { useNavigate } from "react-router-dom";
import FormModalContract from "./FormModalContract";

function ContractPage() {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [selectedContract, setSelectedContract] = useState(null);
  const [mode, setMode] = useState("create");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickNew = () => {
    setMode("create");
    setOpenForm(true);
  };

  const handlePayContract = (contract) => {
    navigate(`/payment/${contract._id}`);
  };

  const handleEditContract = (contract) => {
    setMode("edit");
    setOpenForm(true);
    setSelectedContract(contract);
  };
  const handleDeleteContract = (contract) => {
    setOpenConfirm(true);
    setSelectedContract(contract);
  };

  const {
    contractsById,
    currentPageContracts,
    count: totalContracts,
  } = useSelector((state) => state.contract);

  const contracts = currentPageContracts.map(
    (contractId) => contractsById[contractId]
  );
  console.log(contracts, totalContracts);

  // getContractListAsync
  useEffect(() => {
    dispatch(
      getContractListAsync({
        page: page + 1,
        limit: rowsPerPage,
        name: filterName,
      })
    );
  }, [filterName, rowsPerPage, page, dispatch]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3, mt: 10 }} color="primary">
        Contract Manager
      </Typography>
      <ConfirmModalContract
        open={openConfirm}
        selectedContract={selectedContract}
        handleClose={() => {
          setOpenConfirm(false);
        }}
      />
      <FormModalContract
        open={openForm}
        refreshData={() => {
          setOpenForm(false);
          setSelectedContract(null);
        }}
        selectedContract={selectedContract}
        handleClose={() => {
          setOpenForm(false);
          setSelectedContract(null);
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
        <ContractTable
          handlePayContract={handlePayContract}
          handleEditContract={handleEditContract}
          handleDeleteContract={handleDeleteContract}
          contracts={contracts}
        />
      </Card>
    </Container>
  );
}

export default ContractPage;
