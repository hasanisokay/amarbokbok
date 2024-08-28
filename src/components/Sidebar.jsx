import React from 'react';
import CategoryPage from './CategoryPage';
import MostRead from './MostRead';
import RecentBlogs from './RecentBlogs';

const Sidebar = () => {
    return (
        <section className="min-w-[200px] bg-[#c6e0b3] p-3 text-black h-fit rounded-md">
            <CategoryPage />
            <MostRead />
            <RecentBlogs />
        </section>
    );
};

export default Sidebar;