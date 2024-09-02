
import deleteOthers from "@/utils/deleteOthers.mjs";
import formatTextWithLinks from "@/utils/formatTextWithLinks.mjs";
import getTime from "@/utils/getTime.mjs";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
const ImageCard = ({ i, index, admin = false }) => {
    const [seeDetails, setSeeDetails] = useState(false);
    return (
        <div className="w-[300px]">
            <div className="w-[300px] h-[300px]" onClick={()=> setSeeDetails((prev)=>!prev)}>
                {(i?.imageUrl.includes("//i.bb") || i?.imageUrl.includes("ibb")) ?
                    <Image className="w-[300px] rounded-t-md h-[300px]" width={100} height={100} src={i?.imageUrl} alt={`image ${index}`} />
                    // eslint-disable-next-line @next/next/no-img-element
                    : <picture>
                        <img className="w-[300px] h-[300px] rounded-t-md " src={i?.imageUrl} alt={`image ${index}`} />
                    </picture>

                }
            </div>
            <p className=" img-card-title font-semibold text-center text-black">{i?.title}</p>
            {
                seeDetails && <div className="flex flex-col items-center justify-center ">
                <span className="text-xs pt-2">{getTime(i?.date)}</span>
                {admin && <button className="btn-red mt-1" onClick={
                    async () => {
                        const res = await deleteOthers(i?._id);
                        if (res.status === 200) {
                            toast.success(res?.message || "Success")
                        } else {
                            toast.error(res.message || "Error")
                        }
                    }}>
                    Delete
                </button>}
                <div className="p-[8px]" dangerouslySetInnerHTML={{__html:formatTextWithLinks(i?.description)}}/>

                <button onClick={() => window.open(i?.imageUrl, '_blank')} className="p-2 text-[10px]">View Full Image</button>
            </div>
            }
        </div>



    );
};

export default ImageCard;