"use server"
// import CommentTable from "@/components/CommentTable";
// import Pagination from "@/components/Pagination";
import SuspenseFallback from "@/components/SuspenseFallback";
import { websiteName } from "@/constants/constants.mjs";
import getComments from "@/utils/getComments.mjs";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const PendingCommentsHead = dynamic(() => import("@/components/PendingCommentsHead"), { ssr: false}); 
const CommentTable = dynamic(() => import( "@/components/CommentTable"), { ssr: false}); 
const Pagination = dynamic(() => import("@/components/Pagination"), { ssr: false}); 

const page = async ({ searchParams }) => {
  const sort = searchParams?.sort || "newest";
  const page = parseInt(searchParams?.page) || 1
  const limit = searchParams?.limit || 10000;
  const type = searchParams?.type || "pendingOnly";
  const keyword = decodeURIComponent(searchParams?.keyword?.trim()) || "";
  let approvedOnly = "";
  let pendingOnly = "";
  let all = "";
  if (type === "pendingOnly") pendingOnly = true;
  else if (type === "approvedOnly") approvedOnly = true;
  else if (type === "all") all = true;
  
  // (page, limit, sort, blog_id, approvedOnly, pendingOnly, all, keyword="")
  const comments = await getComments(
    page,
    limit,
    sort,
    "",
    approvedOnly,
    pendingOnly,
    all,
    keyword,
  );
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <PendingCommentsHead
        page={page}
        sort={sort}
        all={all}
        keyword={keyword}
        limit={limit}
        commentType={type}
      />
      <p className="font-semibold mx-2 my-2">Total: {comments?.totalCount}</p>
      <CommentTable comments={comments?.comments}/>
      <Pagination total={comments?.totalCount} currentPage={page} limit={limit} />
  </Suspense>
  );
};

export default page;

export async function generateMetadata() {
  return {
    title: `Pending Comments - ${websiteName}`,
  }
}