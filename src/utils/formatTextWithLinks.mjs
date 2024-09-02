const formatTextWithLinks =(text)=> {
 // Regular expression to find URLs in the text
 const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/g;

 // Split the text based on the URLs
 const parts = text.split(urlRegex);

 // Extract URLs from the text
 const urls = text.match(urlRegex) || [];

 // Build the final formatted HTML string
 let formattedText = `
     <p style="
         overflow-y: auto;
         white-space: pre-wrap;
         overflow-wrap: break-word;
         ">`;
 parts.forEach((part, index) => {
     formattedText += part; // Add the text part
     if (urls[index]) {
         formattedText += `<a href="${urls[index]}" target="_blank" style="color: #1875ba;">${urls[index]}</a>`; 
     }
 });
 formattedText += "</p>";

 return formattedText;
}

export default formatTextWithLinks;