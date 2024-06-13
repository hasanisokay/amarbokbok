'use client'
import useTheme from "@/hooks/useTheme.mjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    return (
        <nav className="h-[70px] dark:bg-gray-600 bg-green-400 shadow1 flex justify-around items-center ">
            <h2><Link href={"/"}>Bonjui</Link></h2>
            <div className="flex gap-2">
                <Link className={`${pathname === "/admin" ? "active" : ""}`} href={`/admin`}>Admin</Link>
                <div>
                    {/* <input checked={theme==="dark"} onChange={toggleTheme} type="checkbox" className="toggle" />
                        <div className="switch">
                            <div className="inner">
                                <div className="disc"></div>
                            </div>
                        </div> */}
                    <label checked={theme==="dark"} onChange={toggleTheme} htmlFor="BasicSwitch_NavigateUI" className="relative flex h-fit w-10 items-center rounded-full border border-sky-600">
                        <input type="checkbox" className="peer/toggle hidden" id="BasicSwitch_NavigateUI" />
                        <div className="absolute inset-0 z-10 w-0 rounded-full duration-200 peer-checked/toggle:w-full peer-checked/toggle:bg-sky-200"></div>
                        <div className="z-20 size-4 rounded-full bg-sky-500 duration-200 peer-checked/toggle:translate-x-6"></div>
                    </label>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;