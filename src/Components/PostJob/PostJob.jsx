import React from "react";
import { content, fields } from "../../Data/PostJob";
import SelectInput from "./SelectInput";
import { TagsInput, Button, NumberInput, Textarea } from "@mantine/core";
import TextEditor from "./RichTextEditor";
import { isNotEmpty, useForm } from "@mantine/form";
import { postJob } from "../../Services/JobService";
import { useNavigate } from "react-router-dom";
import {
  errorNotification,
  successNotification,
} from "../../Services/NotificationService";

const PostJob = () => {
  const Navigate = useNavigate();
  const select = fields;
  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      jobTitle: "",
      company: "",
      experience: "",
      jobType: "",
      location: "",
      packageOffered: "",
      skillsRequired: [],
      about: "",
      description: content,
    },
    validate: {
      jobTitle: isNotEmpty("Job title is required"),
      company: isNotEmpty("Company name is required"),
      experience: isNotEmpty("Experience is required"),
      jobType: isNotEmpty("Job type is required"),
      location: isNotEmpty("Location is required"),
      packageOffered: isNotEmpty("Package offered is required"),
      skillsRequired: isNotEmpty("Skills required is required"),
      about: isNotEmpty("About is required"),
      description: isNotEmpty("Description is required"),
    },
  });

  const handlePost = () => {
    form.validate();
    if (!form.isValid()) return;
    postJob(form.getValues())
      .then((res) => {
        successNotification("Success", "Job Posted Successfully");
        Navigate("/posted-job");
      })
      .catch((err) => {
        console.log(err);
        errorNotification("Error", "Error while posting job");
      });
  };
  return (
    <div className="w-4/5 mx-auto">
      <div className="text-2xl font-semibold mb-5">Post Job</div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput form={form} name="jobTitle" {...select[0]} />
          <SelectInput form={form} name="company" {...select[1]} />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput form={form} name="experience" {...select[2]} />
          <SelectInput form={form} name="jobType" {...select[3]} />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput form={form} name="location" {...select[4]} />
          <NumberInput
            {...form.getInputProps("packageOffered")}
            label="Salary"
            placeholder="Enter Salary"
            hideControls
            withAsterisk
            min={1}
            max={300}
            clampBehavior="strict"
          />
        </div>
        <TagsInput
          {...form.getInputProps("skillsRequired")}
          withAsterisk
          label="Skills"
          placeholder="Enter skill"
          clearable
          acceptValueOnBlur
          splitChars={[",", " ", "|"]}
        />
        <Textarea
          {...form.getInputProps("about")}
          withAsterisk
          className="my-3"
          label="About Job"
          autosize
          minRows={2}
          placeholder="Enter about job..."
        />
        <div className="[&_button[data-active='true']]:!text-bright-sun-400 [&_button[data-active='true']]:!bg-bright-sun-400/20">
          <div className="text-sm font-medium">
            Job Description<span className="text-red-500">*</span>
          </div>
          <TextEditor form={form} />
        </div>
        <div className=" flex gap-4">
          <Button color="brightSun.4" variant="light" onClick={handlePost}>
            Publish Job
          </Button>
          <Button color="brightSun.4" variant="outline">
            Save as Draft
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
