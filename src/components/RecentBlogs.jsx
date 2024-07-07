'use client'
import getRecentBlogs from "@/utils/getRecentBlogs.mjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RecentBlogs = () => {
    const [recentBlogs, setRecentBlogs] = useState([]);
    const router = useRouter();
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
                        onClick={()=>router.push(`/blogs/${blog?.blog_id}`)}
                        >
                        <p>{blog.title}</p>
                    </div>)}
                </div>
            }
        </>
    );
};

export default RecentBlogs;