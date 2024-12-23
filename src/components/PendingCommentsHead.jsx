'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CustomSelect from "./CustomSelect";
import SearchComment from "./SearchComment";

const PendingCommentsHead = ({ sort, page, commentType, limit, keyword, opinion }) => {
    const router = useRouter();
    const [hasMounted, setHasMounted] = useState(false)
    const [selectedSort, setSelectedSort] = useState({ value: sort, label: sort === 'newest' ? 'Newest' : 'Oldest' });
    const [selectedLimit, setSelectedLimit] = useState({ value: limit, label: `${limit} items per page` });
    const [type, setType] = useState({
        value: commentType, label:
            commentType.endsWith("y") ? commentType.split("O")[0].charAt(0).toUpperCase() + commentType.split("O")[0].slice(1) + " Only"
                : "All"
    })
    const [search, setSearch] = useState(keyword);

    const sortOptions = [
        { value: 'newest', label: 'Newest' },
        { value: 'oldest', label: 'Oldest' },
    ];
    const typeOptions = [
        { value: 'all', label: 'All' },
        { value: 'pendingOnly', label: 'Pending Only' },
        { value: 'approvedOnly', label: 'Approved Only' },
    ];
    const limitOptions = [
        { value: 20, label: '20 items per page' },
        { value: 60, label: '60 items per page' },
        { value: 500, label: '500 items per page' },
        { value: 10000, label: '10000 items per page' },
    ];
    useEffect(() => {
        if (hasMounted) {
            const query = new URLSearchParams(window.location.search);
            query.set('limit', limit);
            query.set('sort', selectedSort.value);
            query.set('limit', selectedLimit.value);
            query.set('type', type.value);
            query.set('keyword', search);
            query.set('page', page);

            router.replace(`${window.location.pathname}?${query.toString()}`, undefined, { shallow: selectedSort.value === sort });

        } else {
            setHasMounted(true);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, selectedSort, selectedLimit, search]);


    return (
        <>
            <div className="flex gap-4 flex-wrap items-center justify-center my-4">
                <CustomSelect
                    defaultValue={selectedSort}
                    options={sortOptions}
                    onChange={setSelectedSort}
                />
                <CustomSelect
                    defaultValue={selectedLimit}
                    options={limitOptions}
                    onChange={setSelectedLimit}
                />
                <CustomSelect
                    defaultValue={type}
                    options={typeOptions}
                    onChange={setType}
                    classes={'min-w-[150px]'}
                />
            </div>
            <SearchComment type={opinion ? "Opinion" : "Comment"} searchText={search} onChange={setSearch} />
        </>
    );
};

export default PendingCommentsHead;