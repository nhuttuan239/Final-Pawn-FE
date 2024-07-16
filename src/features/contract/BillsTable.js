import { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import { format, parseISO } from "date-fns";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import numeral from "numeral";

export const BillsTable = ({ billsTableData, handleDeleteBill }) => {
  let data;
  billsTableData ? (data = billsTableData) : (data = []);

  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: "payDate",
        header: "Pay Date",

        Cell: ({ cell }) => {
          return (
            <span> {format(parseISO(cell?.getValue()), "dd/MM/yyyy")}</span>
          );
        },
      },
      {
        accessorKey: "cnumber",
        header: "Cnumber",
      },
      {
        accessorKey: "authorCheck",
        header: "Action Person",
      },

      {
        accessorKey: "typePay",
        header: "Type Pay",
      },
      {
        accessorKey: "payment",
        header: "Payment",
        Cell: ({ cell }) => {
          return <span> {numeral(cell?.getValue()).format("0,0")}</span>;
        },
      },
    ],
    []
    //end
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      layoutMode="grid"
      enableColumnOrdering
      enableColumnPinning
      enableClickToCopy
      enableColumnResizing
      displayColumnDefOptions={{
        "mrt-row-actions": {
          size: 100, //if using layoutMode that is not 'semantic', the columns will not auto-size, so you need to set the size manually
          grow: false,
        },
      }}
      enableRowActions
      positionActionsColumn="last"
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
          <IconButton
            color="error"
            onClick={() => {
              handleDeleteBill(row.original);
              console.log(row?.original); //assuming simple data table
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    />
  );
};

export default BillsTable;
