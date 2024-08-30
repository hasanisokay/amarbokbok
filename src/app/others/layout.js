import OthersSidebar from "@/components/OthersSidebar";

const layout = ({ children }) => {
  return (
    <div className="flex md:flex-row flex-col gap-2 items-start mt-10">
      <div className="">
        <OthersSidebar />
      </div>
      <>{children}</>
    </div>
  );
};

export default layout;
