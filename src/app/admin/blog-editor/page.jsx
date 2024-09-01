'use client'
import { websiteName } from "@/constants/constants.mjs";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
const BlogEditor = dynamic(() => import("@/components/BlogEditor"), { ssr: false })

const BlogEditPage = () => {
    const search = useSearchParams();
    const id = search.get('id');
    return (
        <>
            <BlogEditor postId={id} />
        </>
    );
};

export default BlogEditPage;

// export async function generateMetadata() {
//     return {
//       title: `Blog Editor - ${websiteName}`,
//     }
//   }
