const addSsToYtLink = (youtubeUrl) => {
    try {
      const url = new URL(youtubeUrl);
  
      // Check if the URL is a valid YouTube link
      if (
        url.hostname === "www.youtube.com" ||
        url.hostname === "youtube.com" ||
        url.hostname === "youtu.be"
      ) {
        if (url.hostname === "youtu.be") {
          // Convert shortened YouTube URLs (e.g., https://youtu.be/xyz) to standard format
          const videoId = url.pathname.slice(1); // Extract video ID from pathname
          url.hostname = "youtube.com";
          url.pathname = "/watch";
          url.searchParams.set("v", videoId);
        }
  
        // Remove 'www.' if present and add 'ss' to the hostname
        url.hostname = url.hostname.replace("www.", "ss");
        url.hostname =  url.hostname;
  
        return url.toString();
      } else {
        throw new Error("Invalid YouTube URL");
      }
    } catch (error) {
      console.error(error);
      return null; // Return null if the URL is invalid
    }
  };
  
  export default addSsToYtLink;
  