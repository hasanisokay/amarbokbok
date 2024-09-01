import useTheme from "@/hooks/useTheme.mjs";

const Dot = () => {
  const { theme } = useTheme();
  return (
    <svg
      fill= {theme ==="dark" ? "#ffffff" : "#836b83"}
      width="10px"
      height="10px"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
          role="img"
      aria-label="Dot icon"
    >
      <path d="M7.8 10a2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0-4.4 0z" />
    </svg>
  );
};
export default Dot;
