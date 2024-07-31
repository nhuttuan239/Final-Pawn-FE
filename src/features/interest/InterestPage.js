import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInterestListAsync } from "./interestSlice";

import InterestTable from "./InterestTable";
import { LoadingButton } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";

import { Box, Fab, Card, Container, Stack, Typography } from "@mui/material";
import FormModalInterest from "./FormModalInterest";
import ConfirmModalInterest from "./ConfirmModalInterest";

function InterestPage() {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState(null);
  const [mode, setMode] = useState("create");
  const dispatch = useDispatch();

  const handleClickNew = () => {
    setMode("create");
    setOpenForm(true);
  };

  const handleEditInterest = (interest) => {
    setMode("edit");
    setOpenForm(true);
    setSelectedInterest(interest);
  };
  const handleDeleteInterest = (interest) => {
    setOpenConfirm(true);
    setSelectedInterest(interest);
  };

  const {
    interestsById,
    currentPageInterests,
    count: totalInterest,
  } = useSelector((state) => state.interest);

  const interests = currentPageInterests.map(
    (interestId) => interestsById[interestId]
  );

  // getInterestListAsync
  useEffect(() => {
    dispatch(
      getInterestListAsync({
        page: page + 1,
        limit: rowsPerPage,
      })
    );
  }, [rowsPerPage, page, dispatch]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3, mt: 10 }} color="primary">
        Interest Manager
      </Typography>
      <ConfirmModalInterest
        open={openConfirm}
        selectedInterest={selectedInterest}
        handleClose={() => {
          setOpenConfirm(false);
        }}
      />
      <FormModalInterest
        open={openForm}
        refreshData={() => {
          setOpenForm(false);
          setSelectedInterest(null);
        }}
        selectedInterest={selectedInterest}
        handleClose={() => {
          setOpenForm(false);
          setSelectedInterest(null);
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
        <InterestTable
          handleEditInterest={handleEditInterest}
          handleDeleteInterest={handleDeleteInterest}
          interests={interests}
        />
      </Card>
    </Container>
  );
}

export default InterestPage;
