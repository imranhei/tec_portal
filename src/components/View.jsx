import React from 'react';
import { useLocation } from 'react-router-dom';

export default function View() {
  const location = useLocation();
  const row = location.state?.row;

  if (!row) {
    return <div>No data available.</div>;
  }

  return (
    <div>
      <h2>Project Name: {row.project}</h2>
      <p>Assigned Hours: {row.assignedHours}</p>
      <p>Completed Hours: {row.completedHours}</p>
      <p>Start Date: {row.startDate}</p>
      <p>Completed Date: {row.endDate}</p>
      <p>Assigned Employees:</p>
        {/* <ul>
            <li>Ashik</li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul> */}
      {/* <p>Project Manager: {row.projectManager}</p> */}
    </div>
  );
}