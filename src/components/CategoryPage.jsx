'use client'

import RightIndicator from '@/svg/RightIndicator.mjs';
import getCategories from '@/utils/getCategories.mjs';
import { capitalize } from 'lodash';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const CategoryPage = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        (async () => {
            const data = await getCategories(true)
            setCategories(data);
        })()
    }, [])
    return (
        <>
            {categories?.length > 0 && <div className="w-fit my-4">
                <h4 className='section-heading'>ক্যাটাগরি</h4>
                {categories?.map((c, index) =>
                    <div
                        className="py-1 my-2"
                        key={index}
                    >
                        <Link className='w-max flex gap-2 group' href={`/blogs/categories/${c?.category}`}>
                            <RightIndicator />
                            <button className='lg:group-hover:text-blue-500 active:text-blue-500'
                            > {capitalize(c?.category)} {`(${c?.count})`} </button>
                        </Link>

                    </div>)}
            </div>}
        </>
    );
};

export default CategoryPage;