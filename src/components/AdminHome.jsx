'use client'
import AuthContext from '@/contexts/AuthContext.mjs';
import logOut from '@/utils/logOut.mjs';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

const AdminHome = () => {
    const { currentUser } = useContext(AuthContext);
    const router = useRouter()
    const logout = async () => {
        await logOut();
        window.location.reload();
    }
    return (
        <div className='mt-10'>
            <p  className='text-center'>{currentUser?.email} ({currentUser?.role})</p>
            <div className='flex flex-wrap gap-4 items-center justify-center mt-4'>
                {currentUser && <button className='btn-red' onClick={logout}>Log Out</button>}

                <button className='admin-btn' onClick={() => router.push("/admin/blog-editor")}>Create New Blog</button>
            </div>
        </div>
    );
};

export default AdminHome;