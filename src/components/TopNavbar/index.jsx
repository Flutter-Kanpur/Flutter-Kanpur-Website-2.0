'use client'
import React, { useMemo } from 'react';
import {
    Box,
    Avatar,
    Typography,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from 'next/image';
import Link from 'next/link';
import FlutterNavbarIcon from '@/../public/assets/landing-page-assets/flutter-navbar-icon.svg';
import PaddingContainer from '../PaddingContainer';
import { usePathname } from 'next/navigation';

const TopNavbar = () => {
    const path = usePathname();
    console.log(path, "path");
    const theme = useTheme();

    const excludeRoutes = [
        '/eventsPage',
        '/about',
        '/contact',
        '/eventsDetail/', // treat this as a prefix
    ];

    const shouldHide = useMemo(() => {
        return excludeRoutes.some((route) => {
            // Exact match
            if (route === path) return true;
            // Prefix match for dynamic routes
            if (route.endsWith('/') && path.startsWith(route)) return true;
            return false;
        });
    }, [path]);


    const isTabletOrDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    if (!isTabletOrDesktop) return null;

    const links = [
        { id: 1, name: 'About', route: '/about' },
        { id: 2, name: 'Explore', route: '/explore' },
        { id: 3, name: 'Community', route: '/community' },
        { id: 4, name: 'Practice', route: '/practice' },
        { id: 5, name: 'Forum', route: '/forum' },
        { id: 6, name: 'Jobs', route: '/jobs' },
    ];

    const userSection = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 1.5,
                cursor: 'pointer',
                '&:hover': { opacity: 0.8 },
            }}
        >
            <Avatar
                alt="User Avatar"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 32, height: 32 }}
            />
            <Typography
                sx={{
                    fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
                    fontSize: '16px',
                    fontWeight: 400,
                    color: '#000',
                }}
            >
                Angelica_21
            </Typography>
            <KeyboardArrowDownIcon sx={{ color: '#1A73E8', fontSize: 24 }} />
        </Box>
    );

    return (
        <PaddingContainer>
            <Box
                sx={{
                    display: shouldHide ? 'none' : 'flex',
                    flexDirection: 'row',
                    mx: 'auto',
                    mt: 4,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    maxWidth: 1040,
                    width: '100%',
                    minWidth: 0,
                    paddingY: 1,
                    background: '#FFFFFF',
                    border: '1px solid #E2E2E2',
                    borderRadius: { xs: '100px', sm: '100px' },
                    px: { xs: 2, sm: 2.5, md: 3 },
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                    position: 'sticky',
                    top: 20,
                    zIndex: 1000,
                }}
            >
                {/* Logo Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                    <Link href="/" style={{ display: 'flex' }}>
                        <Image
                            src={FlutterNavbarIcon}
                            alt="Flutter Navbar Icon"
                            width={40}
                            height={40}
                        />
                    </Link>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: { sm: 2, md: 2.5, lg: 3 },
                        minWidth: 0,
                        flex: '1 1 auto',
                        justifyContent: 'center',
                    }}
                >
                    {links.map((item) => (
                        <Box
                            key={item.id}
                            // href={item.route}
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
                                    fontSize: { sm: '14px', md: '15px', lg: '16px' },
                                    fontWeight: 400,
                                    color: '#5F6368',
                                    whiteSpace: 'nowrap',
                                    transition: 'color 0.2s ease-in-out',
                                    '&:hover': { color: '#000' },
                                }}
                            >
                                {item.name}
                            </Typography>
                        </Box>
                    ))}
                </Box>
                <Box sx={{ flexShrink: 0 }}>{userSection}</Box>
            </Box>
        </PaddingContainer>
    );
};

export default TopNavbar;
