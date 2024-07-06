'use client'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const SelectInBlogs = ({ sort, limit, page }) => {
    const router = useRouter();
    const [selectedSort, setSelectedSort] = useState({ value: sort, label: sort === 'newest' ? 'Newest' : 'Oldest' });
    const [selectedLimit, setSelectedLimit] = useState({ value: limit, label: `${limit} items per page` });

    const sortOptions = [
        { value: 'newest', label: 'Newest' },
        { value: 'oldest', label: 'Oldest' },
    ];

    const limitOptions = [
        { value: 10, label: '10 items per page' },
        { value: 20, label: '20 items per page' },
        { value: 50, label: '50 items per page' },
    ];

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        query.set('page', page);
        query.set('sort', selectedSort.value);
        query.set('limit', selectedLimit.value);

        // Shallow routing for limit changes
        router.push(`${window.location.pathname}?${query.toString()}`, undefined, { shallow: selectedSort.value === sort });
        // if (selectedSort.value !== sort) {
        //     // Full page reload for sort changes
        //     window.location.reload();
        // }
    }, [selectedSort, selectedLimit]);



    return (
        <div className='flex gap-2'>
            <Select
                defaultValue={selectedSort}
                options={sortOptions}
                onChange={(e) => setSelectedSort(e)}
                className="mb-4 w-fit"
            />
            <Select
                defaultValue={selectedLimit}
                options={limitOptions}
                onChange={setSelectedLimit}
                className="mb-4 w-fit"
            />
        </div>
    );
};

export default SelectInBlogs;
