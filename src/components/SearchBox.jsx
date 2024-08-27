/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import getCategories from "@/utils/getCategories.mjs";
import { capitalize } from "lodash";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Select from "react-select";

const SearchBox = ({ searchedText, searchedType, searchedCategory }) => {
    const [text, setText] = useState(searchedText || "");
    const [type, setType] = useState( searchedType ? {value: searchedType, label: capitalize(searchedType) } : { value: 'blog', label: 'Blog' });
    const [category, setCategory] = useState(searchedCategory ? {value:searchedCategory, label:capitalize(searchedCategory)} : {value:"any", label:"All"})
    const [categories, setCategories] = useState([{value:"any", label:"All"}]);
    const router = useRouter();
    useEffect(() => {
        (async () => {
            const fetchedCategories = await getCategories(); // Fetch the categories
            const categoryOptions = fetchedCategories.map(cat => ({ value: cat, label: capitalize(cat) }));
            setCategories([...categories , ...categoryOptions]);
        })();
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (type && text) {
        return  router.push(`/search?${type?.value}=${text}&category=${category.value}`);
        }
    };

    const options = [
        { value: 'blog', label: 'Blog' },
        { value: 'book', label: 'Book' },
        { value: 'audio', label: 'Audio' },
        { value: 'video', label: 'Video' },
    ];

    return (
        <form onSubmit={handleSubmit} className="my-4 relative flex text-black items-center justify-center gap-2">
            <Select
                value={type}
                onChange={setType}
                options={options}
                className="w-32"
                placeholder="Type"
            />
            <Select
                value={category}
                onChange={setCategory}
                options={categories}
                className="w-32"
                placeholder="Category"
            />
            <div className="relative">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="peer h-[40px] border-secondary px-2 text-sm pt-2 focus:outline-none bg-slate-200 w-full text-black"
                    type="text"
                    id="search-box"
                    placeholder=""
                />
                <label
                    className="absolute left-2 top-0.5 text-xs text-secondary duration-300 peer-placeholder-shown:left-2 peer-placeholder-shown:top-[50%] peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-2 peer-focus:top-0.5 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-secondary"
                    htmlFor="search-box"
                >
                    Search {type ? type.label : ""}
                </label>
            </div>
            <button type="submit" className="h-[40px] btn-green">
                Search
            </button>
        </form>
    );
};

export default SearchBox;
