import { useState, useEffect } from 'react';

export const useTheme = () => {
    const [theme] = useState('light');

    useEffect(() => {
        document.body.dataset.theme = 'light';
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#000000';
    }, []);

    const toggleTheme = () => {};

    return { theme, toggleTheme };
};
