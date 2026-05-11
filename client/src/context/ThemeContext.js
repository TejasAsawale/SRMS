// import React, { createContext, useState, useEffect, useContext } from 'react';

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//     // Logic: Initialize state from LocalStorage
//     const [theme, setTheme] = useState(() => {
//         const savedTheme = localStorage.getItem('theme');
//         return savedTheme ? savedTheme : 'light';
//     });

//     // Logic: Toggle function
//     const toggleTheme = () => {
//         setTheme((prevTheme) => {
//             const newTheme = prevTheme === 'light' ? 'dark' : 'light';
//             localStorage.setItem('theme', newTheme);
//             return newTheme;
//         });
//     };

//     // Logic: Apply theme class to body and handle global cleanup
//     useEffect(() => {
//         // Remove existing theme classes first to avoid "light-theme dark-theme" double classes
//         document.body.classList.remove('light-theme', 'dark-theme');
//         document.body.classList.add(`${theme}-theme`);
        
//         // Optional: Update meta tag for mobile browser address bar color
//         const metaThemeColor = document.querySelector('meta[name="theme-color"]');
//         if (metaThemeColor) {
//             metaThemeColor.setAttribute('content', theme === 'dark' ? '#1a1a2e' : '#e85d0a');
//         }
//     }, [theme]);

//     return (
//         <ThemeContext.Provider value={{ theme, toggleTheme }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// };

// // Custom Hook for easy access
// export const useTheme = () => {
//     const context = useContext(ThemeContext);
//     if (context === undefined) {
//         throw new Error('useTheme must be used within a ThemeProvider');
//     }
//     return context;
// };

import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        // If no saved theme, default to 'light'
        return savedTheme ? savedTheme : 'light';
    });

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    };

    useEffect(() => {
        // 1. Clean up ALL possible theme classes to prevent conflicts
        document.body.classList.remove('light-theme', 'dark-theme');
        
        // 2. Add the current theme class
        document.body.classList.add(`${theme}-theme`);
        
        // 3. IMPORTANT: Also set a data-attribute. 
        // This is much easier to target in Dashboard.css
        document.documentElement.setAttribute('data-theme', theme);

        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#1a1a2e' : '#ffffff');
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};