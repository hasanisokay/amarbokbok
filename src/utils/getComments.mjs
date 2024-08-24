import { hostname } from "@/constants/hostname.mjs";
const getComments = async (page, limit, sort, blog_id, approvedOnly="", pendingOnly="", all="", keyword="", admin="") => {
    const host = await hostname();
    const res = await fetch(`${host}/api/get-comments?page=${page || 1}&&blog_id=${blog_id}&&limit=${limit}&&sort=${sort}&&pending=${pendingOnly}&&approved=${approvedOnly}&&all=${all}&&keyword=${keyword}&&admin=${admin}`);
    const data = await res.json();
    return data;
  
};

export default getComments;