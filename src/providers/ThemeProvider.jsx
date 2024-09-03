import ThemeContext from "@/contexts/ThemeContext.mjs";
import getCookie from "@/utils/getCookie.mjs";
import setCookie from "@/utils/setCookie.mjs";
import { useEffect, useState } from "react";

const ThemeProvider = ({ children }) => {
    let storedTheme = getCookie("theme")
    const [theme, setTheme] = useState(storedTheme || 'light');

    useEffect(() => {
        let storedTheme = getCookie("theme");
        if (!storedTheme || !(storedTheme === "dark" || storedTheme === "light")) {
            storedTheme = window.matchMedia("(prefers-color-scheme: light)").matches
                ? "light"
                : "dark";
            setCookie("theme", storedTheme, 365); // Set the system theme if not in cookie
        }
        setTheme(storedTheme);
    }, []);

    useEffect(() => {
        document.querySelector("html").setAttribute("data-theme", theme);
    }, [theme]);

    useEffect(() => {
        const onChange = (e) => {
            const colorScheme = e.matches ? "dark" : "light";
            setTheme(colorScheme);
        };

        window
            .matchMedia("(prefers-color-scheme: light)")
            .addEventListener("change", onChange);

        return () => {
            window
                .matchMedia("(prefers-color-scheme: light)")
                .removeEventListener("change", onChange);
        };
    }, []);

    // const toggleTheme = () => {
    //     setTheme((preTheme) => {
    //         const currentTheme = preTheme === "dark" ? "light" : "dark";
    //         localStorage.setItem("theme", currentTheme);
    //         return currentTheme;
    //     });
    // };
    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === "dark" ? "light" : "dark";
            setCookie("theme", newTheme, 365); // Update theme cookie using setCookie
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;