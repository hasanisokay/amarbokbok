'use server'
import DeleteOption from "@/components/DeleteOption";
import { websiteName } from "@/constants/constants.mjs";
import getBlogs from "@/utils/getBlogs.mjs";
import Link from "next/link";

const page = async () => {
  const blogs = await getBlogs("", 1, 10000, "newest", "", true);
  return (
    <div className="container">
      <h4>Total: {blogs?.length}</h4>
      {blogs?.map((blog) => (
        <div key={blog?._id} className="my-2">
          <Link className="text-blue-500" href={`/blogs/${blog?.blog_id}`}>
            {blog?.title}
          </Link>
          <p>Total Read: {blog?.readCount}</p>
          <DeleteOption blog_id={blog?.blog_id} noReloadAfterDelete={true} />
        </div>
      ))}
    </div>
  );
};

export default page;

export async function generateMetadata() {
  return {
    title: `All Blogs - ${websiteName}`,
  }
}