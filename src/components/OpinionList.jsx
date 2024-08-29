'use client'
import Masonry from 'react-masonry-css';
import OpinionCard from './OpinionCard';

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1
};

const OpinionList = ({ opinions }) => {
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