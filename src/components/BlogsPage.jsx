import { Suspense } from "react";
import SuspenseFallback from "./SuspenseFallback";
import SelectInBlogs from "./SelectInBlogs";
import Blogs from "./Blogs";
import Pagination from "./Pagination";
import Sidebar from "./Sidebar";
import ResetPage from "./ResetPage";

const BlogsPage = ({ blogs, sort, limit, page }) => {

    if (blogs?.blogs?.length < 1) {
        return <ResetPage currentPage={page} />
    }
    else {
        const start = (page - 1) * limit + 1;
        const end = Math.min(page * limit, blogs?.totalCount);
        return (
            <Suspense fallback={<SuspenseFallback />}>
                <div className="blog-layout">
                    <section>
                        <p className="my-1">
                            Showing {start} - {end} of {blogs?.totalCount}
                        </p>
                        <SelectInBlogs sort={sort} limit={limit} page={page} />
                        <Blogs blogs={blogs}  />
                        {blogs?.totalCount > limit && (
                            <Pagination
                                currentPage={page}
                                total={blogs?.totalCount}
                                limit={limit}
                            />
                        )}
                    </section>
                    {/* <Sidebar /> */}
                </div>
            </Suspense>
        );
    }
};

export default BlogsPage;