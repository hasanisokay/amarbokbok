'use client'
import getMostReadsBlogs from "@/utils/getMostReadsBlogs.mjs";
import Link from "next/link";
import { useEffect, useState } from "react";

const MostRead = () => {

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
                    {mostReadBlogs.map((blog) => <div className="cursor-pointer my-2 py-1 hover-blue"
                        key={blog?._id}>
                        <Link href={`/blogs/${blog?.blog_id}`}>
                            <p>{blog?.title} ({blog?.readCount}) </p>
                        </Link>
                    </div>)}
                </div>
            }
        </>
    );
};

export default MostRead;