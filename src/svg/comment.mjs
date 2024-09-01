const comment = (width = "35px", height = "35px") => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 48 48"
        width={width}
        height={height}
            role="img"
      aria-label="Comment icon"
      >
        <path
          fill="#8BC34A"
          d="M37,39H11l-6,6V11c0-3.3,2.7-6,6-6h26c3.3,0,6,2.7,6,6v22C43,36.3,40.3,39,37,39z"
        />
      </svg>
    </div>
  );
};

export default comment;
