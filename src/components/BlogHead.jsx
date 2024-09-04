import Dot from '@/svg/dot.mjs';
import calculateReadingTime from '@/utils/calculateReadingTime.mjs';
import getTime from '@/utils/getTime.mjs';
import Link from 'next/link';
import React from 'react';

const BlogHead = ({ blog, clickable }) => {
    return (
        <>
            {clickable ? <Link href={`/blogs/${blog.blog_id}`}>
                <h3 className='cursor-pointer active:text-blue-600 lg:hover:text-blue-600'>
                    {blog?.title}
                </h3>

                <div className='text-gray flex items-center text-sm py-1 gap-1'>
                    <p className='flex gap-1 items-center'> <span>{calculateReadingTime(blog?.content)} min read</span> <Dot /> <span>{getTime(blog?.addedOn)}</span></p>
                </div>
            </Link> : <>
                <h2>{blog?.title}</h2>
                <div className='text-gray flex items-center text-sm py-1 gap-1'>
                    <p className='flex gap-1 items-center'> <span>{calculateReadingTime(blog?.content)} min read</span> <Dot /> <span>{getTime(blog?.addedOn)}</span></p>
                </div>
            </>}
            <p className='text-sm'>Categories: {blog?.categories?.map((c, i) => <Link href={`/blogs/categories/${c}`} className="mr-1 text-blue-500 cursor-pointer" key={i}>{c}</Link>)}</p>
        </>
    );
};

export default BlogHead;