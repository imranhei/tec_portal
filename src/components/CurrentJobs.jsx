import React from "react";

export default function CurrentJobs() {
  const jobs = [
    {
      job_no: "US-CT",
      job_des: "Coma scale, best verbal response, oriented, 24+hrs",
      working_hour: 96,
    },
    {
      job_no: "SE-BD",
      job_des: "Poisoning by unsp antidepressants, undetermined, init encntr",
      working_hour: 19,
    },
    {
      job_no: "PG-SAN",
      job_des: "Disp fx of neck of left talus, init for clos fx",
      working_hour: 94,
    },
    {
      job_no: "PG-WPD",
      job_des: "Laceration of other blood vessels at hip and thigh level",
      working_hour: 90,
    },
    {
      job_no: "BR-AM",
      job_des: "Corrosion of first degree of wrist",
      working_hour: 100,
    },
    {
      job_no: "US-AK",
      job_des: "Unspecified injury of other part of small intestine",
      working_hour: 2,
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl">Current Jobs</h1>
      <div className="mt-4 w-full">
        <div className="flex border my-2 p-1 font-bold shadow bg-slate-200">
            <div className="w-1/6">Job No.</div>
            <div className="w-4/6">Job Description</div>
            <div className="w-1/6">Contribute</div>
        </div>
        {jobs.map((job, index) => (
          <div key={index} className="flex border my-2 p-1 shadow hover:bg-gray-100 cursor-pointer">
            <div className="w-1/6">{job.job_no}</div>
            <div className="w-4/6">{job.job_des}</div>
            <div className="w-1/6 text-center">{job.working_hour}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
