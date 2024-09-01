"use server"
import OpinionTable from "@/components/OpinionTable";
import Pagination from "@/components/Pagination";
import SuspenseFallback from "@/components/SuspenseFallback";
import { websiteName } from "@/constants/constants.mjs";
import getOpinions from "@/utils/getOpinions.mjs";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const PendingCommentsHead = dynamic(() => import("@/components/PendingCommentsHead"), { ssr: false}); 

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


  const opinions = await getOpinions(
    page,
    limit,
    sort,
    approvedOnly,
    pendingOnly,
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
        opinion={true}
      />
      
      <p className="font-semibold mx-2 my-2">Total: {opinions?.totalCount}</p>
      <OpinionTable opinions={opinions?.opinions}/>
      <Pagination total={opinions?.totalCount} currentPage={page} limit={limit} />
  </Suspense>
  );
};

export default page;


export async function generateMetadata() {
  return {
    title: `Pending Opinions - ${websiteName}`,
  }
}