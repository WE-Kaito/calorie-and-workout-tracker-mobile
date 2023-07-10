import React, { createContext, useState } from 'react';

const themes= {
    default: {
        primary: "#6E85B7",
        secondary: "#14244E",
        tertiary: "#F8F9D7",
        black: "#191A1C",
        white: "ghostwhite",
        accentPositive: "aquamarine",
        accentNegative: "lightcoral",
        backAlt: "#c4d7e0",
        positive: "#00A36C",
        negative: "crimson",
        whiteAlt: "#D9D9D9",
    },
    bonbon: {
        primary: "#a12353",
        secondary: "#f0edef",
        tertiary: "#4BC4F7",
        black: "ghostwhite",
        white: "#170c1c",
        accentPositive: "#6893ee",
        accentNegative: "#bf1944",
        backAlt: "#ff91af",
        positive: "#2e62d1",
        negative: "#f80947",
        whiteAlt: "#2f2642",
    },
    black: {
        primary: "#F5F5F5",
        secondary: "#121212",
        tertiary: "#F05454",
        black: "#3A3A3A",
        white: "#374f66",
        accentPositive: "#00a6ed",
        accentNegative: "#FF6347",
        backAlt: "#CCCCCC",
        positive: "#0080FF",
        negative: "#683a9c",
        whiteAlt: "#D9D9D9",
    }
}

export const ThemeContext = createContext({});

export default function ThemeProvider({ children }) {
    const [currentTheme, setCurrentTheme] = useState(themes.default);

    const toggleTheme = () => {
        setCurrentTheme((prevTheme) => {
            const themeKeys = Object.keys(themes);
            const currentThemeIndex = themeKeys.indexOf(prevTheme);
            const nextThemeIndex = (currentThemeIndex + 1) % themeKeys.length;
            return themes[themeKeys[nextThemeIndex]];
        });
    };

    return (
        <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}