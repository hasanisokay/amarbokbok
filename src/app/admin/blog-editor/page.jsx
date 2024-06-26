'use client'
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
const BlogEditor = dynamic(()=>import("@/components/BlogEditor"), {ssr:false})

const BlogEditPage = () => {
    const search = useSearchParams();
    const id = search.get('id');
    console.log(id)
    return (
        <>
            <BlogEditor postId={id}/>
        </>
    );
};

export default BlogEditPage;