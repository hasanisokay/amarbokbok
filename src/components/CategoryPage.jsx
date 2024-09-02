'use client'

import useTheme from '@/hooks/useTheme.mjs';
import RightIndicator from '@/svg/RightIndicator.mjs';
import capitalize from '@/utils/capitalize.mjs';
import getCategories from '@/utils/getCategories.mjs';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const CategoryPage = () => {
    const [categories, setCategories] = useState([])
    const {theme} = useTheme()
    useEffect(() => {
        (async () => {
            const data = await getCategories(true)
            setCategories(data);
        })()
    }, [])
    return (
        <>
            {categories?.length > 0 && <div className="lg:w-fit w-full my-4 bg-[#c6e0b3] dark:bg-[#333333] dark:text-white min-w-[200px]  p-3 text-black h-fit rounded-md">
                <p className='section-heading text-lg font-semibold'>ক্যাটাগরি</p>
                {categories?.map((c, index) =>
                    <div
                        className="py-1 my-2"
                        key={index}
                    >
                        <Link className='w-max flex gap-2 group' href={`/blogs/categories/${c?.category}`}>
                            <RightIndicator theme={theme} />
                            <button className='lg:group-hover:text-blue-500 active:text-blue-500'
                            > {capitalize(c?.category)} {`(${c?.count})`} </button>
                        </Link>

                    </div>)}
            </div>}
        </>
    );
};

export default CategoryPage;