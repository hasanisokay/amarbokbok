const search = (width = "48px", height = "48px") => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 48 48"
      width={width}
      height={height}
          role="img"
      aria-label="Search icon"
    >
      <g>
        <rect
          x="34.6"
          y="28.1"
          transform="matrix(0.7071 -0.7071 0.7071 0.7071 -15.1544 36.5859)"
          fill="#616161"
          width="4"
          height="17"
        />
        <circle fill="#616161" cx="20" cy="20" r="16" />
      </g>
      <rect
        x="36.2"
        y="32.1"
        transform="matrix(0.7071 -0.7071 0.7071 0.7071 -15.8392 38.2393)"
        fill="#37474F"
        width="4"
        height="12.3"
      />
      <circle fill="#64B5F6" cx="20" cy="20" r="13" />
      <path
        fill="#BBDEFB"
        d="M26.9,14.2c-1.7-2-4.2-3.2-6.9-3.2s-5.2,1.2-6.9,3.2c-0.4,0.4-0.3,1.1,0.1,1.4c0.4,0.4,1.1,0.3,1.4-0.1C16,13.9,17.9,13,20,13s4,0.9,5.4,2.5c0.2,0.2,0.5,0.4,0.8,0.4c0.2,0,0.5-0.1,0.6-0.2C27.2,15.3,27.2,14.6,26.9,14.2z"
      />
    </svg>
  );
};

export default search;
