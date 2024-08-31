'use client'
import AuthContext from '@/contexts/AuthContext.mjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const DeleteOption = ({ blog_id, noReloadAfterDelete }) => {
    const { currentUser } = useContext(AuthContext);
    const [showDeleteOption, setShowDeleteOption] = useState(false);
    const router = useRouter();
    const deleteConfirm = async (option) => {
        if (!currentUser || !blog_id) return;
        if (option === "no") {
            return setShowDeleteOption(false);
        }
        const response = await fetch('/api/admin/delete-a-blog', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, credentials: "include",
            body: JSON.stringify({ blog_id, admin: currentUser })
        })
        const data = await response.json()
        if (data.status === 200) {
            toast.success("Success")
            if (!noReloadAfterDelete) return router.push("/");
            else window.location.reload()
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
        <div>
            {currentUser && <div className="flex gap-2">
                <Link className='text-green-500 font-semibold' href={`/admin/blog-editor?id=${blog_id}`}>Edit</Link>
                <button className='text-red-500 font-semibold' onClick={() => setShowDeleteOption(!showDeleteOption)} >Delete</button>
            </div>}
            {
                showDeleteOption && <div className="my-4 bg-slate-200 shadow1 text-black duration-500 w-fit px-4 py-2 rounded-lg">
                    <h6>Sure to Delete?</h6>
                    <div className="flex items-center justify-center gap-4">
                        <button className="btn-green" onClick={() => deleteConfirm("no")}>No</button>
                        <button className="btn-red" onClick={() => deleteConfirm("yes")}>Yes</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default DeleteOption;