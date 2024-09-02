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
                mostReadBlogs?.length > 0 && <div className="my-4 bg-[#c6e0b3] dark:bg-[#333333] dark:text-white min-w-[200px] lg:w-fit w-full p-3 text-black h-fit rounded-md">
                    <p className="section-heading text-lg font-semibold">সর্বাধিক পঠিত</p>
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