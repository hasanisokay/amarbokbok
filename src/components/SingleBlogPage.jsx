'use client'
import Spinner from "@/loaders/Spinner";
import BlogHead from "./BlogHead";
import dynamic from "next/dynamic";
//dynamic imports
const QuillRenderer = dynamic(() => import("./QuillRenderer"), { ssr: false, loading: () => <Spinner />, })
const CommentBox = dynamic(() => import("./CommentBox"), { ssr: false })
const PreviousComments = dynamic(() => import("./PreviousComments"), { ssr: false });
const DeleteOption = dynamic(() => import("./DeleteOption"), { ssr: false}); 

const SingleBlogPage = ({ blog }) => {
    return (
        <>
            <section className="lg:mx-12 md:mx-4 mx-2 p-1">
                <div>
                    <BlogHead blog={blog?.blog} clickable={false} />
                </div>
                <DeleteOption blog_id={blog?.blog?.blog_id}/>
                <QuillRenderer content={blog?.blog?.content} />
                <CommentBox isComment={true} key={blog?.blog?.blog_id} blog_id={blog?.blog?.blog_id} />
                <PreviousComments blog_id={blog?.blog?.blog_id} />
            </section>
        </>
    );
};

export default SingleBlogPage;