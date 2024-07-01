import BlogCard from "./BlogCard";

const Blogs = ({blogs}) => {
    console.log(blogs)
    return (
        <div>
            <h2>Blogs Found: {blogs?.totalCount}</h2>
            {
                blogs?.blogs?.map((blog)=> <BlogCard blog={blog} key={blog?._id}/> )
            }
        </div>
    );
};

export default Blogs;