import { Divider } from "@mantine/core";
import React from "react";
import Profile from "../Profile/Profile";

const ProfilePage = () => {
  return (
    <div className='min-h-[90vh] bg-mine-shaft-950 font-["poppins"]'>
      <Divider mx="md" mb="xl" />
      <Profile />
    </div>
  );
};

export default ProfilePage;
