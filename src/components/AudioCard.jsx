import deleteOthers from "@/utils/deleteOthers.mjs";
import getTime from "@/utils/getTime.mjs";
import toast from "react-hot-toast";
const AudioCard = ({ a, admin = false, index }) => {

    return (
        <div className="p-2 text-left lg:w-[350px] md:w-[300px] whitespace-pre-wrap break-words greenbg rounded-md shadow4 lg:hover:-translate-y-2 active:-translate-y-2 duration-500 ">
            <p className="pb-1 font-semibold text-xl">{a?.title}</p>
            {admin && <button className="btn-red" onClick={
                async () => {
                    const res = await deleteOthers(a?._id);
                   if(res.status===200){
                    toast.success(res?.message || "Success")
                   }else{
                    toast.error(res.message ||"Error")
                   }
                }}>
                Delete
            </button>}
            <p className="py-2 text-sm text-wrap max-w-[300px]">{a?.description}</p>
            <p className="text-xs">Added On: {getTime(a?.date)}</p>
            <div className="grid grid-cols-3 text-xs gap-3 pt-2 pb-1">
                {a?.links?.map((l, i) => <a target="_blank" key={i} href={l?.link} className="dark:bg-slate-500 text-white text-center bg-[#3b3b3b] rounded-md p-1 duration-300 active:shadow-xl lg:hover:shadow-xl lg:hover:scale-105">
                    {l?.name}
                </a>)}
            </div>
        </div>
    );
};

export default AudioCard;