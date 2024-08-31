import OthersSidebar from "@/components/OthersSidebar";

const layout = ({ children }) => {
  return (
    <div className="flex md:flex-row flex-col gap-2 md:items-start items-center mt-10">
      <div className="">
        <OthersSidebar />
      </div>
      <>{children}</>
    </div>
  );
};

export default layout;
