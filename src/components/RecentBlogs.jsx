'use client'
import getRecentBlogs from "@/utils/getRecentBlogs.mjs";
import Link from "next/link";
import { useEffect, useState } from "react";

const RecentBlogs = () => {
    const [recentBlogs, setRecentBlogs] = useState([]);
    useEffect(() => {
        (async () => {
            const data = await getRecentBlogs()
            setRecentBlogs(data);
        })()
    }, [])
    return (
        <>
            {
                recentBlogs?.length > 0 && <div className="my-4 min-w-[200px] dark:bg-[#333333] dark:text-white lg:w-fit w-full  p-3 text-black h-fit rounded-md bg-[#c6e0b3]">
                    <p className="section-heading text-lg font-semibold ">সাম্প্রতিক</p>
                    {recentBlogs?.map((blog) => <div
                        className="cursor-pointer hover-blue my-2 py-1"
                        key={blog?._id}
                        >
                            <Link href={`/blogs/${blog?.blog_id}`}>
                            
                        <p>{blog.title}</p>
                            </Link>
                    </div>)}
                </div>
            }
        </>
    );
};

export default RecentBlogs;