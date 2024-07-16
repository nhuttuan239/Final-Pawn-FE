import React, { useState, useEffect } from "react";
import { Typography, Box, Stack, Container } from "@mui/material";
import MainFooter from "../layouts/MainFooter";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Grid from "@mui/material/Grid";

import Logo from "../components/Logo";
import numeral from "numeral";
import { useDispatch, useSelector } from "react-redux";
import { getContractByPhone } from "../features/contract/contractSlice";

function CheckPage() {
  const initial_form = {
    cnumber: "",
    phone: "",
  };
  const [form, setForm] = useState(initial_form);
  const [phone, setPhone] = useState("");
  const [cnumber, setCnumber] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    setPhone(form.phone);
    setCnumber(form.cnumber);
  };

  useEffect(() => {
    dispatch(getContractByPhone({ phone, cnumber }));
  }, [phone, cnumber, dispatch]);

  const selectedPayment = useSelector(
    (state) => state.contract.selectedPayment
  );
  console.log(selectedPayment);
  return (
    <Container>
      <Stack sx={{ minHeight: "100vh" }}>
        <Card marginTop={30} marginLeft={20}>
          <Stack
            sx={{
              alignItems: "center",
            }}
          >
            <Logo
              sx={{
                width: 70,
                height: 70,
                mt: 5,
              }}
            />
            <Typography variant="h4" component="div" color="primary">
              PawnShop
            </Typography>
          </Stack>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color="primary"
            >
              Check Contract info
            </Typography>
            <form>
              <Stack spacing={2} direction="row">
                <TextField
                  id="search-cnumber"
                  name="cnumber"
                  type="text"
                  placeholder="Type your Contract-number"
                  value={form.cnumber}
                  onChange={handleChange}
                  sx={{ width: 300 }}
                  size="small"
                />

                <TextField
                  id="search-cphone"
                  name="cphone"
                  type="text"
                  placeholder="Type your phone number"
                  value={form.cphone}
                  onChange={handleChange}
                  sx={{ width: 300 }}
                  size="small"
                />

                <Button onClick={handleSubmit} color="primary" size="medium">
                  Search
                </Button>
              </Stack>
            </form>
          </CardContent>

          <Divider sx={{ mb: 2 }} />
          {!selectedPayment.cnumber ? (
            ""
          ) : (
            <Typography>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  color="primary"
                >
                  Info Contract {selectedPayment.cnumber}
                </Typography>

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
                          secondary={selectedPayment.createDate}
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
                          primary="Interest Rate"
                          secondary={numeral(
                            selectedPayment.interestRate
                          ).format("0%")}
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
                            <WorkIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Near PayDate"
                          secondary={selectedPayment.nearPayDate}
                        />
                      </ListItem>

                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <BeachAccessIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Pay Date"
                          secondary={selectedPayment.payDate}
                        />
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
            </Typography>
          )}
        </Card>
        <Box sx={{ flexGrow: 1 }} />
        <MainFooter />
      </Stack>
    </Container>
  );
}

export default CheckPage;
