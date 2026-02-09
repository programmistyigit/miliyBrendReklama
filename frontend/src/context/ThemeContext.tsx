import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: (e?: React.MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('theme') as Theme;
            if (stored) return stored;
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
    });

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);

        // Update CSS variables for toast
        const style = document.documentElement.style;
        if (theme === 'dark') {
            style.setProperty('--toast-bg', '#1e293b');
            style.setProperty('--toast-color', '#f1f5f9');
        } else {
            style.setProperty('--toast-bg', '#ffffff');
            style.setProperty('--toast-color', '#0f172a');
        }
    }, [theme]);

    const toggleTheme = useCallback((e?: React.MouseEvent) => {
        const newTheme = theme === 'light' ? 'dark' : 'light';

        // Create circle animation
        if (e) {
            const circle = document.createElement('div');
            circle.className = 'theme-transition-circle';
            circle.style.left = `${e.clientX}px`;
            circle.style.top = `${e.clientY}px`;
            circle.style.width = '10px';
            circle.style.height = '10px';
            circle.style.background = newTheme === 'dark' ? '#0f172a' : '#ffffff';
            document.body.appendChild(circle);

            setTimeout(() => {
                setTheme(newTheme);
                setTimeout(() => circle.remove(), 600);
            }, 100);
        } else {
            setTheme(newTheme);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
