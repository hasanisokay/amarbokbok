import Dot from '@/svg/dot.mjs';
import calculateReadingTime from '@/utils/calculateReadingTime.mjs';
import getTime from '@/utils/getTime.mjs';
import { useRouter } from 'next/navigation';
import React from 'react';

const BlogHead = ({ blog, clickable }) => {
    const router = useRouter();
    return (
        <>
            {clickable ? <h3 className='cursor-pointer active:text-blue-600 lg:hover:text-blue-600' onClick={() => router.push(`/blogs/${blog?.blog_id}`)}>{blog?.title}</h3> :<h2>{blog?.title}</h2> }
            <div className='text-gray dark:text-slate-300 flex items-center text-sm py-1 gap-1'>
                <p className='flex gap-1 items-center'> <span>{calculateReadingTime(blog?.content)} min read</span> <Dot /> <span>{getTime(blog?.addedOn)}</span></p>
            </div>
            <p className='text-sm'>Categories: {blog?.categories?.map((c, i) => <span onClick={() => router.push(`/blogs/categories/${c}`)} className="mr-1 text-blue-500 cursor-pointer" key={i}>{c}</span>)}</p>
        </>
    );
};

export default BlogHead;