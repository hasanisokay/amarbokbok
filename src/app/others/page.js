"use server";
import AudioPage from "@/components/AudioPage";
import NotFound from "@/components/NotFound";
import getOthers from "@/utils/getOthers.mjs";

const page = async ({ searchParams }) => {
  const sort = searchParams?.sort || "newest";
  const page = parseInt(searchParams?.page) || 1;
  const limit = searchParams.limit || 10;
  const keyword = searchParams.keyword || "";
  let audios;
  try {
    audios = await getOthers("audio", page, limit, sort, keyword);
  } catch (error) {
    audios = null;
  }
  if (
    audios?.status === 500 ||
    audios?.status === 400 ||
    audios?.status === 404 ||
    !audios ||
    audios?.error
  )
    return <NotFound />;
  return (
    <>
      {audios?.others?.length > 0 ? (
        <AudioPage
          audios={audios?.others}
          totalCount={audios?.totalCount}
          limit={limit}
          page={page}
          sort={sort}
        />
      ) : (
        <p className="text-center mt-10 font-semibold">No audio found.</p>
      )}
    </>
  );
};

export default page;
