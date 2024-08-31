import deleteOthers from '@/utils/deleteOthers.mjs';
import getTime from '@/utils/getTime.mjs';
import React from 'react';
import toast from 'react-hot-toast';

const VideoCard = ({ videoData, admin = false }) => {
    const { videoUrl, title, description, date, _id } = videoData;

    return (
        <div className="text-left lg:w-[350px] md:w-[300px] video-card-w  whitespace-pre-wrap break-words greenbg rounded-md shadow4">
            <div className="relative w-full h-0 pb-[56.25%] mb-4">
                <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-t-lg"
                    src={videoUrl.replace('watch?v=', 'embed/')}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            {admin && <button className="btn-red" onClick={
                async () => {
                    const res = await deleteOthers(_id);
                    console.log(res)
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
            </div>

        </div>
    );
};

export default VideoCard;
