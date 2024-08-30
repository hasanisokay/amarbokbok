
const page = async({ searchParams }) => {
    const sort = searchParams?.sort || "newest";
    const page = parseInt(searchParams?.page) || 1;
    const limit = searchParams.limit || 10000;
    const keyword = searchParams.keyword || "";
    const res = await getOthers("video", page, limit, sort, keyword);
    
    return (
        <div>
            
        </div>
    );
};

export default page;