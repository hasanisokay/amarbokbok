'use client'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import CustomSelect from './CustomSelect';

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
        router.replace(`${window.location.pathname}?${query.toString()}`, undefined, { shallow: selectedSort.value === sort });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSort, selectedLimit]);



    return (
        <div className='flex mb-4 text-black gap-2'>
            <CustomSelect
                defaultValue={selectedSort}
                options={sortOptions}
                onChange={(e) => setSelectedSort(e)}
            />
            <CustomSelect
                defaultValue={selectedLimit}
                options={limitOptions}
                onChange={setSelectedLimit}
            />
        </div>
    );
};

export default SelectInBlogs;
