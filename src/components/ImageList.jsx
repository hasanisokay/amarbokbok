
const ImageList = ({images}) => {
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
console.log(images)
    return (
        <div>
            
        </div>
    );
};

export default ImageList;