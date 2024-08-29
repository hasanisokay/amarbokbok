import NavLink from "@/components/NavLink";
import React from "react";

const layout = ({ children }) => {
  const menu = [
    { href: "/admin/others", name: "Audio" },
    { href: "/admin/others/video", name: "Video" },
    { href: "/admin/others/image", name: "Image" },
  ];
  return (
    <>
      <div className="flex items-center justify-center flex-wrap">
        {menu?.map((m, index) => (
          <NavLink
            href={m.href}
            activeClasses={"bg-orange-500 text-white rounded-md"}
            key={index}
          >
            {m.name}
          </NavLink>
        ))}
      </div>
      {children}
    </>
  );
};

export default layout;
