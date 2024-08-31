import React from 'react';
import CategoryPage from './CategoryPage';
import MostRead from './MostRead';
import RecentBlogs from './RecentBlogs';

const Sidebar = () => {
    return (
        <section className='lg:block flex flex-col items-center justify-center '>
            <CategoryPage />
            <MostRead />
            <RecentBlogs />
        </section>
    );
};

export default Sidebar;