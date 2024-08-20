import AdminSelectionBar from "@/components/AdminSelectionBar";

const adminLayout = ({ children }) => {
  return (
    <>
      <AdminSelectionBar />
      {children}
    </>
  );
};

export default adminLayout;
