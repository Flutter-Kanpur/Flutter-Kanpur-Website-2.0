"use client";

import { useEffect, useState } from "react";
import { Box, List, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { auth } from "@/firebase/config";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import DesktopProfilePage from "@/components/profile/DesktopProfilePage";
import MobileLayout from "@/components/layouts/MobileLayout";
import GradientHeader from "@/components/header/GradientHeader";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileSection from "@/components/profile/ProfileSection";
import ProfileItem from "@/components/profile/ProfileItem";
import LogoutDialog from "@/components/profile/LogoutDialog";

import Image from "next/image";


export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [openLogout, setOpenLogout] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const router = useRouter();

//   useEffect(() => {
    // const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //   if (currentUser) {
    //     setUser(currentUser);
    //   } else {
    //     router.push("/m-onboarding/m-login");
    //   }
    // });
//     return () => unsubscribe();
//   }, [router]);

//   const handleLogout = async () => {
//     await signOut(auth);
//     router.push("/m-onboarding/m-login");
//   };

  useEffect(() => {
    // temporary dummy user
    setUser({
      displayName: "Vaishnavi",
      email: "test@gmail.com",
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/m-onboarding/m-login");
  };

  return (
    // <Box
    //   sx={{
    //     maxWidth: 425,
    //     mx: "auto",
    //     minHeight: "100vh",
    //     backgroundColor: "#fff",
    //     pb: 12,
    //   }}
    // >
<>
    {/* Desktop + tablet */}
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <ProfileSidebar />
      <DesktopProfilePage />
    </Box>

      <MobileLayout>
    <GradientHeader
      title="My Profile"
      onBack={() => router.back()}
      sx={{ mb: "-100px" }}
    />
      {/* <GradientHeader
        title="My Profile"
        onBack={() => router.back()}
        sx={{ mb: '-100px' }}
      /> */}

      <Box sx={{ px: 2.5 }}>
        {user && (
          <>
            <ProfileInfo
              user={user}
              onEditClick={() => router.push("/profile/edit")}
            />

            <ProfileSection title="Account">
              <List disablePadding>
                <ProfileItem icon={
                  <Image
                  src="/assets/profile-page-assets/account_icon.svg"
                  alt="Account"
                  width={20}
                  height={20}
                  />
                  } 
                  text="Manage Profile"
                  onClick={() => router.push("/profile/manage")} />
                
                <ProfileItem icon={
                  <Image
                  src="/assets/profile-page-assets/security_icon.svg"
                  alt="Login"
                  width={20}
                  height={20}
                />
                } 
                text="Login & Security" 
                onClick={() => router.push("/profile/security")} />

                <ProfileItem
                    icon={
                      <Image
                        src="/assets/profile-page-assets/notification_icon.svg"
                        alt="Notifications"
                        width={20}
                        height={20}
                      />
                    }
                    text="Notifications"
                    onClick={() => router.push("/notifications")}
                    isLast
                  />
              </List>
            </ProfileSection>

            <ProfileSection title="My Activity">
              <List disablePadding>
                <ProfileItem icon={
                  <Image
                    src="/assets/profile-page-assets/event_icon.svg"
                    alt="Activity"
                    width={20}
                    height={20}
                    />
                  } 
                text="My Events" 
                onClick={() => router.push("/")} />

                <ProfileItem icon={
                  <Image
                    src="/assets/profile-page-assets/contest_icon.svg"
                    alt="contest"
                    width={20}
                    height={20}
                    />
                    } 
                    text="My Contests" onClick={() => { }} />

                <ProfileItem icon={
                  <Image
                    src="/assets/profile-page-assets/lightbulbOutlined_icon.svg"
                    alt="POTD"
                    width={20}
                    height={20} 
                    />
                  } 
                text="Problem of the Day" onClick={() => { }} isLast />
              </List>
            </ProfileSection>

            <ProfileSection title="Community">
              <List disablePadding>
                <ProfileItem icon={
                  <Image
                    src="/assets/profile-page-assets/myContribution_icon.svg"
                    alt="MyContribution"
                    width={20}
                    height={20}
                    />
                    } 
                  text="My Contributions" onClick={() => router.push("/profile/myContribution")} />
                
                <ProfileItem icon={
                  <Image
                    src="/assets/profile-page-assets/joinasContribution_icon.svg"
                    alt="JoinContribution"
                    width={20}
                    height={20} 
                    />
                  } 
                  text="Join as a Contributor" onClick={() => { }} />
                
                <ProfileItem icon={
                  <Image 
                    src="/assets/profile-page-assets/communityGuidelines_icon.svg"
                    alt="Guidelines"
                    width={20}
                    height={20}
                  />
                } 
                text="Community Guidelines" onClick={() => { }} isLast />
              </List>
            </ProfileSection>

            <ProfileSection title="Achievements">
              <List disablePadding>
                <ProfileItem icon={
                  <Image 
                    src="/assets/profile-page-assets/yourbadges_icon.svg"
                    alt="Badges"
                    width={20}
                    height={20}
                    />
                  } 
                  text="Your Badges" onClick={() => { }} />
                
                <ProfileItem icon={
                  <Image 
                    src="/assets/profile-page-assets/barChartOutlined_icon.svg"
                    alt="Rank"
                    width={20}
                    height={20} 
                  />
                } 
                text="Your Rank" onClick={() => { }} />
                
                <ProfileItem icon={
                  <Image 
                    src="/assets/profile-page-assets/leaderBoardOutlined_icon.svg"
                    alt="Leaderboard"
                    width={20}
                    height={20} 
                  />} text="Leaderboard" onClick={() => { }} isLast />
              </List>
            </ProfileSection>

            <ProfileSection title="Support">
              <List disablePadding>
                <ProfileItem icon={
                  <Image 
                    src="/assets/profile-page-assets/helpOutline_icon.svg"
                    alt="Help"
                    width={20}
                    height={20} 
                  />
                } 
                text="Help Center" onClick={() => { }} />
                
                <ProfileItem icon={
                  <Image 
                    src="/assets/profile-page-assets/chatBubbleOutlin_icon.svg"
                    alt="contact"
                    width={20}
                    height={20} 
                  />
                } 
                text="Contact Community Team" onClick={() => { }} />
                
                <ProfileItem icon={
                  <Image 
                    src="/assets/profile-page-assets/reportProblemOutline_icon.svg"
                    alt="Report"
                    width={20}
                    height={20}
                  />
                } 
                  text="Report an Issue" onClick={() => { }} isLast />
              </List>
            </ProfileSection>

            <ProfileSection title="About & Legal">
              <List disablePadding>
                <ProfileItem icon={
                  <Image 
                    src="/assets/profile-page-assets/infoOutlined_icon.svg"
                    alt="Info"
                    width={20}
                    height={20}
                  />
                } 
                text="About Flutter Kanpur" onClick={() => { }} />
                
                <ProfileItem icon={
                  <Image 
                    src="/assets/profile-page-assets/privacyTipOutlined_icon.svg"
                    alt="Privacy"
                    width={20}
                    height={20}
                  />
                } 
                text="Privacy Policy" onClick={() => { }} />
                
                <ProfileItem icon={
                  <Image 
                    src="/assets/profile-page-assets/descriptionOutlined_icon.svg"
                    alt="Terms"
                    width={20}
                    height={20} 
                  />
                } 
                text="Terms of Use" onClick={() => { }} isLast />
              </List>
            </ProfileSection>

            <ProfileSection title="Account Actions">
              <List disablePadding>
                <ProfileItem
                  icon={
                    < Image
                      src="/assets/profile-page-assets/logout_icon.svg"
                      alt="Logout"
                      width={20}
                      height={20}
                    />
                }
                  text="Log out"
                  color="#D32F2F"
                  onClick={() => setOpenLogout(true)}
                />
                <ProfileItem
                  icon={
                  <Image
                    src="/assets/profile-page-assets/deleteOutlined_icon.svg"
                    alt="Delete"
                    width={20}
                    height={20} 
                  />
                }
                  text="Delete account"
                  color="#D32F2F"
                  onClick={() => setOpenDelete(true)}
                  isLast
                />
              </List>
            </ProfileSection>
          </>
        )}
      </Box>

      <LogoutDialog
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        onConfirm={handleLogout}
      />
 </MobileLayout>
</>
    // </Box>
  );
}
