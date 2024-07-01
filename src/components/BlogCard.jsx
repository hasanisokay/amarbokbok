'use client'
import deltaToPlainText from '@/utils/deltaToPlainText.mjs';
import truncateText from '@/utils/truncateText.mjs';
import BlogHead from './BlogHead';
import { useRouter } from 'next/navigation';
const BlogCard = ({ blog }) => {
    const plainText = deltaToPlainText(blog.content);
    const truncatedText = truncateText(plainText, 60);
const router = useRouter()
    return (
        <div className='my-1 w-fit py-1 shadow-md lg:hover:shadow-lg active:shadow-lg'>
            <BlogHead clickable={true} blog={blog} />
            <p onClick={()=>{router.push(`/blogs/${blog?.blog_id}`)}} className='cursor-pointer' >{truncatedText}</p>
        </div>
    );
};

export default BlogCard;
