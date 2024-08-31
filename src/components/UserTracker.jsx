'use client'
import increaseTotalUsers from '@/serverActions/increaseTotalUsers.mjs';
import { useEffect } from 'react';

const UserTracker = () => {
    useEffect(() => {
        // Check if the user already has a unique identifier cookie
        // const userId = getCookie('userId');

        // if (!userId) {
        //     // If not, create a new identifier and set it as a cookie
        //     const newUserId = generateUniqueId();
        //     setCookie('userId', newUserId, 365); // Expire after 1 year
        //     // Start the 10-second timer for new users
        //     startTracking();
        // }
        startTracking()
    }, []);

    const startTracking = () => {
        const timer = setTimeout(() => {
            // If the user stays for 10 seconds, increase total users count
            increaseTotalUsers();
        }, 10000); // 10,000 milliseconds = 10 seconds
        return () => clearTimeout(timer); // Clear timer on unmount
    };

    // const generateUniqueId = () => {
    //     return 'xxxx-xxxx-xxxx-xxxx'.replace(/x/g, () =>
    //         (Math.random() * 16 | 0).toString(16)
    //     );
    // };

    // const setCookie = (name, value, days) => {
    //     const expires = new Date();
    //     expires.setDate(expires.getDate() + days);
    //     document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    // };

    // const getCookie = (name) => {
    //     const nameEQ = `${name}=`;
    //     const cookies = document.cookie.split(';');
    //     for (let i = 0; i < cookies.length; i++) {
    //         let c = cookies[i];
    //         while (c.charAt(0) === ' ') c = c.substring(1);
    //         if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    //     }
    //     return null;
    // };

    return null;
};

export default UserTracker;
