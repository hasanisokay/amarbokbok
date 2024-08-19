'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children, fromAdmin, ...props }) => {
    const path = usePathname();
    return (
        <Link href={href}
            aria-current={path === href ? 'page' : undefined}
            {...props}
            className={` px-3 py-1 text-sm font-medium duration-300 ${path === href ? fromAdmin ? "bg-orange-500 text-white" : "text-red-500"
                : fromAdmin ? 'text-black dark:text-white':'text-white'}`}
        >
            {children}
        </Link>
    );
};

export default NavLink;