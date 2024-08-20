'use client'
import { websiteName } from "@/constants/constants.mjs";
import NavLink from "./NavLink";
import WhatsApp from "@/svg/WhatsApp.mjs";
import Youtube from "@/svg/Youtube.mjs";
import Facebook from "@/svg/Facebook.mjs";
import Phone from "@/svg/Phone.mjs";
import { usePathname } from "next/navigation";

const Footer = () => {
    const path = usePathname();
    const currentYear = new Date().getFullYear()
    if (path.startsWith("/admin")) return;
    return <footer className="flex flex-col dark:bg-[#333] bg-[#f8ffff] ">
        <div className="flex flex-col items-center justify-around gap-5 bg-gray-300 py-8 dark:bg-gray-500 md:flex-row md:gap-0">
            <section>
                <h5 className="text-2xl font-bold">{websiteName}</h5>
                <p className="md:max-w-[400px] text-sm lg:max-w-[450px] my-2">
                    লেখালিখি করি শখের বসে। কিছু কিছু নিজের খেয়াল-খুশি মত। আর কিছু হয়ত
                    গুরুত্বপূর্ণ লেখা। এই সাইটে অনলাইন জগতে লেখালেখির বেশিরভাগ অংশ
                    প্রকাশিত হয়েছে। মনে রাখতে হবে এর মধ্যে কিছু লেখা অনেক আগের এবং মানহীন।
                    আলাদা করে এখন যাচাই বাছাই করার ইচ্ছা এবং সময় কোনটাই নেই। সবই তুলে দেয়া
                    হল।
                </p>
            </section>
            <nav className="flex justify-between md:gap-10">
                <section>
                    <h4 className="text-center">Browse</h4>
                    <ul className="flex items-center my-2 flex-col gap-2 text-black">
                        <NavLink href={"/"}>Home</NavLink>
                        <NavLink href={"/blogs"}>Blogs</NavLink>
                        <NavLink href={"/about"}>About</NavLink>
                        <NavLink href={"/contact"}>Contact</NavLink>
                    </ul>
                </section>
                <section>
                    <h4 className="text-center">Contact</h4>
                    <ul className="flex items-center my-2 flex-col gap-4">
                        <li>
                            <a href="https://www.facebook.com/" className=" flex items-center gap-2 text-sm">
                                <Facebook /> <span>/bonjui</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com/" className=" flex items-center gap-2 text-sm">
                                <Youtube /> <span>/bonjui</span>
                            </a>
                        </li>
                        <li>
                            <a href="tel:+8801745856249" className=" flex items-center gap-2 text-sm">
                                <Phone />  <span className="text-blue-600 font-semibold">+8801745856249</span> <span>(Call Only)</span>

                            </a>
                        </li>
                        <li>
                            <a href="https://wa.me/8801745856249" className=" flex items-center gap-2 text-sm">
                                <WhatsApp />  <span className="text-blue-600 font-semibold">+8801745856249</span> <span>(Text Only)</span>

                            </a>
                        </li>
                    </ul>
                </section>
            </nav>
        </div>
        <aside className="bg-gray-500 py-5 text-center text-sm dark:bg-gray-800">
            <p>&copy; {currentYear} {websiteName}. All Rights Reserved.</p>
        </aside>
    </footer>
};

export default Footer;