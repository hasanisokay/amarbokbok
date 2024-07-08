'use client'
import BlogCard from "./BlogCard";

const Blogs = ({blogs}) => {
    return (
        <div>
            {
                blogs?.blogs?.map((blog)=> <BlogCard blog={blog} key={blog?._id}/> )
            }
        </div>
    );
};

export default Blogs;