'use client'
import blog from '@/svg/blog.mjs';
import clock from '@/svg/clock.mjs';
import comment from '@/svg/comment.mjs';

import { useState, useEffect } from 'react';

const Counter = () => {
    const [blogs, setBlogs] = useState(0);
    const [totalRead, setTotalRead] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [targets, setTargets] = useState(null);

    useEffect(() => {
        // Fetch target values from API
        const fetchTargets = async () => {
            try {
                const response = await fetch('/api/counter-targets', { next: { revalidate: 600 } }); // Replace with your API endpoint
                const data = await response.json();
                setTargets({
                    blogs: data.blogs,
                    totalRead: data.totalRead,
                    totalComments: data.totalComments,
                });
            } catch (error) {
                console.error('Failed to fetch targets', error);
            }
        };

        fetchTargets();
    }, []);

    useEffect(() => {
        if (targets) {
            let blogsInterval, readInterval, commentsInterval;

            const countUp = (setter, target, delay) => {
                let count = 0;
                const interval = setInterval(() => {
                    count++;
                    setter(count);
                    if (count === target) clearInterval(interval);
                }, delay);
                return interval;
            };

            blogsInterval = countUp(setBlogs, targets?.blogs, 40);
            readInterval = countUp(setTotalRead, targets?.totalRead, 5);
            commentsInterval = countUp(setTotalComments, targets?.totalComments, 50);

            return () => {
                clearInterval(blogsInterval);
                clearInterval(readInterval);
                clearInterval(commentsInterval);
            };
        }
    }, [targets]);

    if (!targets) {
        return <p></p>; // or a skeleton loader
    }

    return (
        <div className="flex flex-wrap gap-4 items-center justify-center mt-10">
            <div className='counter-card'>
                {blog()}
                <h3 className="text-2xl font-bold">{blogs}</h3>
                <p>Blogs</p>
            </div>
            <div className='counter-card'>
                {clock()}
                <h3 className="text-2xl font-bold">{totalRead}</h3>
                <p>Read</p>
            </div>
            <div className='counter-card'>
                {comment()}
                <h3 className="text-2xl font-bold">{totalComments}</h3>
                <p>Comments</p>
            </div>
        </div>
    );
};

export default Counter;
