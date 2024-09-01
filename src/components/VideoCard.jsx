import downloadSVG from '@/svg/downloadSVG.mjs';
import addSsToYtLink from '@/utils/addSsToYtLink.mjs';
import deleteOthers from '@/utils/deleteOthers.mjs';
import getTime from '@/utils/getTime.mjs';
import transformYoutuBeLink from '@/utils/transformYoutuBeLink.mjs';
import toast from 'react-hot-toast';

const VideoCard = ({ videoData, admin = false }) => {
    const { videoUrl, title, description, date, _id } = videoData;
    const videoURL = videoUrl.includes("youtu.be/") ? transformYoutuBeLink(videoUrl) : videoUrl 
    return (
        <div className="text-left lg:w-[350px] md:w-[300px]  whitespace-pre-wrap break-words greenbg dark:bg-[#333333] rounded-md shadow4">
            <div className="relative w-full h-0 pb-[56.25%] mb-4">
                <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-t-lg"
                    src={videoURL.replace('watch?v=', 'embed/')}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            {admin && <button className="btn-red" onClick={
                async () => {
                    const res = await deleteOthers(_id);
                   if(res.status===200){
                    toast.success(res?.message || "Success")
                   }else{
                    toast.error(res.message ||"Error")
                   }
                }}>
                Delete
            </button>}
            <div className='p-2'>
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-gray text-[10px]">{getTime(date)}</p>
                <p className="text-xs">{description}</p>
                <a  target='_blank' href={addSsToYtLink(videoURL)}><button className='p-[1px] rounded-md bg-blue-500 mt-2'>{downloadSVG()}</button></a>
            </div>

        </div>
    );
};

export default VideoCard;
