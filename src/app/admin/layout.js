import AdminSelectionBar from "@/components/AdminSelectionBar";

const adminLayout = ({ children }) => {
  return (
    <>
      <h2 className="text-center"> Admin Controls</h2>
      <AdminSelectionBar />
      {children}
    </>
  );
};

export default adminLayout;
