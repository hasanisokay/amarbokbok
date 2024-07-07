'use client'
import getMostReadsBlogs from "@/utils/getMostReadsBlogs.mjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MostRead = () => {
    const router = useRouter();
    const [mostReadBlogs, setMostReadBlogs] = useState([])
    useEffect(() => {
        (async () => {
            const data = await getMostReadsBlogs();
            setMostReadBlogs(data)
        })()
    }, [])
    return (
        <>
            {
                mostReadBlogs?.length > 0 && <div className="my-4">
                    <h4 className="section-heading">সর্বাধিক পঠিত</h4>
                    {mostReadBlogs.map((blog) => <div className="cursor-pointer my-2 py-1 hover-blue" onClick={() => router.push(`/blogs/${blog?.blog_id}`)} key={blog?._id}>
                        <p>{blog?.title} ({blog?.readCount}) </p>

                    </div>)}
                </div>
            }
        </>
    );
};

export default MostRead;