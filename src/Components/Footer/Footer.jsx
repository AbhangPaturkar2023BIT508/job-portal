import React from "react";
import {
  IconAnchor,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
} from "@tabler/icons-react";
import { footerLinks } from "../../Data/Data";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  return location.pathname !== "/signup" && location.pathname !== "/login" ? (
    <div className="pt-20 bg-mine-shaft-950 pb-5 flex gap-8 font-['poppins'] justify-around flex-wrap p-4">
      <div className="w-1/4 sm-mx:w-1/3 xs-mx:w-1/2 xsm-mx:w-full flex flex-col gap-4">
        <div className="flex gap-1 items-center text-bright-sun-400 ">
          <IconAnchor stroke={2.5} className="h-6 w-6" />
          <div className="text-xl font-semibold">JobHook</div>
        </div>
        <div className="text-sm text-mine-shaft-300">
          Job Portal with user profiles, skill updates, certifications, work
          experience and admin job posting
        </div>
        <div className="flex gap-3 text-bright-sun-400 [&>div]:bg-mine-shaft-900 [&>div]:p-2 [&>div]:rounded-full hover:[&>div]:cursor-pointer hover:[&>div]:bg-mine-shaft-700">
          <div>
            <IconBrandFacebook />
          </div>
          <div>
            <IconBrandInstagram />
          </div>
          <div>
            <IconBrandX />
          </div>
        </div>
      </div>
      {footerLinks.map((item, index) => (
        <div key={index}>
          <div className="text-lg font-semibold mb-4 text-bright-sun-400">
            {item.title}
          </div>
          {item.links.map((Link, index) => (
            <div
              key={index}
              className="text-mine-shaft-300 text-sm hover:text-bright-sun-400 cursor-pointer mb-1 hover:translate-x-2 transition duration-300 ease-in-out"
            >
              {Link}
            </div>
          ))}
        </div>
      ))}
    </div>
  ) : (
    <></>
  );
};

export default Footer;
