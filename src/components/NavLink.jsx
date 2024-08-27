'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children, fromAdmin, activeColor, ...props }) => {
    const path = usePathname();
    return (
        <Link href={href}
            aria-current={(path === href) ? 'page' : undefined}
            {...props}
            className={` px-3 py-1 text-sm font-medium duration-300 ${path === href ? fromAdmin ? "bg-orange-500 text-white" : `${activeColor || "text-purple-600"} `
                : fromAdmin ? 'text-black dark:text-white':'text-black dark:text-white'}`}
        >
            {children}
        </Link>
    );
};

export default NavLink;