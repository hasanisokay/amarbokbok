'use client'
import dot from "@/svg/dot.mjs";
import calculateReadingTime from "@/utils/calculateReadingTime.mjs";
import getTime from "@/utils/getTime.mjs";
import dynamic from "next/dynamic";

const QuillRenderer = dynamic(() => import("./QuillRenderer"), { ssr: false })

const SingleBlogPage = ({ blog }) => {
    console.log(blog.blog.timestamp)
    return (
        <div>
            <div className="text-gray flex items-center text-sm py-1 gap-1">
                <p>{calculateReadingTime(blog?.blog?.content)} min read</p>
                {dot()}
                <p>{getTime(blog?.blog?.timestamp)}</p>
            </div>
            <QuillRenderer content={blog?.blog?.content} />
        </div>
    );
};

export default SingleBlogPage;