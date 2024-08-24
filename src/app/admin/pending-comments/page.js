"use server"
import CommentTable from "@/components/CommentTable";
import PendingCommentsHead from "@/components/PendingCommentsHead";
import SuspenseFallback from "@/components/SuspenseFallback";
import getComments from "@/utils/getComments.mjs";
import { Suspense } from "react";

const page = async ({ searchParams }) => {
  const sort = searchParams?.sort || "newest";
  const limit = searchParams.limit || 10000;
  const type = searchParams.type || "pendingOnly";
  const keyword = searchParams.keyword || "";
  let approvedOnly = "";
  let pendingOnly = "";
  let all = "";
  if (type === "pendingOnly") pendingOnly = true;
  else if (type === "approvedOnly") approvedOnly = true;
  else if (type === "all") all = true;
  
  // (page, limit, sort, blog_id, approvedOnly, pendingOnly, all, keyword="")
  const comments = await getComments(
    1,
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
        sort={sort}
        all={all}
        keyword={keyword}
        limit={limit}
        commentType={type}
      />
      <CommentTable comments={comments?.comments}/>
    </Suspense>
  );
};

export default page;
