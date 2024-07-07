'use client'
import RightIndicator from '@/svg/rightIndicator.mjs';
import getCategories from '@/utils/getCategories.mjs';
import { capitalize } from 'lodash';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const CategoryPage = () => {
    const [categories, setCategories] = useState([])
    const router = useRouter();
    useEffect(() => {
        (async () => {
            const data = await getCategories(true)
            setCategories(data);
        })()
    }, [])
    return (
        <div className="w-fit">
            <h4 className='section-heading'>ক্যাটাগরি</h4>
            <div className='my-2'>
                {categories?.map((c, index) =>
                    <div
                        className="p-1 my-1 flex w-max gap-2 group cursor-pointer"
                        key={index}
                        onClick={() => router.push(`/blogs/categories/${c?.category}`)}>
                        <RightIndicator />
                        <button className='lg:group-hover:text-blue-500 active:text-blue-500'
                        > {capitalize(c?.category)} {`(${c?.count})`} </button>
                    </div>)}
            </div>
        </div>
    );
};

export default CategoryPage;