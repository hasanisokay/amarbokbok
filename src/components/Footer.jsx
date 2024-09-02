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
    const currentYear = new Date().getFullYear();
    if (path?.startsWith("/admin")) return;

    return (
        <footer className="flex flex-col bg-[#e0f7fa] dark:bg-[#2c2c2c]">
            <div className="flex flex-col justify-around items-start gap-5 pl-4 md:pl-0 bg-[#cfd8dc] py-8 dark:bg-[#424242] md:flex-row md:gap-0">
                <div className="md:border-r-2 md:px-4 flex flex-col md:flex-row gap-8 pl-3 md:gap-4">
                    <section className="h-[148px]">
                        <h2 className="text-2xl font-bold text-[#212121] dark:text-[#fafafa]">Ahmmad Robin</h2>
                        <p className="md:max-w-[400px] text-sm lg:max-w-[450px] my-2 text-[#424242] dark:text-[#e0e0e0]">
                            লেখালিখি করি শখের বসে। কিছু কিছু নিজের খেয়াল-খুশি মত। আর কিছু হয়ত গুরুত্বপূর্ণ লেখা।
                            এই সাইটে অনলাইন জগতে লেখালেখির বেশিরভাগ অংশ প্রকাশিত হয়েছে। মনে রাখতে হবে এর মধ্যে কিছু লেখা অনেক আগের
                            এবং মানহীন। আলাদা করে এখন যাচাই বাছাই করার ইচ্ছা এবং সময় কোনটাই নেই। সবই তুলে দেয়া হল।
                        </p>
                    </section>
                    <section>
                        <p className=" text-xl font-semibold text-[#212121] dark:text-[#fafafa]">Contact</p>
                        <ul className="flex items-start my-2 flex-col gap-4">
                            <li>
                                <a href="https://www.facebook.com/bonjuiofficial" className="flex items-center gap-2 text-sm text-[#424242] dark:text-[#e0e0e0]">
                                    <Facebook /> <span>/bonjuiofficial</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/ahmmadrobin" className="flex items-center gap-2 text-sm text-[#424242] dark:text-[#e0e0e0]">
                                    <Youtube /> <span>/ahmmadrobin</span>
                                </a>
                            </li>
                            <li>
                                <a href="tel:+8801745856249" className="flex items-center gap-2 text-sm text-[#424242] dark:text-[#e0e0e0]">
                                    <Phone /> <span className="text-blue-800 dark:text-[#1ad93e] font-semibold">+8801745856249</span> <span>(Call Only)</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://wa.me/8801745856249" className="flex items-center gap-2 text-sm text-[#424242] dark:text-[#e0e0e0]">
                                    <WhatsApp /> <span className="text-blue-800 dark:text-[#1ad93e] font-semibold">+8801745856249</span> <span>(Text Only)</span>
                                </a>
                            </li>
                        </ul>
                    </section>
                </div>
                <nav className="flex items-start md:flex-row flex-col gap-6 md:gap-10">
                    <section>
                        <p className="text-xl font-semibold text-[#212121] dark:text-[#fafafa] pl-3">Browse</p>
                        <ul className="flex items-start my-2 flex-col gap-2 text-[#424242] dark:text-[#e0e0e0]">
                            <li className="duration-300 lg:hover:scale-110 active:scale-110 lg:active:scale-100"><NavLink activeClasses={"text-[#005494] dark:text-[#1ad93e]"} href={"/blogs"}>Blogs</NavLink></li>
                            <li className="duration-300 lg:hover:scale-110 active:scale-110 lg:active:scale-100"><NavLink activeClasses={"text-[#005494] dark:text-[#1ad93e]"} href={"/about"}>About</NavLink></li>
                            <li className="duration-300 lg:hover:scale-110 active:scale-110 lg:active:scale-100"><NavLink activeClasses={"text-[#005494] dark:text-[#1ad93e]"} href={"/"}>Home</NavLink></li>
                            <li className="duration-300 lg:hover:scale-110 active:scale-110 lg:active:scale-100"><NavLink activeClasses={"text-[#005494] dark:text-[#1ad93e]"} href={"/contact"}>Contact</NavLink></li>
                        </ul>
                    </section>
                    <section className="pl-2 h-[148px]">
                        <p className="text-xl font-semibold text-[#212121] dark:text-[#fafafa]">Developer</p>
                        <p className="my-2 text-lg font-medium">Rafael Hasan</p>
                        <p >
                            Email: <a href="mailto:devhasanvibes@gmail.com" className="dark:text-[#E5E7EB] text-blue-800 font-semibold ">devhasanvibes@gmail.com</a>
                        </p>
                        <p className="my-2" >
                            Telegram: <a href="https://t.me/rafaelhasan" target="_blank" className="dark:text-[#E5E7EB] text-blue-800 font-semibold ">t.me/rafaelhasan</a>
                        </p>
                    </section>
                </nav>
            </div>
            <aside className="bg-[#424242] py-5 text-center text-sm text-[#fafafa] dark:bg-[#1c1c1c]">
                <p>&copy; {currentYear} {websiteName}. All Rights Reserved.</p>
            </aside>
        </footer>
    );
};

export default Footer;