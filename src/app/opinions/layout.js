import NavLink from "@/components/NavLink";
const layoutOpinion = ({ children }) => {
  return (
    <>
      <div className="flex items-center justify-center mt-10">
        <NavLink activeClasses={"bg-orange-500 text-white rounded-md"} href={"/opinions"}>Opinions</NavLink>
        <NavLink activeClasses={"bg-orange-500 text-white rounded-md"} href={"/opinions/share"}>Share Your Opinion</NavLink>
      </div>
      {children}
    </>
  );
};

export default layoutOpinion;
