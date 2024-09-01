const RightIndicator = ({theme}) => {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
          role="img"
      aria-label="Right Indicator icon"
    >
      <ellipse
        rx="7"
        ry="7"
        transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 13 12)"
        fill={theme ==="dark" ? "#ffffff":"#2A4157"}
        fillOpacity="0.24"
      />
      <path
        d="M11.5 9.5L14 12M14 12L11.5 14.5M14 12H4"
        stroke = {theme ==="dark" ? "#ffffff":"#2A4157"}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default RightIndicator;
