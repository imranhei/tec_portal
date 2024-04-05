import React, { useState } from "react";
import { Input, Button, IconButton } from "@material-tailwind/react";

export default function JobSheet() {
  const [rows, setRows] = useState([
    { quantity: "", description: "" },
    { quantity: "", description: "" },
  ]);

  const [rows2, setRows2] = useState({
    leading_head: {
      nt: "",
      shift: "",
      ot: "",
    },
    tradesman: {
      nt: "",
      shift: "",
      ot: "",
    },
    apprentice: {
      nt: "",
      shift: "",
      ot: "",
    },
  });

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
  };

  const addRow = () => {
    setRows([...rows, { quantity: "", description: "" }]);
  };

  const handleDeleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleInputChange2 = (laborType, timeType, value) => {
    setRows2((prevRows) => ({
      ...prevRows,
      [laborType]: {
        ...prevRows[laborType],
        [timeType]: value,
      },
    }));
  };

  return (
    <div className="px-6 py-4 w-[700px] border shadow mx-auto">
      <h1 className="text-center text-2xl font-bold pb-2">
        TOTAL ELECTRICAL CONNECTION PTY LTD
      </h1>
      <hr className="border-black my-px" />
      <hr className="border-black" />
      <h1 className="text-center my-4 font-semibold text-lg">JOB SHEET</h1>
      <div className="space-y-2">
        <div className="flex gap-2">
          <div className="flex w-1/2">
            <p>Store :</p>
            <input
              type="text"
              className="border-b outline-none focus:border-b-black pl-2 flex-1"
            />
          </div>
          <div className="flex w-1/2">
            <p>Floor/Level :</p>
            <input
              type="text"
              className="border-b outline-none focus:border-b-black pl-2 flex-1"
            />
          </div>
        </div>
        <div className="flex w-full">
          <p>Department/Location :</p>
          <input
            type="text"
            className="border-b outline-none focus:border-b-black pl-2 flex-1"
          />
        </div>
        <div className="flex gap-2 w-full">
          <div className="flex w-1/2">
            <p>Job No :</p>
            <input
              type="text"
              className="border-b outline-none focus:border-b-black pl-2 flex-1"
            />
          </div>
          <div className="flex w-1/2">
            <p>Work Authorised By :</p>
            <input
              type="text"
              className="border-b outline-none focus:border-b-black pl-2 w-[170px]"
            />
          </div>
        </div>
        <div className="flex w-full">
          <p>Date Work Performed :</p>
          <input
            type="text"
            className="border-b outline-none focus:border-b-black pl-2 flex-1"
          />
        </div>
        <div className="flex w-full">
          <p>Reason Work was Carried Out :</p>
          <input
            type="text"
            className="border-b outline-none focus:border-b-black pl-2 flex-1"
          />
        </div>
        <h1 className="underline">Description of Work</h1>
        <div className="flex w-full">
          <p>Performed :</p>
          <input
            type="text"
            className="border-b outline-none focus:border-b-black pl-2 flex-1"
          />
        </div>
        <div className="h-4"></div>
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-1" colSpan="3">
                Materials/Equipment
              </th>
            </tr>
            <tr>
              <th className="border border-gray-400 py-1">Quantity</th>
              <th className="border border-gray-400 py-1" colSpan="2">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="border border-gray-400 w-24">
                  <input
                    type="number"
                    name="quantity"
                    value={row.quantity}
                    onChange={(e) => handleInputChange(index, e)}
                    className="w-full outline-none focus:bg-gray-200 px-2 py-1 text-center"
                  />
                </td>
                <td className="border border-gray-400">
                  <input
                    type="text"
                    name="description"
                    value={row.description}
                    onChange={(e) => handleInputChange(index, e)}
                    className="w-full outline-none focus:bg-gray-200 py-1 px-1"
                  />
                </td>
                <td className="border border-gray-400 w-8">
                  <button
                    className="text-red-400 hover:text-red-500"
                    onClick={() => handleDeleteRow(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button
          size="sm"
          onClick={addRow}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Row
        </Button>
        <div className="h-4"></div>
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-1" colSpan="6">
                Labour
              </th>
            </tr>
            <tr>
              {["Leading Hand", "Tradesman", "Apprentice"].map((role) => (
                <>
                  <th
                    key={`${role}-nt`}
                    className="border border-gray-400 py-1"
                    colSpan="2"
                  >
                    {role} (Hours)
                  </th>
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            {["nt", "shift", "ot"].map((time) => (
              <tr key={time}>
                {["leading_head", "tradesman", "apprentice"].map((type) => (
                  <>
                    <td
                      key={`${type}-${time}`}
                      className="border border-gray-400 px-1"
                    >
                      {time.toUpperCase()}
                    </td>
                    <td
                      key={`${type}-${time}-input`}
                      className="border border-gray-400"
                    >
                      <input
                        type="number"
                        name={time}
                        value={rows2[type][time]}
                        onChange={(e) => handleInputChange2(type, time, e.target.value)}
                        className="w-full outline-none focus:bg-gray-200 py-1 px-1"
                      />
                    </td>
                  </>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button
          size="sm"
          onClick={() => window.print()}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          print
        </Button>
    </div>
  );
}
