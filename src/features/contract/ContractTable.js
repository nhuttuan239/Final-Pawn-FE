import { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import { format, parseISO } from "date-fns";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import numeral from "numeral";

export const ContractTable = ({
  contracts,
  handleEditContract,
  handleDeleteContract,
  handlePayContract,
}) => {
  const data = contracts;

  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: "cnumber",
        header: "C-Code",
      },
      {
        accessorKey: "fullname",
        header: "Custommer Name",
      },
      {
        accessorKey: "phone",
        header: "Phone",
      },
      {
        accessorKey: "interestType",
        header: "Product Type",
      },
      {
        accessorKey: "product",
        header: "Product",
      },
      {
        accessorKey: "description",
        header: "Description",
      },
      {
        accessorKey: "price",
        header: "Price",
        Cell: ({ cell }) => {
          return <span> {numeral(cell?.getValue()).format("0,0")}</span>;
        },
      },
      {
        accessorKey: "authorName",
        header: "Create by",
      },
      {
        accessorKey: "createDate",
        header: "Create Date",
        Cell: ({ cell }) => {
          return (
            <span> {format(parseISO(cell?.getValue()), "dd/MM/yyyy")}</span>
          );
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
          size: 150, //if using layoutMode that is not 'semantic', the columns will not auto-size, so you need to set the size manually
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
              handleEditContract(row.original);
              console.log(row.original);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              handleDeleteContract(row.original);
              console.log(row.original); //assuming simple data table
            }}
          >
            <DeleteIcon />
          </IconButton>

          <IconButton
            color="warning"
            onClick={() => {
              handlePayContract(row.original);
              console.log(row.original); //assuming simple data table
            }}
          >
            <LocalAtmIcon />
          </IconButton>
        </Box>
      )}
    />
  );
};

export default ContractTable;
