'use client'
import categorySVG from "@/svg/categorySVG.mjs";
import capitalize from "@/utils/capitalize.mjs";
import getCategories from "@/utils/getCategories.mjs";
import Link from "next/link";
import { useEffect, useState } from "react";

const HomeCategoryCard = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await getCategories(false);
                setCategories(categories);
            } catch (error) {
                console.error("Failed to fetch categories", error);
            }
        };
        fetchCategories();
    }, []);
    return (
        <>
            <div className="shadow3 md:w-[400px] w-full  group lg:hover:-translate-y-2 active:-translate-y-2 duration-500 dark:bg-[#333333] bg-[#b6d7a0] rounded-md group py-4 text-center my-10">
                <span className="flex justify-center mb-6 lg:group-hover:scale-105 group-active:scale-105 lg:group-active:scale-100 duration-500">

                    {categorySVG()}
                </span>
                <hr className="lg:group-hover:text-slate-500
group-active:text-slate-500 
          dark:lg:group-hover:text-slate-300
          dark:group-active:text-slate-300
          dark:text-slate-900 
          text-slate-300 
          duration-500 
          "/>
                {/* <p className="text-xl font-semibold text-center">Categories</p> */}
                <p className="text-[20px] group-active:scale-125 lg:group-active:scale-100 lg:group-hover:scale-125 duration-300 my-2 font-semibold block">Categories</p>
                <p className="block px-4 text-sm duration-500 group-hover:scale-105">
                    ব্লগের সব ক্যাটাগরি লিস্ট। যেকোন ক্যাটাগরিতে ক্লিক এই ক্যাটাগরির সব লেখা করে দেখা যাবে।
                    </p>
                <div className="flex py-2 mt-2 px-1 items-center justify-center flex-wrap gap-4">
                    {categories?.length > 0 && categories?.map((c, i) => <Link
                        aria-label={`Category ${capitalize(c)}`}
                        className="py-1 px-3 hover:bg-[#03e579] dark:hover:bg-[#03e579]  font-medium dark:bg-[#c2cee8] bg-[#202124]  text-white rounded-md dark:text-black" href={`/blogs/categories/${c}`} key={i}>{capitalize(c)}</Link>)}
                </div>
            </div>
        </>
    );
};

export default HomeCategoryCard;