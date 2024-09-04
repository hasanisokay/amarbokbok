'use client'
import blog from '@/svg/blog.mjs';
import clock from '@/svg/clock.mjs';
import comment from '@/svg/comment.mjs';
import onlineVisitorsSVG from '@/svg/onlineVisitorsSVG.mjs';
import visitorsSVG from '@/svg/visitorsSVG.mjs';

import { useState, useEffect } from 'react';

const Counter = () => {
    const [blogs, setBlogs] = useState(0);
    const [totalRead, setTotalRead] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [onlineUsers, setOnlineUsers] = useState(0)
    const [totalUsers, setTotalUsers] = useState(0)
    const [targets, setTargets] = useState({
        blogs: 0,
        totalRead: 0,
        totalComments: 0,
        onlineUsers: 0,
        totalUsers: 0,
    });
    // const response = {
    //     status: 200,
    //     blogs: await blogCollection.countDocuments(), // Total number of blogs
    //     totalRead: totalReadCount,
    //     totalComments,
    //     onlineUsers,
    //     totalUsers,
    //   };
    useEffect(() => {
        const fetchTargets = async () => {
            try {
                const response = await fetch('/api/counter-targets', {next:{revalidate:60}});
                const data = await response.json();
                if (data?.status === 200) {
                    setTargets({
                        blogs: data?.blogs,
                        totalRead: data?.totalRead,
                        totalComments: data?.totalComments,
                        onlineUsers: data?.onlineUsers,
                        totalUsers: data?.totalUsers,
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
            let blogsInterval, readInterval, commentsInterval, onlineUsersInterval, totalUsersInterval;

            const countUp = (setter, target, duration) => {
                if (target === 0) {
                    setter(0);
                    return;
                }
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
            onlineUsersInterval = countUp(setOnlineUsers, targets?.onlineUsers, 2000); // 2 seconds for totalComments
            totalUsersInterval = countUp(setTotalUsers, targets?.totalUsers, 2000); // 2 seconds for totalComments

            return () => {
                clearInterval(blogsInterval);
                clearInterval(readInterval);
                clearInterval(commentsInterval);
                clearInterval(onlineUsers);
                clearInterval(totalUsers);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <div className='counter-card'>
                {onlineVisitorsSVG()}
                <h1 className="text-2xl font-bold">{onlineUsers}</h1>
                <p>Online Visitor</p>
            </div>
            <div className='counter-card'>
                {visitorsSVG()}
                <h1 className="text-2xl font-bold">{totalUsers}</h1>
                <p>Total Visitor</p>
            </div>
        </div>
    );
};

export default Counter;
