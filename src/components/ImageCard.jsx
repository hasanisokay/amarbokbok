
import deleteOthers from "@/utils/deleteOthers.mjs";
import getTime from "@/utils/getTime.mjs";
import Image from "next/image";
import toast from "react-hot-toast";
const ImageCard = ({ i, index, admin= false }) => {
    return (
        <div>
            <div className="w-[300px] h-[300px] relative">
                <div className="">
                    {(i?.imageUrl.includes("//i.bb") || i?.imageUrl.includes("ibb")) ?
                        <Image className="w-[300px] rounded-t-md h-[300px]" width={100} height={100} src={i?.imageUrl} alt={`image ${index}`} />
                        // eslint-disable-next-line @next/next/no-img-element
                        : <picture>
                            {/* <source srcSet="https://example.com/hero.avif" type="image/avif" /> */}
                            {/* <source srcSet="https://example.com/hero.webp" type="image/webp" /> */}
                            <img className="w-[300px] h-[300px] rounded-t-md " src={i?.imageUrl} alt={`image ${index}`} />

                        </picture>

                    }
                </div>
                <div className="absolute flex flex-col items-center justify-center top-0 right-0 left-0 opacity-0 hover:opacity-100 active:opacity-100 bottom-0 text-white bg-black bg-opacity-0 hover:bg-opacity-50 active:bg-opacity-50">
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
                    <p className="overflow-y-auto text-center h-full w-full p-2">{i?.description}</p>
                </div>
            </div>
            <p  className=" img-card-title font-semibold text-center text-black">{i?.title}</p>
            <button onClick={()=>window.open(i?.imageUrl, '_blank')} className="p-2 text-[10px]">View Full Image</button>
        </div>



    );
};

export default ImageCard;