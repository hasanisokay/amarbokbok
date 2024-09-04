import { cookies } from "next/headers";

const getThemeCookie = async () => {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");
  return theme?.value || null;
};

export default getThemeCookie;