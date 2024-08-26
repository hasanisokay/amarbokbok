const me = (height="20px", width="20px") => {
  return (
    <div>
      <svg
        width={width}
        height={height}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_901_3019)">
          <path
            d="M24 31H8H1C1 31 1.69 27.38 2 26C2.21 25.08 3 23 11 22C11 22 12 25 16 25C20 25 21 22 21 22C29 23 29.79 25.02 30 26C30.29 27.38 31 31 31 31H24Z"
            fill="#FFC44D"
          />
          <path
            d="M23 8H22H10H9C9 4.13 12.13 1 16 1C19.87 1 23 4.13 23 8Z"
            fill="#668077"
          />
          <path
            d="M22 8V11C22 14.87 19 18 16 18C13 18 10 14.87 10 11V8H22Z"
            fill="#FFE6EA"
          />
          <path
            d="M1 31C1 31 1.687 27.379 2 26C2.208 25.083 3 23 11 22C11 22 12 25 16 25C20 25 21 22 21 22C29 23 29.792 25.021 30 26C30.294 27.384 31 31 31 31M10 11C10 14.866 13 18 16 18C19 18 22 14.866 22 11M8 30V31M24 30V31M6 8H23C23 4.134 19.866 1 16 1C12.134 1 9 4.134 9 8"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_901_3019">
            <rect width="32" height="32" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default me;
