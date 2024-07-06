'use client'
import getCategories from '@/utils/getCategories.mjs';
import { capitalize } from 'lodash';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const CategoryPage = () => {
    const [categories, setCategories] = useState([])
    const router = useRouter();
    useEffect(() => {
        (async () => {
            const data = await getCategories()
            setCategories(data);
        })()
    }, [])
    return (
        <div className="w-fit">
            <h3>Available categories:</h3>
            <div className="flex flex-wrap gap-2 items-center">
                {categories?.map((c, index) => <button
                    className="border p-1 m-1 lg:hover:bg-blue-500 lg:hover:text-white active:bg-blue-500 active:text-white"
                    key={index} onClick={() => router.replace(`/blogs/categories/${c}`)}>{capitalize(c)}</button>)}

            </div>
        </div>
    );
};

export default CategoryPage;