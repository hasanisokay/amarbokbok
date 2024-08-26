import Link from 'next/link';
import React from 'react';

const HomeCard = ({href, description, title, icon}) => {
    return (
        <Link href={href}>
        <div className="w-[300px] dark:bg-[#333333] bg-slate-200 rounded-md group py-4 text-center ">
          <span className="flex justify-center mb-6 lg:group-hover:scale-105 group-active:scale-105 lg:group-active:scale-100 duration-500">{icon}</span>
          <hr className="lg:group-hover:text-slate-500
group-active:text-slate-500 
          dark:lg:group-hover:text-slate-300
          dark:group-active:text-slate-300
          dark:text-slate-900 
          text-slate-300 
          duration-500 
          "/>
          <span className="text-[20px] group-active:scale-125 lg:group-active:scale-100 lg:group-hover:scale-125 duration-300 my-2 font-semibold block">{title}</span>
          <span className="block lg:group-hover:scale-110 lg:group-active:scale-100 group-active:scale-110 duration-500">{description}</span>
        </div>
      </Link>
    );
};

export default HomeCard;