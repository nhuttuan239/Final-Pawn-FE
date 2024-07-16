import { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
export const UsersTable = ({ users, handleEditUser, handleDeleteUser }) => {
  console.log(users);
  const updateUsers = users.map((user) => {
    const reportToUser = users.find((u) => u._id === user.reportTo);
    const reportToUsername = reportToUser
      ? reportToUser.username
      : "This is Admin";
    return {
      ...user,
      reportTo: reportToUsername,
    };
  });
  console.log(updateUsers);
  let data;
  updateUsers ? (data = updateUsers) : (data = []);

  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: "username",
        header: "Username",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "role",
        header: "Role",
      },
      {
        accessorKey: "description",
        header: "Description",
      },
      {
        accessorKey: "reportTo",
        header: "ReportTo",
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
              handleEditUser(row.original);
              console.log(row.original);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              handleDeleteUser(row.original);
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

export default UsersTable;
