const transformYoutuBeLink = (youtubeUrl) => {
    try {
      const url = new URL(youtubeUrl);  
      if (url.hostname === "youtu.be") {
        const videoId = url.pathname.slice(1); 
        const queryParams = url.search; 

        const transformedUrl = `https://www.youtube.com/watch?v=${videoId}${queryParams}`;
  
        return transformedUrl;
      } else {
        throw new Error("Invalid shortened YouTube URL");
      }
    } catch (error) {
      console.error(error);
      return null; 
    }
  };
  
  export default transformYoutuBeLink;
  