'use client';

import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import CustomButton from '../buttons/customNavbarButton/customButton';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useNavbar } from '@/contexts/NavbarContext';

const NavbarComponent = () => {
    const router = useRouter();
    const pathname = usePathname();

    const { selectedButton, updateSelectedButton } = useNavbar();
    const auth = getAuth();

    // Hide navbar on onboarding, Explore page, and full-screen Explore sub-pages (mobile-style)
    if (pathname?.startsWith('/onboarding')) {
        return null;
    }
    if (pathname === '/explore' || pathname === '/suggestedjobs2' || pathname === '/blog2' || pathname === '/coreteam' || pathname === '/projects' || pathname === '/event2' || pathname === '/contest2' || pathname?.startsWith('/opencalls')) {
        return null;
    }

    const navItems = [
        { index: 1, text: "Home", onClick: () => router.push("/"), selected: selectedButton.Home },
        { index: 2, text: "Community", onClick: () => router.push("/communityPage"), selected: selectedButton.Community },
        { index: 3, text: "Explore", onClick: () => router.push("/explore"), selected: selectedButton.Explore },
        { index: 4, text: "Team", onClick: () => router.push("/members"), selected: selectedButton.Team },
        { index: 5, text: "Blog", onClick: () => router.push("/blog2"), selected: selectedButton.Blog },
    ];

    const [loginDialogOpen, setLoginDialogOpen] = useState(false);
    const [signupDialogOpen, setSignupDialogOpen] = useState(false);

    const [signUpData, setSignUpData] = useState({
        userName: "",
        password: "",
        confirmPassword: "",
        email: "",
    });

    const [loginData, setloginData] = useState({
        email: "",
        password: "",
    });

    const [user, setUser] = useState(null);

    // Track login state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLoginClick = () => {
        setLoginDialogOpen(true);
    };

    const handleCloseLoginDialog = () => {
        setLoginDialogOpen(false);
    };

    const handleShowSignupDialog = () => {
        setSignupDialogOpen(true);
    };

    const handleCloseSignupDialog = () => {
        setSignupDialogOpen(false);
    };

    const handleShowLoginDialog = () => {
        setLoginDialogOpen(true);
    };

    function useMounted() {
        const [mounted, setMounted] = React.useState(false);

        React.useEffect(() => {
            setMounted(true);
        }, []);

        return mounted;
    }
    const mounted = useMounted();

    if (!mounted) {
        return (
            <Box
                sx={{
                    height: 80,
                    minHeight: 80,
                }}
            />
        );
    }




    return (
        <>
            <Box
                sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1100,
                    height: 80,
                    minHeight: 80,
                    boxSizing: 'border-box',
                    px: { xs: 2, md: 7 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'rgba(1, 10, 16, 0.65)',
                    ...(mounted && {
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                    }),
                }}
            >
                <Box
                    onClick={() => router.push('/')}
                    sx={{
                        cursor: 'pointer',
                        '&:hover': {
                            opacity: 0.8
                        }
                    }}
                >
                    <Image src="/landingPageIcons/flutter_icon.svg" height={56} width={56} alt="Flutter Logo" />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: "14.4px" }}>
                    {navItems.map((item) => (
                        <CustomButton
                            key={item.index}
                            onClick={() => {
                                item.onClick();
                                updateSelectedButton(item.text);
                            }}
                            selected={item.selected}
                            text={item.text}
                        />
                    ))}

                    {/* Conditional Login / Logout */}
                    {user ? (
                        <LogoutButton /> // Show logout if logged in
                    ) : (
                        <CustomButton
                            selected={false}
                            text="Login"
                            onClick={handleLoginClick}
                        />
                    )}

                </Box>
            </Box>

            <LoginDialog
                setloginData={setloginData}
                loginData={loginData}
                open={loginDialogOpen}
                onClose={handleCloseLoginDialog}
                onShowSignup={handleShowSignupDialog}
            />

            {/* <SignupDialog
                signUpData={signUpData}
                setSignUpData={setSignUpData}
                open={signupDialogOpen}
                onClose={handleCloseSignupDialog}
                onShowLogin={handleShowLoginDialog}
            /> */}
        </>
    );
};

export default NavbarComponent;
