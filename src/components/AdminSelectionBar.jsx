'use client'
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";

const AdminSelectionBar = () => {
    const path = usePathname()

    const menu = [
        { href: '/admin', name: 'Admin Home' },
        { href: '/admin/all-blogs', name: 'All Blog' },
        { href: '/admin/pending-comments', name: 'Pending Comments' },
        { href: '/admin/identity', name: 'Change Passsword' },
    ]
    return (
        <>
            {
                path !== "/admin/login" && <>
                    <h2 className="text-center"> Admin Controls</h2>
                    <div className="flex items-center justify-center flex-wrap">
                        {
                            menu.map((m, index) => <NavLink href={m.href} fromAdmin={true} key={index}>{m.name}</NavLink>)
                        }
                    </div>
                </>
            }
        </>
    );
};

export default AdminSelectionBar;