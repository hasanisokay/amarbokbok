import NavLink from "./NavLink";

const OthersSidebar = () => {
    const menu = [
        { href: '/others', name: 'Audio' },
        { href: '/others/video', name: 'Video' },
        { href: '/others/image', name: 'Image' },
    ]

    return (
        <div className="flex md:flex-col bg-[#a9d08f] py-4 px-2 rounded-md flex-row gap-2 w-fit">
            {menu?.map((m, i) => <NavLink  activeClasses={"bg-orange-500 text-white rounded-md"} href={m?.href} key={i}>{m?.name}</NavLink>)}
        </div>
    );
};

export default OthersSidebar;