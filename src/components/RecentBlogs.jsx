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
                recentBlogs?.length > 0 && <div className="my-4">
                    <h4 className="section-heading">সাম্প্রতিক</h4>
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