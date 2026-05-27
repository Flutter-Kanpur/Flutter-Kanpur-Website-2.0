"use client";

import { useEffect, useState, useRef } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Avatar,
//   IconButton,
//   MenuItem,
//   InputAdornment,
// } from "@mui/material";

// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import LanguageIcon from "@mui/icons-material/Language";
// import Link from "next/link";
// import CheckIcon from "@mui/icons-material/Check";
// import { auth } from "@/firebase/config";
// import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
// import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
// import { initializeApp, getApps, getApp } from "firebase/app";
// import GradientHeader from "@/components/header/GradientHeader";
// import RevampButton from "@/components/buttons/revampbutton/RevampButton";
import ProfileAvatarCard from "@/components/profile/edit/ProfileAvatarCard";
import ProfileBasicInfo from "@/components/profile/edit/ProfileBasicInfo";
import SocialLinksSection from "@/components/profile/edit/SocialLinksSection";
import SuccessOverlay from "@/components/profile/edit/SuccessOverlay";
import ActionButtons from "@/components/profile/edit/ActionButtons";
import { Box } from "@mui/material";
import GradientHeader from "@/components/header/GradientHeader";
import MobileLayout from "@/components/layouts/MobileLayout";

export default function EditProfilePage() {
  const router = useRouter();
//   const auth = getAuth();
//   const db = getFirestore();
//   const storage = getStorage();

const dummyUser = {
  uid: "123",
  displayName: "Vaishnavi Gupta",
  email: "vaishnavi@example.com",
  photoURL: "",
};

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [experience, setExperience] = useState("0–1 years");
  const [githubLink, setGithubLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//         setName(currentUser.displayName || "");
//         setPhotoURL(currentUser.photoURL || "");

//         try {
//           const docRef = doc(db, "users", currentUser.uid);
//           const docSnap = await getDoc(docRef);

//           if (docSnap.exists()) {
//             const data = docSnap.data();
//             setUsername(data.username || "");
//             setAbout(data.about || "");
//             setExperience(data.experience || "0–1 years");
//             setGithubLink(data.socialLinks?.github || "");
//             setLinkedinLink(data.socialLinks?.linkedin || "");
//             setWebsiteLink(data.socialLinks?.website || "");
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }

//       } else {
//         router.push("/");
//       }
//     });

useEffect(() => {
  setUser(dummyUser);
  setName(dummyUser.displayName);
  setPhotoURL(dummyUser.photoURL);
  setUsername("vaishnavi");
  setAbout("Flutter Kanpur community member");
  setExperience("0–1 years");
}, []);

const handleImageClick = () => {
  fileInputRef.current?.click();
};


const handleFileChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    setSelectedFile(file);
    setPhotoURL(URL.createObjectURL(file));
  }
};

//     return () => unsubscribe();
//   }, [auth, router, db]);
//   const handleImageClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setPhotoURL(URL.createObjectURL(file));
//     }
//   };

//   const handleUpdate = async () => {
//     if (!user) return;
//     setLoading(true);

//     try {
//       let finalPhotoURL = photoURL;

//       if (selectedFile) {
//         const storageRef = ref(storage, `profile_images/${user.uid}`);
//         await uploadBytes(storageRef, selectedFile);
//         finalPhotoURL = await getDownloadURL(storageRef);
//       }

//       await updateProfile(user, {
//         displayName: name,
//         photoURL: finalPhotoURL,
//       });

//       await setDoc(doc(db, "users", user.uid), {
//         username: username,
//         about: about,
//         experience: experience,
//         socialLinks: {
//           github: githubLink,
//           linkedin: linkedinLink,
//           website: websiteLink,
//         },
//         email: user.email,
//       }, { merge: true });

//       setShowSuccess(true);

//       setTimeout(() => {
//         setShowSuccess(false);
//         router.back();
//       }, 2000);

//     } catch (error) {
//       console.error(error);
//       alert("Error updating profile: " + error.message);
//     }
//     setLoading(false);
//   };

const handleUpdate = async () => {
  setLoading(true);

  setTimeout(() => {
    setLoading(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      router.back();
    }, 2000);
  }, 800);
};

//   return (
//     <Box
//       sx={{
//         maxWidth: 393,
//         mx: "auto",
//         minHeight: "100vh",
//         backgroundColor: "#fff",
//         position: "relative",
//         overflow: "hidden",
//         fontFamily: "sans-serif",
//         pointerEvents: "auto",
//       }}
//     >
//       <GradientHeader
//         title="Edit Profile"
//         onBack={() => router.back()}
//         sx={{ mb: '-60px' }}
//       />
//       {showSuccess && (
//         <Box
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0, 0, 0, 0.75)",
//             zIndex: 9999,
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Box
//             sx={{
//               width: 80,
//               height: 80,
//               borderRadius: "50%",
//               border: "4px solid white",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               mb: 2,
//             }}
//           >
//             <CheckIcon sx={{ color: "white", fontSize: 50 }} />
//           </Box>
//           <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
//             Profile updated
//           </Typography>
//         </Box>
//       )}

//       <Box sx={{ position: "relative", zIndex: 1, p: 2 }}>

