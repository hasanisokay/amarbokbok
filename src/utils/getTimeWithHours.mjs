const getTimeWithHours = (s) => {
    const date = new Date(s);

    // Get hours and minutes
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';

    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12 || 12;

    // Format the date
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();

    // Return the formatted string
    return `${hours}:${minutes}${ampm}, ${day}${getOrdinalSuffix(day)} ${month} ${year}`;
};

// Helper function to get the ordinal suffix for a day (st, nd, rd, th)
const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
};


export default getTimeWithHours;