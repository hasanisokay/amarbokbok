'use client'
import { useContext } from "react";
import AudioCard from "./AudioCard";
import Masonry from 'react-masonry-css';
import AuthContext from "@/contexts/AuthContext.mjs";
const AudioList = ({ audios }) => {
    const { currentUser } = useContext(AuthContext);
    let columnCountTab
    let columnCountDefault
    if (audios?.length === 1) {
        columnCountDefault = 1;
        columnCountTab = 1;
    } else if (audios?.length === 2) {
        columnCountDefault = 2;
        columnCountTab = 2;
    } else if (audios?.length > 2) {
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
                audios?.map((a, index) => (
                    <AudioCard a={a} index={index} key={a?._id} admin={currentUser ? true : false} />
                ))
            }
        </Masonry>
    );


};

export default AudioList;