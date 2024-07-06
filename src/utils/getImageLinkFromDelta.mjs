
const getImageLinkFromDelta = (delta) => {
    const data = delta?.ops?.find(op => op?.insert?.customImage?.url)
    return data ? data?.insert?.customImage?.url: "";
};

export default getImageLinkFromDelta;