import { useMemo, useState } from "react";
import { Input } from "@material-tailwind/react";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  // createRow,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import cleaner from "../storage/cleaner";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const Example = ({ id }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [tempRow, setTempRow] = useState({id: "mrt-row-create"});

  const handleInputChange = (field, value, row) => {
    
    setTempRow((prevTempRow) => ({
      ...prevTempRow,
      [field]: value,
    }));
  };

  const handleSet = (row) => {
    setTempRow(row);
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        // enableEditing: false,
        size: 80,
        // enableColumnFilter: false,
        // Cell: ({ renderedCellValue }) => (
        //   <span>{renderedCellValue}</span>
        // ),
      },
      {
        // accessorFn: (originalRow) => new Date(originalRow?.assign_date),
        accessorKey: "assign_date",
        header: "Assign Date",
        // enableEditing: false,
        muiEditTextFieldProps: {
          type: "date",
          required: true,
        },
        // Cell: ({ row }) => row.original.assign_date,
        // muiEditTextFieldProps: {
        //   required: true,
        //   error: !!validationErrors?.firstName,
        //   helperText: validationErrors?.firstName,
        //   //remove any previous validation errors when user focuses on the input
        //   onFocus: () =>
        //     setValidationErrors({
        //       ...validationErrors,
        //       firstName: undefined,
        //     }),
        //   //optionally add validation checking for onBlur or onChange
        // },
      },
      {
        accessorFn: (originalRow) => Number(originalRow?.assign_hours || 0),
        accessorKey: "assign_hours",
        header: "Assigned Hours",
        filterVariant: "range",
        filterFn: "between",
        muiEditTextFieldProps: {
          type: "number",
          required: true,
        },
      },
      {
        accessorKey: "completed_hours",
        // enableEditing: false,
        header: "Completed Hours",
        filterVariant: "range",
        filterFn: "between",
        muiEditTextFieldProps: {
          type: "number",
          required: true,
        },
      },
    ]
    // [validationErrors]
  );

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();
  //call READ hook
  const {
    data: employeeDetails = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers(id);
  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

  //CREATE action
  const handleCreateUser = async ({ values, table, row }) => {
    // const newValidationErrors = validateUser(values);

    // if (Object.values(newValidationErrors).some((error) => error)) {
    //   setValidationErrors(newValidationErrors);
    //   return;
    // }
    setValidationErrors({});
    console.log(row);
    // return;
    // await createUser(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser = async ({ values, table }) => {
    // const newValidationErrors = validateUser(values);
    // // console.log(values)
    // if (Object.values(newValidationErrors).some((error) => error)) {
    //   setValidationErrors(newValidationErrors);
    //   return;
    // }
    console.log(values);
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: employeeDetails,
    createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => {
      const handleChange = (field, value) => {
        handleInputChange(field, value, row.original);
      };
      return (
        <>
          <DialogTitle variant="h4">Add New Employee</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {/* {internalEditComponents} */}
            <div className="flex flex-col py-5 gap-6">
              <Input
                label="Name"
                variant="static"
                type="text"
                defaultValue={tempRow?.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <Input
                label="Assign Date"
                variant="static"
                type="date"
                defaultValue={tempRow?.assign_date}
                onChange={(e) =>
                  handleChange("assign_date", e.target.value)
                }
              />
              <Input
                label="Assigned Hours"
                variant="static"
                type="number"
                defaultValue={tempRow?.assign_hours}
                onChange={(e) =>
                  handleChange("assign_hours", e.target.value)
                }
              />
              <Input
                label="Completed Hours"
                variant="static"
                type="number"
                defaultValue={tempRow?.completed_hours}
                onChange={(e) =>
                  handleChange("completed_hours", e.target.value)
                }
              />
            </div>
          </DialogContent>
          <DialogActions>
            <MRT_EditActionButtons variant="text" table={table} row={tempRow} />
          </DialogActions>
        </>
      );
    },
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h4">Edit Details</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "0rem" }}>
        {/* <Tooltip title="View">
          <IconButton onClick={() => handleView(row.original)}>
            <ViewIcon />
          </IconButton>
        </Tooltip> */}
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table, row }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Add New Employee
      </Button>
    ),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return <MaterialReactTable table={table} />;
};

//CREATE hook (post new user to api)
function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo) => {
      console.log("new user", newUserInfo);
      queryClient.setQueryData(["users"], (prevUsers) => [
        ...prevUsers,
        {
          ...newUserInfo,
          id: (Math.random() + 1).toString(36).substring(7),
        },
      ]);
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//READ hook (get users from api)
function useGetUsers(id) {
  const navigate = useNavigate();
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      //send api request here
      const response = await fetch(
        `https://backend.tec.ampectech.com/api/jobs/${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
          },
        }
      );
      if (!response.ok) {
        if (response.status === 401) {
          cleaner();
          navigate("/login");
        }
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data.job_assigns;
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put user in api)
function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo) => {
      const prevUsers = queryClient.getQueryData(["users"]); // Get prevUsers from cache
      console.log(newUserInfo);
      if (!Array.isArray(prevUsers)) {
        return queryClient.setQueryData(["users"], []);
      }
      queryClient.setQueryData(["users"], (prevUsers) =>
        prevUsers?.map((prevUser) =>
          prevUser.name === newUserInfo.name ? newUserInfo : prevUser
        )
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (userId) => {
      queryClient.setQueryData(["users"], (prevUsers) =>
        prevUsers?.filter((user) => user.em_name !== userId)
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

const queryClient = new QueryClient();

const EmpDetails = ({ id }) => {
  //Put this with your other react-query providers near root of your app
  return (
    <div className="w-full">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={queryClient}>
          <Example id={id} />
        </QueryClientProvider>
      </LocalizationProvider>
    </div>
  );
};

export default EmpDetails;

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

function validateUser(user) {
  console.log(user);
  return {
    em_name: !validateRequired(user.em_name) ? "Job Id is Required" : "",
    // lastName: !validateRequired(user.lastName) ? "Last Name is Required" : "",
    // email: !validateEmail(user.email) ? "Incorrect Email Format" : "",
  };
}
