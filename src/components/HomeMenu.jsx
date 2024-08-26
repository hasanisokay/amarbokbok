'use client'
import HomeCard from "./HomeCard";
import me from "@/svg/me.mjs";
import search from "@/svg/search.mjs";
import video from "@/svg/video.mjs";
import audio from "@/svg/audio.mjs";
import blog from "@/svg/blog.mjs";
import useTheme from "@/hooks/useTheme.mjs";

const HomeMenu = () => {

    const { theme } = useTheme();
    const menu = [
        {
            href: "/blogs",
            description: "সব লেখা পাওয়া যাবে ব্লগে",
            title: "Blogs",
            icon: blog("100px", "100px"),
        },
        {
            href: "/audio",
            description: "অডিও পাওয়া যাবে এখানে",
            title: "Audio",
            icon: audio("100px", "100px", theme),
        },
        {
            href: "/video",
            description: "ভিডিও ",
            title: "Video",
            icon: video("100px", "100px", theme),
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4  justify-items-center my-4 mx-1 lg:mx-10">

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