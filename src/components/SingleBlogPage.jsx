'use client'
import AuthContext from "@/contexts/AuthContext.mjs";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import BlogHead from "./BlogHead";

const QuillRenderer = dynamic(() => import("./QuillRenderer"), { ssr: false })

const SingleBlogPage = ({ blog }) => {
    const { currentUser } = useContext(AuthContext);
    const [showDeleteOption, setShowDeleteOption] = useState(false);
    const router = useRouter();
    const deleteConfirm = async (option) => {
        if (!currentUser) return;
        if (option === "no") {
            return setShowDeleteOption(false);
        }
        const response = await fetch('/api/admin/delete-a-blog', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ blog_id: blog?.blog?.blog_id, admin: currentUser })
        })
        const data = await response.json()
        if (data.status === 200) {
            return router.push("/");
        }
    }
    useEffect(() => {
        if (showDeleteOption) {
            let id = setTimeout(() => {
                setShowDeleteOption(false);
            }, 5000);
            return () => clearTimeout(id)
        }
    }, [showDeleteOption])
    return (
        <section className="lg:mx-12 md:mx-4 mx-2 p-1">
            <div>
                <BlogHead blog={blog?.blog} clickable={false} />
            </div>

            {currentUser && <div className="flex gap-2 my-4">
                <button className="btn-green" onClick={() => router.push(`/admin/blog-editor?id=${blog.blog.blog_id}`)}>Edit</button>
                <button className="btn-red" onClick={() => setShowDeleteOption(!showDeleteOption)} >Delete</button>
            </div>}
            {
                showDeleteOption && <div className="bg-slate-500 my-4 text-white duration-500 w-fit px-4 py-2 rounded-lg">
                    <h6>Sure to Delete?</h6>
                    <div className="flex items-center justify-center gap-4">
                        <button className="btn-green" onClick={() => deleteConfirm("no")}>No</button>
                        <button className="btn-red" onClick={() => deleteConfirm("yes")}>Yes</button>
                    </div>
                </div>
            }
            <QuillRenderer content={blog?.blog?.content} />
        </section>
    );
};

export default SingleBlogPage;