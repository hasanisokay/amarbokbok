"use server"
import CommentTable from "@/components/CommentTable";
import Pagination from "@/components/Pagination";
import PendingCommentsHead from "@/components/PendingCommentsHead";
import SuspenseFallback from "@/components/SuspenseFallback";
import getComments from "@/utils/getComments.mjs";
import { Suspense } from "react";

const page = async ({ searchParams }) => {
  const sort = searchParams?.sort || "newest";
  const page = parseInt(searchParams?.page) || 1
  const limit = searchParams.limit || 10000;
  const type = searchParams.type || "pendingOnly";
  const keyword = searchParams.keyword || "";
  let approvedOnly = "";
  let pendingOnly = "";
  let all = "";
  if (type === "pendingOnly") pendingOnly = true;
  else if (type === "approvedOnly") approvedOnly = true;
  else if (type === "all") all = true;
  
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
// console.log(comments)
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