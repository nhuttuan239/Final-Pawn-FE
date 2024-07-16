import { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
export const CustomersTable = ({
  customers,
  handleEditCustomer,
  handleDeleteCustomer,
}) => {
  const data = customers;

  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: "fullname",
        header: "Full Name",
      },
      {
        accessorKey: "phone",
        header: "Phone Number",
      },
      {
        accessorKey: "nationalId",
        header: "NationalId",
      },
      {
        accessorKey: "address",
        header: "Address",
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
            color="primary"
            onClick={() => {
              handleEditCustomer(row.original);
              console.log(row.original);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              handleDeleteCustomer(row.original);
              console.log(row.original); //assuming simple data table
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    />
  );
};

export default CustomersTable;
