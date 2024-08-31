import { hostname } from "@/constants/hostname.mjs";

const deleteOthers = async (id) => {
  const host = await hostname();
  const res = await fetch(`${host}/api/admin/delete-others?id=${id}`, {
    credentials: "include",
  });
  const data = await res.json();
  return data;

};

export default deleteOthers;
