import { hostname } from "@/constants/hostname.mjs";

const increaseTotalUsers = async () => {
  const host = await hostname();
  const res = await fetch(`${host}/api/increase-total-user`, {
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export default increaseTotalUsers;
