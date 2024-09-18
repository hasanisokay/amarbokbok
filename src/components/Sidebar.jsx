import React from 'react';
import CategoryPage from './CategoryPage';
import MostRead from './MostRead';
import RecentBlogs from './RecentBlogs';

const Sidebar = () => {
    return (
        <section className='lg:block min-w-[216px] flex flex-col items-center justify-center '>
            <MostRead />
            <RecentBlogs />
            <CategoryPage />
        </section>
    );
};

export default Sidebar;