import NavLink from "./NavLink";

const OthersSidebar = () => {
    const menu = [
        { href: '/others', name: 'Audio' },
        { href: '/others/video', name: 'Video' },
        { href: '/others/image', name: 'Image' },
        { href: '/others/pdf', name: 'Pdf' },
    ]

    return (
        <div className="flex md:flex-col bg-[#a9d08f] p-4 rounded-md flex-row md:w-[200px] gap-2">
            {menu?.map((m, i) => <NavLink  activeClasses={"bg-orange-500 text-white rounded-md"} href={m?.href} key={i}>{m?.name}</NavLink>)}
        </div>
    );
};

export default OthersSidebar;