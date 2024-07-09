'use client'

import useTheme from "@/hooks/useTheme.mjs";

const RightIndicator = () => {
  const {theme} = useTheme();
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        rx="7"
        ry="7"
        transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 13 12)"
        fill={theme === "light" ? "#2A4157":"#ffffff"}
        fillOpacity="0.24"
      />
      <path
        d="M11.5 9.5L14 12M14 12L11.5 14.5M14 12H4"
        stroke = {theme==="light" ?  "#272727" : "#ffffff"}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default RightIndicator;
