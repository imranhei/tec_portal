import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "../redux/notifications";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

export default function Navbar() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const notification = useSelector(
    (state) => state.userNotification.notification
  );

  const [open, setOpen] = React.useState(false); //notifications

  // Create a new web worker
  
  // To terminate the worker when no longer needed
  // worker.terminate();

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    if (user?.role === "Admin" || user?.role === "Super Admin") {
      fetchAdminNotification();
    } else {
      fetchUserNotification();
    }
  }, [user]);

  const fetchAdminNotification = async () => {
    // fetch notification from the server
    const response = await fetch(
      "http://backend.tec.ampectech.com/api/allunread",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
        },
      }
    );
    const data = await response.json();
    dispatch(setNotification(data?.notifications));
  };

  const fetchUserNotification = async () => {
    // fetch notification from the server
    const response = await fetch(
      "http://backend.tec.ampectech.com/api/approvenotifications",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
        },
      }
    );
    const data = await response.json();
    dispatch(setNotification(data?.read_notifications));
  };

  const handleApproved = async (id) => {
    const response = await fetch(
      `http://backend.tec.ampectech.com/api/markasread/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  const handleEdit = async (id) => {
    console.log(id);
  };

  // notification related functionality
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <div className="flex w-full items-center justify-end gap-5 px-6">
      <React.Fragment>
        <div className="relative cursor-pointer" onClick={openDrawer}>
          {notification?.length > 0 && (
            <div className="absolute -right-0.5 -top-0.5">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
            </div>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <g fill="none" fillRule="evenodd">
              <path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
              <path
                fill="currentColor"
                d="M5 9a7 7 0 0 1 14 0v3.764l1.822 3.644A1.1 1.1 0 0 1 19.838 18h-3.964a4.002 4.002 0 0 1-7.748 0H4.162a1.1 1.1 0 0 1-.984-1.592L5 12.764zm5.268 9a2 2 0 0 0 3.464 0zM12 4a5 5 0 0 0-5 5v3.764a2 2 0 0 1-.211.894L5.619 16h12.763l-1.17-2.342a2.001 2.001 0 0 1-.212-.894V9a5 5 0 0 0-5-5"
              />
            </g>
          </svg>
        </div>
        <Drawer
          placement="right"
          open={open}
          onClose={closeDrawer}
          className="p-4"
        >
          <div className="mb-6 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              Notifications
            </Typography>
            <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
          {user?.role === "Admin" || user?.role === "Super Admin" ? (
            <div className="flex flex-col mb-4 border-t">
              {notification?.map((notif) => (
                <div
                  key={notif.id}
                  className="py-px flex justify-between items-center border-b"
                >
                  <div className="py-1 cursor-pointer text-sm">
                    <span className="font-semibold">{notif?.user_name}</span>{" "}
                    wants to modify this Job Id:{" "}
                    <span className="font-semibold">
                      {notif?.data?.job_sheets_id}
                    </span>
                  </div>
                  <div className="flex">
                    <Tooltip content="Approved">
                      <button
                        className="hover:bg-gray-200 rounded-full p-1"
                        onClick={() => handleApproved(notif.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill="#59f556"
                            d="m14.83 4.89l1.34.94l-5.81 8.38H9.02L5.78 9.67l1.34-1.25l2.57 2.4z"
                          />
                        </svg>
                      </button>
                    </Tooltip>
                    <Tooltip content="Reject">
                      <button className="hover:bg-gray-200 rounded-full p-1" 
                      onClick={() => handleEdit(notif.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill="#ff4747"
                            d="M14.95 6.46L11.41 10l3.54 3.54l-1.41 1.41L10 11.42l-3.53 3.53l-1.42-1.42L8.58 10L5.05 6.47l1.42-1.42L10 8.58l3.54-3.53z"
                          />
                        </svg>
                      </button>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-4">
              {notification?.map((notif) => (
                <div className="flex justify-between font-sm">
                  <p>
                    This Job Id {notif.data?.job_sheets_id} is appreved to edit
                  </p>
                  <Tooltip content="View">
                    <button className="hover:bg-gray-200 rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 32 32"
                      >
                        <circle cx="16" cy="16" r="4" fill="#00e6cb" />
                        <path
                          fill="#00e6cb"
                          d="M30.94 15.66A16.69 16.69 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68M16 22.5a6.5 6.5 0 1 1 6.5-6.5a6.51 6.51 0 0 1-6.5 6.5"
                        />
                      </svg>
                    </button>
                  </Tooltip>
                </div>
              ))}
            </div>
          )}
          <Button size="sm">See All Notifications</Button>
        </Drawer>
      </React.Fragment>
      <p>{user?.name}</p>
      <p>{notification?.length}</p>
    </div>
  );
}
