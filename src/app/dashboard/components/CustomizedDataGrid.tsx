import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { columns, rows } from "../internals/data/gridData";
import { GridColDef } from "@mui/x-data-grid";

const columnsNew: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1.5, minWidth: 200 },
  {
    field: "signUp",
    headerName: "Signed Up",
    flex: 1,
    minWidth: 80,
  },
  {
    field: "loggedInNumber",
    headerName: "Log In Times",
    flex: 1,
    minWidth: 80,
  },
  {
    field: "loggedOut",
    headerName: "Last Logged Out",
    flex: 1,
    minWidth: 80,
  },
];

export default function CustomizedDataGrid() {
  return (
    <DataGrid
      checkboxSelection
      // rows={rows}
      columns={columnsNew}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: "outlined",
              size: "small",
            },
            columnInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            operatorInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: "outlined",
                size: "small",
              },
            },
          },
        },
      }}
    />
  );
}
