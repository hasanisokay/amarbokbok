import React from 'react';
import CategoryPage from './CategoryPage';
import MostRead from './MostRead';
import RecentBlogs from './RecentBlogs';

const Sidebar = () => {
    return (
        <section className="min-w-[200px] mx-2">
            <CategoryPage />
            <MostRead />
            <RecentBlogs />
        </section>
    );
};

export default Sidebar;