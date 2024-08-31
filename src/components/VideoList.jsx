'use client'
import { useContext } from "react";
import Masonry from 'react-masonry-css';
import AuthContext from "@/contexts/AuthContext.mjs";
import VideoCard from "./VideoCard";
const VideoList = ({ videos }) => {
    const { currentUser } = useContext(AuthContext);
    let columnCountTab
    let columnCountDefault
    if (videos?.length === 1) {
        columnCountDefault = 1;
        columnCountTab = 1;
    } else if (videos?.length === 2) {
        columnCountDefault = 2;
        columnCountTab = 2;
    } else if (videos?.length > 2) {
        columnCountDefault = 3
        columnCountTab = 2
    }

    const breakpointColumnsObj = {
        default: columnCountDefault,
        1100: columnCountTab,
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