//         {user && (
//           <Box component="form" noValidate autoComplete="off">
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 p: 2,
//                 mb: 3,
//                 borderRadius: 4,
//                 backgroundColor: "#fff",
//                 border: "1px solid #E0E0E0",
//                 boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
//               }}
//             >
//               <Avatar src={photoURL} sx={{ width: 64, height: 64, mr: 2 }}>
//                 {!photoURL && name?.[0]}
//               </Avatar>
//               <Box>
//                 <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
//                   {name || "User Name"}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   color="primary"
//                   sx={{ cursor: "pointer", fontWeight: 500 }}
//                   onClick={handleImageClick}
//                 >
//                   Change photo
//                 </Typography>
//                 <input
//                   type="file"
//                   hidden
//                   ref={fileInputRef}
//                   accept="image/*"
//                   onChange={handleFileChange}
//                 />
//               </Box>
//             </Box>
//             <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
//               Username
//             </Typography>
//             <TextField
//               fullWidth
//               placeholder="Enter username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: 3, backgroundColor: "#fff" } }}
//             />

//             <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
//               About me
//             </Typography>
//             <TextField
//               fullWidth
//               multiline
//               rows={4}
//               placeholder="Write a little bit about yourself..."
//               value={about}
//               onChange={(e) => setAbout(e.target.value)}
//               helperText={`${about.length}/150`}
//               inputProps={{ maxLength: 150 }}
//               FormHelperTextProps={{ sx: { textAlign: "right" } }}
//               sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: 3, backgroundColor: "#fff" } }}
//             />

//             <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
//               Years of Experience
//             </Typography>
//             <TextField
//               select
//               fullWidth
//               value={experience}
//               onChange={(e) => setExperience(e.target.value)}
//               sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: 3, backgroundColor: "#fff" } }}
//             >
//               <MenuItem value="0–1 years">0–1 years</MenuItem>
//               <MenuItem value="1–3 years">1–3 years</MenuItem>
//               <MenuItem value="3–5 years">3–5 years</MenuItem>
//               <MenuItem value="5+ years">5+ years</MenuItem>
//             </TextField>

//             <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
//               Work & social links
//             </Typography>
//             <TextField
//               fullWidth
//               placeholder="github.com/username"
//               value={githubLink}
//               onChange={(e) => setGithubLink(e.target.value)}
//               InputProps={{
//                 startAdornment: <InputAdornment position="start"><GitHubIcon sx={{ color: "#000" }} /></InputAdornment>,
//               }}
//               sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: 3, backgroundColor: "#fff" } }}
//             />
//             <TextField
//               fullWidth
//               placeholder="linkedin.com/in/username"
//               value={linkedinLink}
//               onChange={(e) => setLinkedinLink(e.target.value)}
//               InputProps={{
//                 startAdornment: <InputAdornment position="start"><LinkedInIcon sx={{ color: "#000" }} /></InputAdornment>,
//               }}
//               sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: 3, backgroundColor: "#fff" } }}
//             />
//             <TextField
//               fullWidth
//               placeholder="https://yourwebsite.com"
//               value={websiteLink}
//               onChange={(e) => setWebsiteLink(e.target.value)}
//               InputProps={{
//                 startAdornment: <InputAdornment position="start"><LanguageIcon sx={{ color: "#000" }} /></InputAdornment>,
//               }}
//               sx={{ mb: 4, "& .MuiOutlinedInput-root": { borderRadius: 3, backgroundColor: "#fff" } }}
//             />

//             <RevampButton
//               text={loading ? "Updating..." : "Submit"}
//               onClick={handleUpdate}
//               disabled={loading}
//             />
//             <Button
//               fullWidth
//               variant="text"
//               onClick={() => router.back()}
//               sx={{ mt: 1, color: "#000", textTransform: "none", fontSize: "1rem" }}
//             >
//               Cancel
//             </Button>
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// }



// export default function EditProfilePage() {

//     const [showSuccess, setShowSuccess] = useState(false);

  return (
//     <Box
//    sx={{
//   maxWidth: 425,
//   mx: "auto",
//   minHeight: "100vh",
//   display: { xs: "block", md: "none" }
// }}
//     >
<MobileLayout>
    <GradientHeader
    title="Edit profile"
    onBack={() => router.back()}
        sx={{ mb: "-60px" }}
    />

      {showSuccess && <SuccessOverlay />}

      <Box sx={{ position: "relative", zIndex: 1, p: 2 }}>
        {user && (
          <Box component="form">

            <ProfileAvatarCard
              name={name}
              photoURL={photoURL}
              handleImageClick={handleImageClick}
              fileInputRef={fileInputRef}
              handleFileChange={handleFileChange}
            />

            <ProfileBasicInfo
              username={username}
              setUsername={setUsername}
              about={about}
              setAbout={setAbout}
              experience={experience}
              setExperience={setExperience}
            />

            <SocialLinksSection
              githubLink={githubLink}
              setGithubLink={setGithubLink}
              linkedinLink={linkedinLink}
              setLinkedinLink={setLinkedinLink}
              websiteLink={websiteLink}
              setWebsiteLink={setWebsiteLink}
            />

            <ActionButtons
              loading={loading}
              handleUpdate={handleUpdate}
              router={router}
            />

          </Box>
        )}
      </Box>
    {/* </Box> */}
    </MobileLayout>
  );
}