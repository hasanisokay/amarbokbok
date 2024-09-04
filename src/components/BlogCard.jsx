'use client'
import deltaToPlainText from '@/utils/deltaToPlainText.mjs';
import truncateText from '@/utils/truncateText.mjs';
import BlogHead from './BlogHead';
import Link from 'next/link';
const BlogCard = ({ blog }) => {
    const plainText = deltaToPlainText(blog.content);
    const truncatedText = truncateText(plainText, 60);
    return (
        <>
            <div className='my-4 p-4 w-fit py-1 shadow-md lg:hover:shadow-lg active:shadow-lg'>
                <BlogHead clickable={true} blog={blog} />
                <Link href={`/blogs/${blog?.blog_id}`}>
                    {truncatedText}
                </Link>
            </div>
        </>

    );
};

export default BlogCard;
