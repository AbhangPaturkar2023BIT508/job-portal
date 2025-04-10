import React from "react";
import { Divider } from "@mantine/core";
import { timeAgo } from "../../Services/Utilities";
import ApplicationForm from "./ApplicationForm";

const ApplyJob = (props) => {
  return (
    <>
      <div className="w-2/3 mx-auto">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div className="p-3 bg-mine-shaft-800 rounded-xl">
              <img
                className="h-14"
                src={`/Icons/${props.company}.png`}
                alt={props.company}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-semibold text-2xl">{props.jobTitle}</div>
              <div className="text-lg text-mine-shaft-300">
                {props.company} &bull; {timeAgo(props.postTime)} &bull;{" "}
                {props.applicants ? props.applicants.length : 0} Applicants
              </div>
            </div>
          </div>
        </div>
        <Divider my="xl" />
        <ApplicationForm />
      </div>
    </>
  );
};

export default ApplyJob;
