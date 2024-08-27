'use client'
import blog from '@/svg/blog.mjs';
import clock from '@/svg/clock.mjs';
import comment from '@/svg/comment.mjs';

import { useState, useEffect } from 'react';

const Counter = () => {
    const [blogs, setBlogs] = useState(0);
    const [totalRead, setTotalRead] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [targets, setTargets] = useState({
        blogs: 0,
        totalRead: 0,
        totalComments: 0,
    });

    useEffect(() => {
        const fetchTargets = async () => {
            try {
                const response = await fetch('/api/counter-targets');
                const data = await response.json();
                if (data?.status === 200) {
                    setTargets({
                        blogs: data?.blogs,
                        totalRead: data?.totalRead,
                        // totalRead: 2001,
                        totalComments: data?.totalComments,
                    });
                }
            } catch (error) {
                console.error('Failed to fetch targets', error);
            }
        };

        fetchTargets();
    }, []);

    useEffect(() => {
        if (targets) {
            let blogsInterval, readInterval, commentsInterval;

            const countUp = (setter, target, duration) => {
                const stepTime = Math.abs(Math.floor(duration / target));
                let count = 0;

                const interval = setInterval(() => {
                    count++;
                    setter(count);

                    if (count >= target) clearInterval(interval);
                }, stepTime);

                return interval;
            };

            blogsInterval = countUp(setBlogs, targets?.blogs, 2000); // 2 seconds for blogs
            readInterval = countUp(setTotalRead, targets?.totalRead, 2000); // 2 seconds for totalRead
            commentsInterval = countUp(setTotalComments, targets?.totalComments, 2000); // 2 seconds for totalComments

            return () => {
                clearInterval(blogsInterval);
                clearInterval(readInterval);
                clearInterval(commentsInterval);
            };
        }
    }, [targets]);

    return (
        <div className="flex flex-wrap gap-4 items-center justify-center">
            <div className='counter-card'>
                {blog()}
                <h1 className='text-2xl font-bold' >{blogs}</h1>
                <p>Blogs</p>
            </div>
            <div className='counter-card'>
                {clock()}
                <h1 className="text-2xl font-bold">{totalRead}</h1>
                <p>Read</p>
            </div>
            <div className='counter-card'>
                {comment()}
                <h1 className="text-2xl font-bold">{totalComments}</h1>
                <p>Comments</p>
            </div>
        </div>
    );
};

export default Counter;
