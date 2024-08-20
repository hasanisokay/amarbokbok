'use client'
import { useContext, useEffect, useState } from "react";
import NavLink from "./NavLink";
import logo from "@/../public/images/jharfuk-logo-white.png";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import AuthContext from "@/contexts/AuthContext.mjs";
import useTheme from "@/hooks/useTheme.mjs";

const Navbar = () => {
    const [visible, setVisible] = useState(true);
    const { theme } = useTheme();
    const [lastScrollY, setLastScrollY] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const handleScroll = () => {
        if (window.scrollY > lastScrollY) {
            setVisible(false);
            setMenuOpen(false)
        } else {
            setVisible(true);
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastScrollY]);


    const menu = (
        <ul className="md:flex-row flex-col flex items-center md:space-x-4  md:space-y-0 space-y-4">
            <li>
                <NavLink href="/" aria-label="Home Page">
                    {"Home"}
                </NavLink>
            </li>
            <li>
                <NavLink href="/blogs" aria-label="Blogs Page">
                    {"Blogs"}
                </NavLink>
            </li>
            {currentUser && <li>
                <NavLink href="/admin" aria-label="Blogs Page">
                    {"Admin"}
                </NavLink>
            </li>}
            <li>
                <NavLink href="/audio" aria-label="Audio Page">
                    {"Audio"}
                </NavLink>
            </li>
            <li>
                <NavLink href="/video" aria-label="Video Page">
                    {"Video"}
                </NavLink>
            </li>
            <li>
                <NavLink href="/search" aria-label="Search Page">
                    {"Search"}
                </NavLink>
            </li>
            <li>
                <NavLink href="/about" aria-label="About Page">
                    {"About"}
                </NavLink>
            </li>
            <li>
                <ThemeToggle />
            </li>
        </ul>
    );

    return (
        <nav
            className={`fixed top-0 left-0 w-full bg-transparent z-50 transition-transform
                bg-opacity-90 backdrop-blur-sm 
                duration-300 ${visible ? 'transform-none' : '-translate-y-full'
                }`}
            aria-label="Main Navigation"
            role="navigation"
        >
            <div className="bg-gray-900 relative text-black dark:text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ul className="h-16 flex items-center justify-between">
                        <li><Image src={logo} alt="logo" width={100} height={100} /></li>
                        <li className="hidden md:block">{menu}</li>
                        <li className="block md:hidden">
                            {
                                menuOpen ? <svg onClick={() => setMenuOpen(!menuOpen)} width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#ff0f10" />
                                </svg> : <svg onClick={() => setMenuOpen(!menuOpen)} width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 18L20 18" stroke={theme === "dark" ? "#d9eff1" : "#000000"} strokeWidth="2" strokeLinecap="round" />
                                    <path d="M4 12L20 12" stroke={theme === "dark" ? "#d9eff1" : "#000000"} strokeWidth="2" strokeLinecap="round" />
                                    <path d="M4 6L20 6" stroke={theme === "dark" ? "#d9eff1" : "#000000"} strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            }
                        </li>
                    </ul>
                </div>
                <div
                    className={`absolute top-16 md:hidden left-0 w-full bg-slate-200 bg-opacity-80 backdrop-blur-xl dark:bg-slate-700 dark:backdrop-blur-lg dark:bg-opacity-90 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    {menu}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
