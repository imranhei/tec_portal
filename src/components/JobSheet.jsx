import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  Input,
  Button,
  IconButton,
  Select,
  Option,
  Tooltip,
  PlusIcon,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";

export default function JobSheet() {
  const { jobs } = useSelector((state) => state.currentJobs);
  const [open, setOpen] = React.useState(false);
  const [textareaHeight, setTextareaHeight] = useState("50px");
  const [textareaHeight2, setTextareaHeight2] = useState("50px");

  const [data, setData] = useState({
    store: "",
    floor: "",
    department: "",
    job_no: "",
    work_authorised_by: "",
    date: "",
    reason: "",
    performed: "",
    materials: [
      { quantity: "", description: "" },
      { quantity: "", description: "" },
    ],
    labour: {
      leading: {
        Nt: "",
        shift: "",
        ot: "",
      },
      tradesman: {
        Nt: "",
        shift: "",
        ot: "",
      },
      apprentice: {
        Nt: "",
        shift: "",
        ot: "",
      },
    },
  });

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const list = [...data.materials];
    list[index][name] = value;
    setData({ ...data, materials: list });
  }

  // const handleOpen = (value) => setSize(value);

  const addRow = () => {
    setData({
      ...data,
      materials: [...data.materials, { quantity: "", description: "" }],
    });
  };

  const handleDeleteRow = (index) => {
    const list = [...data.materials];
    list.splice(index, 1);
    setData({ ...data, materials: list });
  };
 
  const handleInputChange2 = (type, time, value) => {
    const list = { ...data.labour };
    list[type][time] = value;
    setData({ ...data, labour: list });
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleHeight = (e) => {
    // setText(e.target.value);
    const newHeight = e.target.scrollHeight + 1 + "px";
    setTextareaHeight(newHeight);
  };
  const handleHeight2 = (e) => {
    // setText(e.target.value);
    const newHeight = e.target.scrollHeight + 1 + "px";
    setTextareaHeight2(newHeight);
  };

  const handleSave = async () => {
    try {
      const response = await fetch("https://backend.tec.ampectech.com/api/jobsheets", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to save job sheet");
      }
      alert("Job sheet saved successfully");
    } catch (error) {
      console.error("Error saving job sheet:", error);
      alert("Failed to save job sheet");
    }
  };

  return (
    <div
      className="px-6 py-10 w-[700px] border print:border-none shadow print:shadow-none mx-auto text-sm"
      ref={componentRef}
    >
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
              defaultValue={data?.store} 
              type="text"
              className="border-b outline-none focus:border-b-black pl-2 flex-1"
              onChange={(e) => setData({ ...data, store: e.target.value })}
            />
          </div>
          <div className="flex w-1/2">
            <p>Floor/Level :</p>
            <input
              defaultValue={data?.floor}
              type="text"
              className="border-b outline-none focus:border-b-black pl-2 flex-1"
              onChange={(e) => {setData({ ...data, floor: e.target.value })}}
            /> 
          </div>
        </div>
        <div className="flex w-full">
          <p>Department/Location :</p>
          <input
            value={data?.department}
            type="text"
            className="border-b outline-none focus:border-b-black pl-2 flex-1"
            onChange={(e) => setData({ ...data, department: e.target.value })}
          />
        </div>
        <div className="flex gap-2 w-full">
          {/* <div className="flex w-1/2">
            <p>Job No :</p> */}
          {/* <input
              type="text"
              className="border-b outline-none focus:border-b-black pl-2 flex-1"
            /> */}
          {/* <select
              className="w-60 border-b"
              // onChange={(e) => handleChange("user_id", e)}
            >
              <option value="" style={{ opacity: 0.25 }} className=""></option>
              {jobs?.map((item) => (
                <option key={item?.job_number} value={item?.job_number}>
                  {item?.job_number}
                </option>
              ))}
            </select>
          </div> */}
          <div className="flex w-1/2 relative items-center">
            <p>Job No :</p>
            <input
              type="text"
              value={data?.job_no}
              list="jobNumbers"
              className="w-60 border-b px-1 focus:outline-none"
              onChange={(e) => setData({ ...data, job_no: e.target.value })}
            />
            <datalist
              id="jobNumbers"
              //className="absolute top-full left-0 w-full max-h-10 overflow-y-auto bg-white border border-gray-300 rounded"
            >
              <option value="" style={{ opacity: 0.25 }} className=""></option>
              {jobs?.map((item) => (
                <option key={item?.job_number} value={item?.job_number}>
                  {item?.job_number}
                </option>
              ))}
            </datalist>
            <Tooltip content="Add in the suggestion list">
              <Button disabled={false} variant="outlined" className="px-2 py-1">+</Button>
            </Tooltip>
          </div>
          <div className="flex w-1/2 items-center">
            <p>Work Authorised By :</p>
            <input
              value={data?.work_authorised_by}
              type="text"
              className="border-b outline-none focus:border-b-black pl-2 w-[190px]"
              onChange={(e) => setData({ ...data, work_authorised_by: e.target.value })}
            />
          </div>
        </div>
        <div className="flex w-full">
          <p>Date Work Performed :</p>
          <input
            value={data?.date}
            type="date"
            className={`border-b outline-none focus:border-b-black pl-2 flex-1 ${
              data?.date ? "" : "opacity-50"
            }`}
            onChange={(e) => setData({ ...data, date: e.target.value })}
          />
        </div>
        <div className="w-full">
          <p>Reason Work was Carried Out :</p>
          <textarea
            value={data?.reason}
            style={{ height: textareaHeight }}
            type="text"
            className="border-b outline-none focus:border-b-black w-full"
            onChange={(e) => {
              handleHeight(e);
              setData({ ...data, reason: e.target.value });
            }}
          />
        </div>
        <h1 className="underline">Description of Work</h1>
        <div className="w-full">
          <p>Performed :</p>
          <textarea
            value={data?.performed}
            style={{ height: textareaHeight2 }}
            type="text"
            className="border-b outline-none focus:border-b-black w-full"
            onChange={(e) => {
              handleHeight2(e);
              setData({ ...data, performed: e.target.value });
            }}
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
            {data.materials.map((row, index) => (
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
                <td className="border border-gray-400 w-8 print:hidden">
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
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded print:hidden"
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
              {["Leading Hand", "Tradesman", "Apprentice"].map(
                (role, index) => (
                  <th
                    key={role}
                    className="border border-gray-400 py-1"
                    colSpan="2"
                  >
                    {role} (Hours)
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {["Nt", "shift", "ot"].map((time) => (
              <tr key={time}>
                {["leading", "tradesman", "apprentice"].map((type) => (
                  <React.Fragment key={`${type}-${time}`}>
                    <td key={type} className="border border-gray-400 px-1">
                      {time.toUpperCase()}
                    </td>
                    <td
                      key={`${type}-${time}-input`}
                      className="border border-gray-400"
                    >
                      <input
                        type="number"
                        name={time}
                        value={data?.labour[type][time]}
                        onChange={(e) =>
                          handleInputChange2(type, time, e.target.value)
                        }
                        className="w-full outline-none focus:bg-gray-200 py-1 px-1"
                      />
                    </td>
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <IconButton
          size="sm"
          onClick={handlePrint}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded print:hidden"
        >
          Print
        </IconButton> 
        <IconButton
          size="sm"
          onClick={handleSave}
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-10 rounded print:hidden"
        >
          Save
        </IconButton>
      </div>
    </div>
  );
}
