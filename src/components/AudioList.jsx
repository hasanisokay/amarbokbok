import AudioCard from "./AudioCard";
import Masonry from 'react-masonry-css';
const AudioList = ({ audios }) => {
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
                audios?.map((a, index) => (
                    <AudioCard a={a} index={index} key={a?._id} admin={true} />
                ))
            }
        </Masonry>
    );


};

export default AudioList;