'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const NavbarContext = createContext();

export const useNavbar = () => {
    const context = useContext(NavbarContext);
    if (!context) {
        throw new Error('useNavbar must be used within a NavbarProvider');
    }
    return context;
};

export const NavbarProvider = ({ children }) => {
    const pathname = usePathname();

    const [selectedButton, setSelectedButton] = useState({
        Home: false,
        Team: false,
        Blog: false,
        Jobs: false,
        Community: false,
        Explore: false,
    });

    // Update selected button based on current pathname
    useEffect(() => {
        const newState = {
            Home: pathname === '/',
            Team: pathname === '/members',
            Blog: pathname === '/blog2' || pathname.includes("blogscreen"),
            Jobs: pathname === '/jobs',
            Community: pathname === '/communityPage' || pathname.includes("forum"),
            Explore: pathname === '/explore',
        };
        setSelectedButton(newState);
    }, [pathname]);

    const updateSelectedButton = (buttonName) => {
        setSelectedButton(prev => ({
            Home: false,
            Team: false,
            Blog: false,
            Jobs: false,
            Community: false,
            Explore: false,
            [buttonName]: true,
        }));
    };

    const value = {
        selectedButton,
        updateSelectedButton,
    };

    return (
        <NavbarContext.Provider value={value}>
            {children}
        </NavbarContext.Provider>
    );
};
