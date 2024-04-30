import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import {
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clear } from "@testing-library/user-event/dist/clear";

export default function JobSheet() {
  const navigate = useNavigate();
  const { jobs } = useSelector((state) => state.currentJobs);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [field, setField] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState("50px");
  const [textareaHeight2, setTextareaHeight2] = useState("50px");
  const [dropDown, setDropDown] = useState({
    store: ["bondi", "imran"],
    floor: ["L1", "L2"],
    location: ["Uttara", "Dhaka"],
    work_authorised_by: [],
  });
  const handleOpen = (type) => {
    if (data[type]) {
      setOpen(!open);
      setField(type);
    }
    return;
  };

  const [data, setData] = useState({
    store: "",
    floor: "",
    location: "",
    job_no: "",
    work_authorised_by: "",
    date: "",
    reason: "",
    performed: "",
    materials: [{ quantity: "", description: "" }],
    labor: {
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
  };

  useEffect(() => {
    fetchDropDown();
    const userData = sessionStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const location = useLocation(); 

  useEffect(() => {
    if (location.state?.row) {
      setAdmin(location.state?.admin);
      setData(location.state?.row);
    }
  }, [location]);

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
    const list = { ...data.labor };
    list[type][time] = value;
    setData({ ...data, labor: list });
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
      const response = await fetch(
        "https://backend.tec.ampectech.com/api/jobsheets",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to save job sheet");
      }

      clearForm();

      alert("Job sheet saved successfully");
    } catch (error) {
      console.error("Error saving job sheet:", error);
      alert("Failed to save job sheet");
    }
  };

  const fetchDropDown = async () => {
    try {
      const response = await fetch(
        "https://backend.tec.ampectech.com/api/drop_downs",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch dropdowns");
      }

      const data = await response.json();
      setDropDown(data);
    } catch (error) {
      console.error("Error fetching dropdowns:", error);
    }
  };

  const handleDropDownUpdate = async () => {
    const formData = new FormData();
    formData.append(field, data[field]);

    try {
      const response = await fetch(
        `https://backend.tec.ampectech.com/api/drop_downs/add`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to add ${field}`);
      }

      const data = await response.json();
      fetchDropDown();
    } catch (error) {
      alert(`Failed to add ${field}`);
    }
    setOpen(!open);
  };

  const clearForm = () => {
    setData({
      store: "",
      floor: "",
      location: "",
      job_no: "",
      work_authorised_by: "",
      date: "",
      reason: "",
      performed: "",
      materials: [{ quantity: "", description: "" }],
      labor: {
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
  }

  return (
    <div className="space-y-6">
      {user?.role === "Electrician" && <div className="w-full flex justify-center px-4 gap-4">
        <Button variant="outlined" className="hover:bg-black hover:text-white" size="sm" onClick={() => {navigate("/jobsheet"); setAdmin(false); clearForm()}}>
          New Job Sheet
        </Button>
        <Button variant="outlined" className="hover:bg-black hover:text-white" size="sm" onClick={() => navigate("/jobsheets")}>
          Previous Job Sheet
        </Button>
      </div>}
      <div
        className="px-6 py-10 w-[700px] border print:border-none bg-white shadow print:shadow-none mx-auto text-sm"
        ref={componentRef}
      >
        <h1 className="text-center text-2xl font-bold pb-2">
          TOTAL ELECTRICAL CONNECTION PTY LTD
        </h1>
        <hr className="border-black my-px" />
        <hr className="border-black" />
        <h1 className="text-center my-4 font-semibold text-lg">JOB SHEET</h1>
        <Dialog open={open} handler={handleOpen}>
          <DialogBody>
            Are you sure you want to add this{" "}
            <span className="font-bold">{field}</span> name to the suggestion
            list?
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={() => setOpen(!open)}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={handleDropDownUpdate}
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
        <div className="space-y-2">
          <div className="flex gap-2 justify-between">
            <div className="flex w-80 items-center">
              <p>Store :</p>
              <input
                type="text"
                value={data?.store}
                list="store"
                className="border-b outline-none focus:border-b-black pl-2 flex-1"
                onChange={(e) => setData({ ...data, store: e.target.value })}
              />
              <datalist id="store">
                <option
                  value=""
                  style={{ opacity: 0.25 }}
                  className=""
                ></option>
                {dropDown?.store?.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </datalist>
              {!admin && (
                <Tooltip content="Add in the suggestion list">
                  <Button
                    disabled={false}
                    variant="outlined"
                    className="px-2 py-1 print:hidden"
                    onClick={() => {
                      handleOpen("store");
                    }}
                  >
                    +
                  </Button>
                </Tooltip>
              )}
            </div>
            <div className="flex w-80 items-center">
              <p>Floor/Level :</p>
              <input
                type="text"
                value={data?.floor}
                list="floor"
                className="border-b outline-none focus:border-b-black pl-2 flex-1"
                onChange={(e) => setData({ ...data, floor: e.target.value })}
              />
              <datalist id="floor">
                <option
                  value=""
                  style={{ opacity: 0.25 }}
                  className=""
                ></option>
                {dropDown?.floor?.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </datalist>
              {!admin && (
                <Tooltip content="Add in the suggestion list">
                  <Button
                    disabled={false}
                    variant="outlined"
                    className="px-2 py-1 print:hidden"
                    onClick={() => {
                      handleOpen("floor");
                    }}
                  >
                    +
                  </Button>
                </Tooltip>
              )}
            </div>
          </div>
          <div className="flex w-full items-center">
            <p>Department/Location :</p>
            <input
              type="text"
              value={data?.location}
              list="location"
              className="border-b outline-none focus:border-b-black pl-2 flex-1"
              onChange={(e) => setData({ ...data, location: e.target.value })}
            />
            <datalist id="location">
              <option value="" style={{ opacity: 0.25 }} className=""></option>
              {dropDown?.location?.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </datalist>
            {!admin && (
              <Tooltip content="Add in the suggestion list">
                <Button
                  disabled={false}
                  variant="outlined"
                  className="px-2 py-1 print:hidden"
                  onClick={() => {
                    handleOpen("location");
                  }}
                >
                  +
                </Button>
              </Tooltip>
            )}
          </div>
          <div className="flex justify-between">
            <div className="flex w-80 items-center">
              <p>Job No :</p>
              <input
                type="text"
                value={data?.job_no}
                list="jobNumbers"
                className="border-b outline-none focus:border-b-black pl-2 flex-1"
                onChange={(e) => setData({ ...data, job_no: e.target.value })}
              />
              <datalist id="jobNumbers">
                <option
                  value=""
                  style={{ opacity: 0.25 }}
                  className=""
                ></option>
                {jobs?.map((item) => (
                  <option key={item?.job_number} value={item?.job_number}>
                    {item?.job_number}
                  </option>
                ))}
              </datalist>
            </div>
            <div className="flex w-80 items-center  justify-between">
              <p>Work Authorised By :</p>
              <input
                type="text"
                value={data?.work_authorised_by}
                list="work_authorised_by"
                className="border-b outline-none focus:border-b-black pl-2 w-40"
                onChange={(e) =>
                  setData({ ...data, work_authorised_by: e.target.value })
                }
              />
              <datalist id="work_authorised_by">
                <option
                  value=""
                  style={{ opacity: 0.25 }}
                  className=""
                ></option>
                {dropDown?.work_authorised_by?.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </datalist>
              {!admin && (
                <Tooltip content="Add in the suggestion list">
                  <Button
                    disabled={false}
                    variant="outlined"
                    className="px-2 py-1 print:hidden"
                    onClick={() => {
                      handleOpen("work_authorised_by");
                    }}
                  >
                    +
                  </Button>
                </Tooltip>
              )}
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
              {data?.materials?.map((row, index) => (
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
                  {!admin && (
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
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {!admin && (
            <Button
              size="sm"
              onClick={addRow}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded print:hidden"
            >
              Add Row
            </Button>
          )}
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
                          value={data?.labor?.[type]?.[time] || ""} // Add null checks
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
          {admin && user?.role === "Electrician" && <Button
            size="sm"
            onClick={handlePrint}
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 w-36 px-4 rounded print:hidden"
          >
            Request to edit
          </Button>}
          {!admin && (
            <IconButton
              size="sm"
              onClick={handleSave}
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-10 rounded print:hidden"
            >
              Save
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
}
