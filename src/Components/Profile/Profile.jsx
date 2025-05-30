import { Avatar, Divider, FileInput, Overlay } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import { setProfile } from "../../Slices/ProfileSlice";
import Info from "./info";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certificate from "./Certificate";
import { useHover, useMediaQuery } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import {
  successNotification,
  errorNotification,
} from "../../Services/NotificationService";
import { updateProfile } from "../../Services/ProfileService";
import { getBase64 } from "../../Services/Utilities";

const Profile = () => {
  const matches = useMediaQuery("(min-width: 475px)");
  const profile = useSelector((state) => state.profile);
  const { hovered, ref } = useHover();
  const dispatch = useDispatch();

  const handleFileChange = async (image) => {
    try {
      let picture = await getBase64(image);
      let base64Image = picture.split(",")[1];

      let updatedProfile = { ...profile, picture: base64Image };

      // 👇 Send to backend
      const response = await updateProfile(updatedProfile);

      // 👇 Update the state with the response
      dispatch(setProfile(response));

      successNotification("Success", "Profile Picture Updated Successfully");
    } catch (err) {
      console.error("Failed to update profile picture:", err);
      errorNotification("Error", "Failed to update profile picture");
    }
  };

  return (
    <div className="w-4/5 lg-mx:w-full mx-auto">
      {/* <div className=""> */}
      <div className="relative px-5">
        <img
          className="rounded-t-2xl xs-mx:h-28"
          src="/Profile/banner.jpg"
          alt=""
        />
        <div
          ref={ref}
          className="absolute flex items-center justify-center -bottom-1/3 md-mx:-bottom-10 sm-mx:-bottom-16 left-8"
        >
          <Avatar
            className="rounded-full !h-48 !w-48 md-mx:!w-40 md-mx:!h-40 sm-mx:!w-36 sm-mx:!h-36 xs-mx:!w-32 xs-mx:!h-32 border-mine-shaft-950 border-8 absolute"
            src={
              profile.picture
                ? `data:image/jpeg;base64, ${profile.picture}`
                : "/avatar.png"
            }
            alt=""
          />
          {hovered && (
            <Overlay
              className="!rounded-full"
              color="#000"
              backgroundOpacity={0.75}
            />
          )}
          {hovered && <IconEdit className="absolute z-[300] !w-16 !h-16" />}
          {hovered && (
            <FileInput
              onChange={handleFileChange}
              className="absolute [&_*]:!rounded-full z-[301] [&_*]:!h-full !h-full w-full"
              variant="transparent"
              size="lg"
              radius="xl"
              accept="image/png, image/jpeg"
            />
          )}
        </div>
        {/* </div> */}
      </div>
      <div className="px-3 mt-20">
        <Info />
      </div>
      <Divider mx="xs" my="xl" />
      <About />
      <Divider mx="xs" my="xl" />
      <Skills />
      <Divider mx="xs" my="xl" />
      <Experience />
      <Divider mx="xs" my="xl" />
      <Certificate />
    </div>
  );
};

export default Profile;
