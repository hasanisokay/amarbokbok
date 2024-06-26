'use client'

import useTheme from "@/hooks/useTheme.mjs";
import { useEffect } from "react";

const ScrollTop = () => {
    // todo: using scroll detecttion to show the scroll to top button. 
    const { theme } = useTheme()
    const handleGoToTop = () => {
        window.scrollTo(0, 0)
    }
    useEffect(()=>{
        window.addEventListener('scroll', (e)=>{
        })
        return ()=>{
            window.removeEventListener('scroll', (e)=>console.log(e,"removed"))
        }
    },[])
    return (
        <div onClick={handleGoToTop} title="scrool to top" className="shadow-2xl w-fit h-fit duration-300 absolute bottom-4 cursor-pointer left-2 opacity-30 hover:opacity-100">
            <svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" fill={theme === "light" ? "#ffffff" : "#323232"} />
                <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11 16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16L13 10.4142L14.2929 11.7071C14.6834 12.0976 15.3166 12.0976 15.7071 11.7071C16.0976 11.3166 16.0976 10.6834 15.7071 10.2929L12.7941 7.37993C12.7791 7.36486 12.7637 7.35031 12.748 7.33627C12.5648 7.12998 12.2976 7 12 7C11.7024 7 11.4352 7.12998 11.252 7.33627C11.2363 7.3503 11.2209 7.36486 11.2059 7.37993L8.29289 10.2929C7.90237 10.6834 7.90237 11.3166 8.29289 11.7071C8.68342 12.0976 9.31658 12.0976 9.70711 11.7071L11 10.4142L11 16Z" fill={theme === "dark" ? "#ffffff" : "#323232"} />
            </svg>
        </div>
    );
};

export default ScrollTop;