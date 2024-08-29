import deleteOthers from "@/serverActions/deleteOthers.mjs";
import getTime from "@/utils/getTime.mjs";
import toast from "react-hot-toast";
const AudioCard = ({ a, admin = false, index }) => {

    return (
        <div className=" p-2 text-wrap text-left greenbg rounded-md active:shadow-xl lg:hover:shadow-xl">
            <h4>{index + 1}. {a?.title}</h4>
            {admin && <button className="btn-red" onClick={
                async () => {
                    const res = await deleteOthers(a?._id)
                    if (res.error) toast.error(res.error);
                    else { toast.success("deleted") }
                }}>
                Delete
            </button>}
            <p className="py-2">{a?.description}</p>
            <p className="text-xs">Added On: {getTime(a?.date)}</p>
            <div className="grid grid-cols-3 text-xs gap-3 pt-2 pb-1">
                {a?.links?.map((l, i) => <a target="_blank" key={i} href={l?.link} className="dark:bg-slate-500 text-white bg-[#3b3b3b] rounded-md p-2 active:shadow-xl lg:hover:shadow-xl lg:hover:scale-105">
                    {l?.name}
                </a>)}
            </div>
        </div>
    );
};

export default AudioCard;