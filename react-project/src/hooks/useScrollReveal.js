import { useEffect } from 'react';

export const useScrollReveal = (selector = '.reveal', threshold = 0.15) => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    // Slight stagger for elements that appear together
                    const delay = (i % 3) * 0.1; 
                    entry.target.style.transitionDelay = `${delay}s`;
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold });

        const elements = document.querySelectorAll(selector);
        elements.forEach(el => observer.observe(el));

        return () => {
            elements.forEach(el => observer.unobserve(el));
        };
    }, [selector, threshold]);
};
