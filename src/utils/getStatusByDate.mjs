const getStatusByDate = (dateTimeString) => {
  const inputDate = new Date(dateTimeString);
  const currentDate = new Date();

  return inputDate < currentDate ? (
    <span className="text-red-500 font-semibold">inactive</span>
  ) : (
    <span className="text-green-500 font-semibold">active</span>
  );
};
export default getStatusByDate;
