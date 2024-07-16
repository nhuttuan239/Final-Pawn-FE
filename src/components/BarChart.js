import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Month", "Customer", "Contract"],
  ["January", 470, 1900],
  ["February", 550, 2201],
  ["March", 600, 2232],
  ["April", 650, 3210],
  ["May", 800, 4320],
  ["June", 950, 4502],
  ["July", 1034, 5320],
];

export const options = {
  chart: {
    title: "Pawn Performance",
    subtitle: "Customer, Contract, and Profit: January - July",
  },
};
function BarChart() {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}

export default BarChart;
