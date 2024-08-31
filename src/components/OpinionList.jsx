'use client'
import Masonry from 'react-masonry-css';
import OpinionCard from './OpinionCard';



const OpinionList = ({ opinions }) => {

  let columnCountTab
    let columnCountDefault
    if (opinions?.length === 1) {
        columnCountDefault = 1;
        columnCountTab = 1;
    } else if (opinions?.length === 2) {
        columnCountDefault = 2;
        columnCountTab = 2;
    } else if (opinions?.length > 2) {
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
      {opinions?.map(opinion => (
        <OpinionCard key={opinion._id} opinion={opinion} />
      ))}
    </Masonry>
  );
};

export default OpinionList;