'use client'
import HomeCard from "./HomeCard";
import me from "@/svg/me.mjs";
import search from "@/svg/search.mjs";
import video from "@/svg/video.mjs";
import audio from "@/svg/audio.mjs";
import blog from "@/svg/blog.mjs";
import useTheme from "@/hooks/useTheme.mjs";
import opinionSVG from "@/svg/opinions.mjs";
import othersSVG from "@/svg/othersSVG.mjs";

const HomeMenu = () => {

    const { theme } = useTheme();
    const menu = [
        {
            href: "/blogs?page=1&sort=newest&limit=10",
            description: "সব লেখা পাওয়া যাবে ব্লগে",
            title: "Blogs",
            icon: blog("100px", "100px"),
        },
        {
            href: "/opinions",
            description: "মতামত দিতে এবং দেখতে",
            title: "Opinions",
            icon: opinionSVG("100px", "100px"),
        },
        {
            href: "/others",
            description: "অন্যান্য",
            title: "Others",
            icon: othersSVG("100px", "100px", theme),
        },
        {
            href: "/search",
            description: "ওয়েবসাইটের কিছু খুঁজতে সার্চ করুন",
            title: "Search",
            icon: search("100px", "100px"),
        },
        {
            href: "/about",
            description: "আমার সম্পর্কে জানতে",
            title: "About Me",
            icon: me("100px", "100px"),
        },
    ];
    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4  justify-items-center mb-4 mt-10 mx-1 lg:mx-10">

            {menu?.map((m, i) => (
                <HomeCard
                    key={i}
                    title={m.title}
                    description={m.description}
                    href={m.href}
                    icon={m.icon}
                />
            ))}
        </div>

    );
};

export default HomeMenu;