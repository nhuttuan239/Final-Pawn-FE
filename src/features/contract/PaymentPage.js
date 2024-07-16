import React from "react";

import { Container, Stack, Typography } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Grid from "@mui/material/Grid";
import { LoadingButton } from "@mui/lab";

import dayjs from "dayjs";
import { format, parseISO, parse } from "date-fns";
import numeral from "numeral";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import {
  createBill,
  getAllBillsAsync,
  getPaymentInfoAsync,
} from "./contractSlice.js";
import BillsTable from "./BillsTable.js";
import ConfirmModalBill from "./ConfirmModalBill.js";

function PaymentPage() {
  const params = useParams();
  const contractId = params.contractId;
  console.log(contractId);

  const dispatch = useDispatch();
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(0);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [payDate, setPayDate] = useState(dayjs(new Date()));

  let typePay;
  const handleInterestPay = async () => {
    typePay = "InterestPay";

    dispatch(createBill(contractId, payDate, typePay));
  };
  const handleTotalPay = async () => {
    typePay = "TotalPay";
    dispatch(createBill(contractId, payDate, typePay));
  };

  const handleDeleteBill = (bill) => {
    setOpenConfirm(true);
    setSelectedBill(bill);
  };

  // getAllBillsAsync
  useEffect(() => {
    dispatch(getAllBillsAsync(contractId));
  }, [page, dispatch]);

  const bills = useSelector((state) => state.contract.bills);
  const billsTableData = bills.bills;

  // getPaymentInfoAsync
  useEffect(() => {
    dispatch(getPaymentInfoAsync(contractId, payDate));
  }, [filterName, payDate, page, dispatch]);

  // Set State
  const selectedPayment = useSelector(
    (state) => state.contract.selectedPayment
  );

  const formatPayDate = selectedPayment?.createDate;
  console.log(formatPayDate);
  // const convertPayDate = format(parseISO(formatPayDate), "dd/MM/yyyy");
  // console.log(convertPayDate);
  const onChange = (date) => {
    setPayDate(date);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3, mt: 10 }} color="primary">
        Payment Page
      </Typography>
      <ConfirmModalBill
        open={openConfirm}
        selectedBill={selectedBill}
        contractId={contractId}
        handleClose={() => {
          setOpenConfirm(false);
        }}
      />
      <Typography marginLeft={20}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color="primary"
            >
              Payment for {selectedPayment.cnumber} - {selectedPayment.customer}
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <WorkIcon />
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                      primary="Create Date"
                      secondary={`${selectedPayment.createDate}`}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <BeachAccessIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Number for days to Pay"
                      secondary={`${selectedPayment.totalDaysForPay} day`}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <BeachAccessIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Price"
                      secondary={`${numeral(selectedPayment.price).format(
                        "0,0"
                      )} VND`}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <BeachAccessIcon />
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                      sx={{ fontSize: 16 }}
                      primary="Interest Rate"
                      secondary={numeral(selectedPayment.interestRate).format(
                        "0%"
                      )}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={6}>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Pay Date" />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        onChange={(date) => {
                          onChange(date?.isValid ? date : null);
                        }}
                        value={payDate || null}
                        format="DD/MM/YYYY"
                        defaultValue={dayjs(new Date())}
                      />
                    </LocalizationProvider>
                  </ListItem>

                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <BeachAccessIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <Typography>
                      <Typography color="primary" variant="h6">
                        Interest Pay
                      </Typography>
                      <Typography sx={{ fontWeight: "bold" }}>{`${numeral(
                        selectedPayment.interestPayment
                      ).format("0,0")} VND`}</Typography>
                    </Typography>
                  </ListItem>

                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <BeachAccessIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <Typography>
                      <Typography color="error" variant="h6">
                        Total Pay
                      </Typography>
                      <Typography sx={{ fontWeight: "bold" }}>{`${numeral(
                        selectedPayment.totalPayment
                      ).format("0,0")} VND`}</Typography>
                    </Typography>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button size="medium" color="primary" onClick={handleInterestPay}>
              Interest Pay
            </Button>
            <Button size="medium" color="error" onClick={handleTotalPay}>
              Total Pay
            </Button>
          </CardActions>
        </Card>
        <BillsTable
          billsTableData={billsTableData}
          handleDeleteBill={handleDeleteBill}
        />
      </Typography>
    </Container>
  );
}

export default PaymentPage;
