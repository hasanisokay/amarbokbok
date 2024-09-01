'use client'
import Masonry from "react-masonry-css";
import ImageCard from "./ImageCard";
import AuthContext from "@/contexts/AuthContext.mjs";
import { useContext } from "react";

const ImageList = ({ images }) => {
  const { currentUser } = useContext(AuthContext);
  let columnCountTab
  let columnCountDefault
  if (images?.length === 1) {
    columnCountDefault = 1;
    columnCountTab = 1;
  } else if (images?.length === 2) {
    columnCountDefault = 2;
    columnCountTab = 2;
  } else if (images?.length > 2) {
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
        images?.map((i, index) => <ImageCard i={i} key={i._id} index={index} admin={currentUser ? true : false} />)
      }
    </Masonry>
  );
};

export default ImageList;