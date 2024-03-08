import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  //   type MRT_ColumnDef,
} from "material-react-table";

//example data type
// type Person = {
//   name: {
//     firstName: string;
//     lastName: string;
//   };
//   address: string;
//   city: string;
//   state: string;
// };

//nested data is ok, see accessorKeys in ColumnDef below
// const data: Person[] = [
const data = [
  {
    project: "Cable assembly",
    assignedHours: "100",
    completedHours: "40",
    assignedEmployee: "4",
    startDate: "2024-01-01",
  },
  {
    project: "Cable assembly",
    assignedHours: "120",
    completedHours: "60",
    assignedEmployee: "10",
    startDate: "2024-02-01",
  },
  {
    project: "Cable assembly",
    assignedHours: "80",
    completedHours: "50",
    assignedEmployee: "6",
    startDate: "2024-01-02",
  },
  {
    project: "Cable assembly",
    assignedHours: "140",
    completedHours: "10",
    assignedEmployee: "5",
    startDate: "2024-01-04",
  },
  {
    project: "Cable assembly",
    assignedHours: "140",
    completedHours: "70",
    assignedEmployee: "7",
    startDate: "2023-12-01",
  },
];

const Jobs = () => {
  //should be memoized or stable
  //   const columns = useMemo<MRT_ColumnDef<Person>[]>(
  const columns = useMemo(() => [
    {
      accessorKey: "project", //access nested data with dot notation
      header: "Project Name",
      size: 150,
    },
    {
      accessorKey: "assignedHours",
      header: "Assigned Hours",
      size: 150,
    },
    {
      accessorKey: "completedHours", //normal accessorKey
      header: "Hours Completed",
      size: 200,
    },
    {
      accessorKey: "assignedEmployee",
      header: "Employee",
      size: 150,
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      size: 150,
    },
  ]);

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return (
    <div className="container mx-auto">
      <MaterialReactTable
        table={table}
        style={{ width: "80%" }}
        //   onRowClick={(row) => console.log(row)}
      />
    </div>
  );
};

export default Jobs;
