'use client';
import { createContext, useState, useEffect } from 'react';
export const Context = createContext();
export const ContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode])

  return (
    <Context.Provider value={{
      darkMode, setDarkMode,
    }}>
      {children}
    </Context.Provider>
  );
};