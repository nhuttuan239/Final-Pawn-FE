import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Stack } from "@mui/material";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import GroupsIcon from "@mui/icons-material/Groups";

function CardDashboard({ customers, contracts }) {
  return (
    <Stack spacing={2} direction="row">
      <Card
        sx={{
          maxWidth: 345,
          backgroundColor: "#3867d6",
        }}
      >
        <CardActionArea>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color="#fffa65"
            >
              Total Customer
            </Typography>
            <Stack spacing={1} direction="row">
              <GroupsIcon color="text.white" />
              <Typography variant="body2" color="text.white" fontSize={16}>
                {customers.length} Customers
              </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card sx={{ maxWidth: 345, backgroundColor: "#c23616" }}>
        <CardActionArea>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color="#fffa65"
            >
              Total Contract
            </Typography>
            <Stack spacing={1} direction="row">
              <HistoryEduIcon color="text.white" />
              <Typography variant="body2" color="text.white" fontSize={16}>
                {contracts.length} Contracts
              </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Stack>
  );
}

export default CardDashboard;
