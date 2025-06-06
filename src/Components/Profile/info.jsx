import { useState } from "react";
import fields from "../../Data/Profile";
import { ActionIcon, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconBriefcase,
  IconCheck,
  IconMapPin,
  IconPencil,
  IconX,
} from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { successNotification } from "../../Services/NotificationService";
import { useMediaQuery } from "@mantine/hooks";

const Info = () => {
  const matches = useMediaQuery("(min-width: 475px)");
  const select = fields;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const [edit, setEdit] = useState(false);
  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      form.setValues({
        jobTitle: profile.jobTitle,
        company: profile.company,
        location: profile.location,
        totalExp: profile.totalExp,
      });
    } else {
      setEdit(false);
    }
  };

  const form = useForm({
    mode: "controlled",
    initialValues: { jobTitle: "", company: "", location: "", totalExp: 1 },
  });

  const handleSave = () => {
    setEdit(false);
    let updatedProfile = { ...profile, ...form.getValues() };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Profile Updated Successfully");
  };

  return (
    <>
      <div className="text-3xl xs-mx:text-2xl  font-semibold flex justify-between">
        {user?.name}
        <div>
          {edit && (
            <ActionIcon
              size={matches ? "lg" : "md"}
              color="green.8"
              variant="subtle"
            >
              <IconCheck onClick={handleSave} className="h-4/5 w-4/5" />
            </ActionIcon>
          )}
          <ActionIcon
            size={matches ? "lg" : "md"}
            color={edit ? "red.8" : "brightSun.4"}
            variant="subtle"
          >
            {edit ? (
              <IconX onClick={handleClick} className="h-4/5 w-4/5" />
            ) : (
              <IconPencil onClick={handleClick} className="h-4/5 w-4/5" />
            )}
          </ActionIcon>
        </div>
      </div>
      {edit ? (
        <>
          <div className="flex gap-10 [&>*]:w-1/2 xs-mx:flex-wrap xs-mx:[&>*]:w-full xs-mx:gap-0">
            <SelectInput form={form} name="jobTitle" {...select[0]} />
            <SelectInput form={form} name="company" {...select[1]} />
          </div>
          <div className="flex gap-10 [&>*]:w-1/2 xs-mx:flex-wrap xs-mx:[&>*]:w-full xs-mx:gap-0">
            <SelectInput form={form} name="location" {...select[2]} />
            <NumberInput
              name="totalExp"
              label="Total Experience"
              withAsterisk
              {...form.getInputProps("totalExp")}
              clampBehavior="strict"
              hideControls
              min={1}
              max={50}
            />
          </div>
        </>
      ) : (
        <>
          <div className="text-xl xs-mx:text-base flex gap-1 items-center">
            <IconBriefcase className="h-5 w-5" stroke={1.5} />
            {profile.jobTitle} &bull; {profile.company}
          </div>
          <div className="text-lg xs-mx:text-base flex gap-1 items-center text-mine-shaft-400">
            <IconMapPin className="h-5 w-5" stroke={1.5} />
            {profile.location}
          </div>
          <div className="text-lg xs-mx:text-base flex gap-1 items-center text-mine-shaft-400">
            <IconBriefcase className="h-5 w-5" stroke={1.5} />
            Experience: {profile.totalExp} Years
          </div>
        </>
      )}
    </>
  );
};

export default Info;
