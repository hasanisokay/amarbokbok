import Login from "@/components/Login";
import { websiteName } from "@/constants/constants.mjs";

const page = () => {
    return (
        <>
         <Login/>   
        </>
    );
};

export default page;

export async function generateMetadata() {
    return {
      title: `Login  - ${websiteName}`,
    }
  }