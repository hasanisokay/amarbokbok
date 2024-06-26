const getTime = (s) => {
  const date = new Date(s);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
export default getTime;
