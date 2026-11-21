'use client';
import React, { useMemo, useState, useEffect } from 'react';
import {
    Box,
    Avatar,
    Typography,
    useTheme,
    useMediaQuery,
    Skeleton,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from 'next/image';
import Link from 'next/link';
import FlutterNavbarIcon from '@/../public/assets/landing-page-assets/flutter-navbar-icon.svg';
import PaddingContainer from '../PaddingContainer';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

const EXCLUDE_ROUTES = [
    '/eventsDetail/', // treat this as a prefix
];

const TopNavbar = () => {
    const path = usePathname();
    const theme = useTheme();

    const [currentUser, setCurrentUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        let isCancelled = false;

        if (!supabase) {
            Promise.resolve().then(() => {
                if (!isCancelled) setLoadingUser(false);
            });
            return;
        }

        const fetchProfile = async (authUser) => {
            if (!authUser) {
                if (!isCancelled) {
                    setCurrentUser(null);
                    setLoadingUser(false);
                }
                return;
            }

            const meta = authUser.user_metadata || {};
            const emailName = authUser.email ? authUser.email.split('@')[0] : '';
            const fallbackName =
                meta.username ||
                meta.full_name ||
                emailName ||
                'User';

            let name = fallbackName;
            let avatar = meta.avatar_url || meta.picture || null;

            try {
                const { data: profile, error } = await supabase
                    .from('users')
                    .select('display_name, full_name, username, photo_url')
                    .eq('uid', authUser.id)
                    .maybeSingle();

                if (!error && profile) {
                    name =
                        profile.display_name?.trim() ||
                        profile.full_name?.trim() ||
                        profile.username?.trim() ||
                        fallbackName;

                    avatar = profile.photo_url || avatar;
                }
            } catch (err) {
                console.error('Error fetching user profile:', err);
            }

            if (!isCancelled) {
                setCurrentUser({ name, avatar });
                setLoadingUser(false);
            }
        };

        supabase.auth
            .getUser()
            .then(({ data: { user } }) => {
                if (!isCancelled) {
                    fetchProfile(user);
                }
            })
            .catch(() => {
                if (!isCancelled) {
                    setLoadingUser(false);
                }
            });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!isCancelled) {
                fetchProfile(session?.user || null);
            }
        });

        return () => {
            isCancelled = true;
            subscription?.unsubscribe();
        };
    }, []);

    const shouldHide = useMemo(() => {
        return EXCLUDE_ROUTES.some((route) => {
            // Exact match
            if (route === path) return true;
            // Prefix match for dynamic routes
            if (route.endsWith('/') && path.startsWith(route)) return true;
            return false;
        });
    }, [path]);

    const isTabletOrDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    if (!isTabletOrDesktop) return null;

    // Blogs is proxied to the separate readme deploy via next.config rewrites
    // (/blogs → BLOGS_UPSTREAM_URL). Same product URL space, independent app.
    const links = [
        { id: 1, name: 'Home', route: '/' },
        { id: 2, name: 'Explore', route: '/explore' },
        { id: 3, name: 'Community', route: '/community' },
        { id: 4, name: 'Practice', route: '' },
        { id: 5, name: 'Forum', route: '' },
        { id: 6, name: 'Blogs', route: '/blogs' },
    ];

    let userSection;
    if (loadingUser) {
        userSection = (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 1.5,
                }}
            >
                <Skeleton variant="circular" width={32} height={32} />
            </Box>
        );
    } else if (currentUser) {
        userSection = (
            <Link href="/profile" style={{ textDecoration: 'none' }}>
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
                        alt={currentUser.name}
                        src={currentUser.avatar || undefined}
                        sx={{
                            width: 32,
                            height: 32,
                            bgcolor: '#1A73E8',
                            fontSize: '14px',
                            fontWeight: 500,
                        }}
                    >
                        {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                    </Avatar>
                    <Typography
                        sx={{
                            fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
                            fontSize: '16px',
                            fontWeight: 400,
                            color: '#000',
                        }}
                    >
                        {currentUser.name}
                    </Typography>
                    <KeyboardArrowDownIcon sx={{ color: '#1A73E8', fontSize: 24 }} />
                </Box>
            </Link>
        );
    } else {
        userSection = (
            <Link href="/auth/login" style={{ textDecoration: 'none' }}>
                <Box
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        px: 2.5,
                        py: 0.75,
                        borderRadius: '100px',
                        backgroundColor: '#0a0a0a',
                        color: '#ffffff',
                        fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
                        fontSize: '15px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            backgroundColor: '#000000',
                            opacity: 0.9,
                        },
                    }}
                >
                    Login
                </Box>
            </Link>
        );
    }

    return (
        <PaddingContainer style={{ pt: { sm: 2.5, md: 5 } }}>
            <Box
                sx={{
                    display: shouldHide ? 'none' : 'flex',
                    flexDirection: 'row',
                    mx: 'auto',
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
                    {links.map((item) => {
                        const hasRoute = Boolean(item.route);
                        const isActive =
                            hasRoute &&
                            (item.route === '/'
                                ? path === '/'
                                : path === item.route || path.startsWith(`${item.route}/`));

                        const label = (
                            <Typography
                                sx={{
                                    fontFamily: 'var(--font-product-sans), "Product Sans", sans-serif',
                                    fontSize: { sm: '14px', md: '15px', lg: '16px' },
                                    fontWeight: isActive ? 600 : 400,
                                    color: isActive ? '#000' : '#5F6368',
                                    whiteSpace: 'nowrap',
                                    transition: 'color 0.2s ease-in-out',
                                    cursor: hasRoute ? 'pointer' : 'default',
                                    opacity: hasRoute ? 1 : 0.55,
                                    '&:hover': hasRoute ? { color: '#000' } : undefined,
                                }}
                            >
                                {item.name}
                            </Typography>
                        );

                        if (!hasRoute) {
                            return (
                                <Box key={item.id} component="span" aria-disabled="true">
                                    {label}
                                </Box>
                            );
                        }

                        return (
                            <Link
                                key={item.id}
                                href={item.route}
                                style={{ textDecoration: 'none' }}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </Box>
                <Box sx={{ flexShrink: 0 }}>{userSection}</Box>
            </Box>
        </PaddingContainer>
    );
};

export default TopNavbar;
