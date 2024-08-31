'use client'
import { useContext } from "react";
import Masonry from 'react-masonry-css';
import AuthContext from "@/contexts/AuthContext.mjs";
import VideoCard from "./VideoCard";
const VideoList = ({ videos }) => {
    const { currentUser } = useContext(AuthContext);
    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
        768: 1
    };
    return (
        <Masonry
    
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
        >
            {
                videos?.map((v, index) => (
                    <VideoCard  videoData={v} index={index} key={v?._id} admin={currentUser ? true : false} />
                ))
            }
        </Masonry>
    );


};

export default VideoList;