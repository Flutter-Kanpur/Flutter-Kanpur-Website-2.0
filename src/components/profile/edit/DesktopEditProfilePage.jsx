// "use client";

// import {
//   Box, Button, Typography, Avatar, TextField, Paper, Chip,
//   Divider, Switch, InputAdornment
// } from "@mui/material";

// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// import SearchIcon from "@mui/icons-material/Search";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import LanguageIcon from "@mui/icons-material/Language";
// import EditIcon from "@mui/icons-material/Edit";

// const skills = ["UI Design", "Flutter Developer", "abcdefg", "Web Developer", "Figma"];
// const addSkills = ["Flutter", "Dart", "Figma", "Kubernetes", "Docker", "Kafka", "Prisma", "Canva", "JavaScript", "Mongo", "Postgres"];

// export default function DesktopEditProfilePage() {
//   return (
//     <Box
//       sx={{
//         flex: 1,
//         minWidth: 0,
//         width: "100%",
//         px: { sm: 2, md: 3, lg: 5 },
//         py: 4,
//         display: { xs: "none", sm: "block" },
//         overflowX: "hidden",
//       }}
//     >
//       <Button
//         startIcon={<ArrowBackIosNewIcon sx={{ fontSize: { sm: 14, md: 16 } }} />}
//         variant="outlined"
//         size="small"
//         sx={{
//           textTransform: "none",
//           borderRadius: { sm: "10px", md: "12px" },
//           color: "#333",
//           borderColor: "#ddd",
//           mb: { sm: 3, md: 6 },
//           height: { sm: 36, md: 40, lg: 44 },
//           px: { sm: 1.5, md: 2 },
//           fontSize: { sm: "13px", md: "14px", lg: "15px" },
//           fontWeight: 500,
//           width: "fit-content",
//           minWidth: "auto",
//         }}
//       >
//         Back
//       </Button>

//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: { sm: "1fr", lg: "1fr 320px" },
//           gap: { sm: 3, lg: 6 },
//         }}
//       >
//         {/* LEFT FORM */}
//         <Box sx={{ maxWidth: 720, minWidth: 0, width: "100%" }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 5 }}>
//             <Avatar src="/assets/profile-page-assets/profile.png" sx={{ width: 92, height: 92 }} />

//             <Box>
//               <Box sx={{ display: "flex", gap: 2, mb: 1.5 }}>
//                 <Button variant="outlined" sx={btnStyle}>Change photo</Button>
//                 <Button variant="outlined" sx={{ ...btnStyle, color: "#ff3b3b" }}>
//                   Remove Photo
//                 </Button>
//               </Box>

//               <Typography sx={{ color: "#555", fontSize: 14 }}>
//                 At least 800*800 px recommended. <br />
//                 JPG or PNG is allowed.
//               </Typography>
//             </Box>
//           </Box>

//           <Typography sx={titleStyle}>Personal information</Typography>

//           <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, mb: 3 }}>
//             <Input label="Full name" value="test" />
//             <Input label="Username" value="test12" />
//           </Box>

//           <Typography sx={titleStyle}>Location</Typography>
//           <TextField
//             fullWidth
//             size="small"
//             defaultValue="kanpur"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <LocationOnOutlinedIcon />
//                 </InputAdornment>
//               ),
//             }}
//             sx={fieldStyle}
//           />

//           <Typography sx={{ ...titleStyle, mt: 4 }}>Bio</Typography>
//           <TextField
//             fullWidth
//             multiline
//             minRows={6}
//             placeholder="Tell us about yourself (Max 500 Characters)"
//             sx={fieldStyle}
//             helperText="0/500"
//             FormHelperTextProps={{ sx: { textAlign: "right" } }}
//           />

//           <Divider sx={{ my: 4 }} />

//           <Typography sx={titleStyle}>Skills</Typography>
//           <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mb: 4 }}>
//             {skills.map((item) => (
//               <Chip key={item} label={item} variant="outlined" sx={chipStyle} />
//             ))}
//           </Box>

//           <Divider sx={{ mb: 4 }} />

//           <Typography sx={titleStyle}>Social Links</Typography>
//           <SocialLinks />
//         </Box>

//         {/* RIGHT EDIT CARD */}
//         <Paper
//           variant="outlined"
//           sx={{
//             borderRadius: 4,
//             p: 3,
//             height: "fit-content",
//           }}
//         >
//           <Typography sx={{ fontSize: 22, fontWeight: 600, mb: 3 }}>Edit</Typography>

//           <Typography sx={titleStyle}>Add skills</Typography>

//           <TextField
//             fullWidth
//             size="small"
//             placeholder="Search roles or skills..."
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <SearchIcon sx={{ color: "#999" }} />
//                 </InputAdornment>
//               ),
//             }}
//             sx={fieldStyle}
//           />

//           <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
//             {addSkills.map((item) => (
//               <Chip key={item} label={item} variant="outlined" sx={chipStyle} />
//             ))}
//           </Box>

//           <Typography sx={{ color: "#4568ff", mt: 2, cursor: "pointer" }}>
//             Add other
//           </Typography>

//           <Divider sx={{ my: 4 }} />

//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//             <Typography sx={titleStyle}>Social Links</Typography>
//             <Button size="small" startIcon={<EditIcon />} sx={{ textTransform: "none" }}>
//               Edit
//             </Button>
//           </Box>

//           <SocialLinks />

//           <Divider sx={{ my: 4 }} />

//           <Typography sx={titleStyle}>Profile Visibility</Typography>

//           <VisibilityRow text="Show profile publicly" />
//           <VisibilityRow text="how badges on profile" />
//           <VisibilityRow text="Show activity history" />
//         </Paper>
//       </Box>

//       <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 6 }}>
//         <Button variant="outlined" sx={{ ...btnStyle, width: 170 }}>
//           Cancel
//         </Button>
//         <Button
//           variant="contained"
//           sx={{
//             width: 180,
//             borderRadius: 5,
//             textTransform: "none",
//             bgcolor: "#050505",
//             "&:hover": { bgcolor: "#222" },
//           }}
//         >
//           Save Changes
//         </Button>
//       </Box>
//     </Box>
//   );
// }

// function Input({ label, value }) {
//   return (
//     <Box>
//       <Typography sx={{ color: "#444", fontSize: 14, mb: 0.5, fontWeight: 500 }}>{label}</Typography>
//       <TextField fullWidth size="small" defaultValue={value} sx={fieldStyle} />
//     </Box>
//   );
// }

// function SocialLinks() {
//   const links = [
//     [<LinkedInIcon />, "https://www.linkedin.com/in/username"],
//     [<GitHubIcon />, "https://github.com/username"],
//     [<LanguageIcon />, "https://username.in"],
//   ];

//   return (
//     <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
//       {links.map(([icon, text], index) => (
//         <Box
//           key={text}
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 2,
//             px: 2,
//             py: 1.2,
//             borderBottom: index !== links.length - 1 ? "1px solid #eee" : "none",
//           }}
//         >
//           {icon}
//           <Typography>{text}</Typography>
//         </Box>
//       ))}
//     </Paper>
//   );
// }

// function VisibilityRow({ text }) {
//   return (
//     <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 2 }}>
//       <Typography sx={{ fontSize: 16 }}>{text}</Typography>
//       <Switch defaultChecked />
//     </Box>
//   );
// }

// const titleStyle = {
//   fontSize: 16,
//   fontWeight: 600,
//   mb: 1,
//   color: "#1a1a1a",
// };

// const btnStyle = {
//   textTransform: "none",
//   borderRadius: 2,
//   borderColor: "#ddd",
//   color: "#555",
// };

// const fieldStyle = {
//   "& .MuiOutlinedInput-root": {
//     borderRadius: 2,
//   },
// };

// const chipStyle = {
//   borderRadius: "20px",
//   px: 1,
// };

// "use client";

// import {
//   Box,
//   Button,
//   Typography,
//   Avatar,
//   TextField,
//   Paper,
//   Chip,
//   MenuItem,
//   InputAdornment,
// } from "@mui/material";

// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// import SearchIcon from "@mui/icons-material/Search";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import LanguageIcon from "@mui/icons-material/Language";

// import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/navigation";

// import { supabase } from "@/lib/supabase/client";

// // --------------------------------------------------
// // AVAILABLE SKILLS
// // --------------------------------------------------

// const availableSkills = [
//   "Flutter",
//   "Dart",
//   "Figma",
//   "Kubernetes",
//   "Docker",
//   "Kafka",
//   "Prisma",
//   "Canva",
//   "JavaScript",
//   "Mongo",
//   "Postgres",
//   "React",
//   "Node.js",
//   "Express.js",
//   "Next.js",
//   "TypeScript",
//   "Firebase",
//   "Supabase",
//   "Tailwind CSS",
//   "Git",
// ];

// // --------------------------------------------------
// // COMPONENT
// // --------------------------------------------------

// export default function DesktopEditProfilePage() {
//   const router = useRouter();

//   // ------------------------------------------------
//   // USER / LOADING
//   // ------------------------------------------------

//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   // ------------------------------------------------
//   // PROFILE
//   // ------------------------------------------------

//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [bio, setBio] = useState("");
//   const [experience, setExperience] = useState("0–1 years");

//   // Your current users table screenshot did not
//   // confirm a location column.
//   // So this remains UI-only for now.
//   const [location, setLocation] = useState("");

//   // ------------------------------------------------
//   // SOCIAL LINKS
//   // ------------------------------------------------

//   const [githubLink, setGithubLink] = useState("");
//   const [linkedinLink, setLinkedinLink] = useState("");
//   const [websiteLink, setWebsiteLink] = useState("");

//   // ------------------------------------------------
//   // PHOTO
//   // ------------------------------------------------

//   const [photoURL, setPhotoURL] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);

//   const fileInputRef = useRef(null);

//   // ------------------------------------------------
//   // SKILLS
//   // ------------------------------------------------

//   const [skills, setSkills] = useState([]);
//   const [skillSearch, setSkillSearch] = useState("");

//   // ------------------------------------------------
//   // EXPERIENCE HELPERS
//   // ------------------------------------------------

//   const experienceToLabel = (years) => {
//     const value = Number(years);

//     if (Number.isNaN(value) || value <= 1) {
//       return "0–1 years";
//     }

//     if (value <= 3) {
//       return "1–3 years";
//     }

//     if (value <= 5) {
//       return "3–5 years";
//     }

//     return "5+ years";
//   };

//   const experienceToNumber = (value) => {
//     switch (value) {
//       case "0–1 years":
//         return 1;

//       case "1–3 years":
//         return 3;

//       case "3–5 years":
//         return 5;

//       case "5+ years":
//         return 6;

//       default:
//         return 1;
//     }
//   };

//   // ------------------------------------------------
//   // FILTER AVAILABLE SKILLS
//   // ------------------------------------------------

//   const filteredSkills = availableSkills.filter((skill) => {
//     const matchesSearch = skill
//       .toLowerCase()
//       .includes(skillSearch.toLowerCase());

//     const notAlreadySelected =
//       !skills.includes(skill);

//     return matchesSearch && notAlreadySelected;
//   });

//   // ------------------------------------------------
//   // LOAD PROFILE
//   // ------------------------------------------------

//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         setLoading(true);

//         // ------------------------------------------
//         // 1. Get currently logged-in user
//         // ------------------------------------------

//         const {
//           data: { user: authUser },
//           error: authError,
//         } = await supabase.auth.getUser();

//         if (authError) {
//           console.error(
//             "AUTH USER ERROR:",
//             authError
//           );

//           router.push("/Auth/login");
//           return;
//         }

//         if (!authUser) {
//           router.push("/Auth/login");
//           return;
//         }

//         setUser(authUser);

//         console.log(
//           "DESKTOP EDIT AUTH USER:",
//           authUser
//         );

//         // ------------------------------------------
//         // 2. Get user profile from users table
//         // ------------------------------------------

//         const {
//           data: profile,
//           error: profileError,
//         } = await supabase
//           .from("users")
//           .select("*")
//           .eq("uid", authUser.id)
//           .maybeSingle();

//         if (profileError) {
//           console.error(
//             "PROFILE FETCH ERROR:",
//             profileError
//           );

//           return;
//         }

//         console.log(
//           "DESKTOP EDIT PROFILE:",
//           profile
//         );

//         // ------------------------------------------
//         // 3. Populate profile fields
//         // ------------------------------------------

//         if (profile) {
//           setName(
//             profile.full_name ||
//               profile.display_name ||
//               authUser.user_metadata?.full_name ||
//               authUser.user_metadata?.username ||
//               ""
//           );

//           setUsername(
//             profile.username ||
//               authUser.user_metadata?.username ||
//               ""
//           );

//           setBio(profile.bio || "");

//           setExperience(
//             experienceToLabel(
//               profile.years_of_experience
//             )
//           );

//           setGithubLink(
//             profile.github_url || ""
//           );

//           setLinkedinLink(
//             profile.linkedin_url || ""
//           );

//           setWebsiteLink(
//             profile.website_url || ""
//           );

//           setPhotoURL(
//             profile.photo_url || ""
//           );

//           // Only use location if your table
//           // actually contains this property.
//           setLocation(
//             profile.location || ""
//           );
//         } else {
//           // ----------------------------------------
//           // Fallback to Auth metadata
//           // ----------------------------------------

//           setName(
//             authUser.user_metadata?.full_name ||
//               authUser.user_metadata?.username ||
//               ""
//           );

//           setUsername(
//             authUser.user_metadata?.username ||
//               ""
//           );

//           setBio("");

//           setExperience("0–1 years");

//           setGithubLink("");
//           setLinkedinLink("");
//           setWebsiteLink("");

//           setPhotoURL(
//             authUser.user_metadata?.avatar_url ||
//               ""
//           );
//         }

//         // ------------------------------------------
//         // 4. Fetch skills from user_skills table
//         // ------------------------------------------

//         const {
//           data: userSkills,
//           error: skillsError,
//         } = await supabase
//           .from("user_skills")
//           .select("skill_name")
//           .eq("user_uid", authUser.id);

//         if (skillsError) {
//           console.error(
//             "SKILLS FETCH ERROR:",
//             skillsError
//           );

//           setSkills([]);
//         } else {
//           const skillNames = (userSkills || [])
//             .map((item) => item.skill_name)
//             .filter(Boolean);

//           setSkills(skillNames);

//           console.log(
//             "USER SKILLS:",
//             skillNames
//           );
//         }
//       } catch (error) {
//         console.error(
//           "LOAD PROFILE ERROR:",
//           error
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProfile();
//   }, [router]);

//   // ------------------------------------------------
//   // IMAGE PICKER
//   // ------------------------------------------------

//   const handleImageClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       alert("Please select an image file.");
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       alert("Image must be smaller than 5MB.");
//       return;
//     }

//     setSelectedFile(file);

//     const previewURL =
//       URL.createObjectURL(file);

//     setPhotoURL(previewURL);
//   };

//   // ------------------------------------------------
//   // REMOVE PHOTO
//   // ------------------------------------------------

//   const handleRemovePhoto = () => {
//     setSelectedFile(null);
//     setPhotoURL("");
//   };

//   // ------------------------------------------------
//   // UPLOAD PHOTO
//   // ------------------------------------------------

//   const uploadProfileImage = async () => {
//     if (!selectedFile || !user) {
//       return photoURL;
//     }

//     const extension =
//       selectedFile.name.split(".").pop() ||
//       "jpg";

//     const filePath =
//       `${user.id}/profile.${extension}`;

//     const {
//       error: uploadError,
//     } = await supabase.storage
//       .from("avatars")
//       .upload(
//         filePath,
//         selectedFile,
//         {
//           upsert: true,
//           contentType: selectedFile.type,
//         }
//       );

//     if (uploadError) {
//       console.error(
//         "IMAGE UPLOAD ERROR:",
//         uploadError
//       );

//       throw uploadError;
//     }

//     const {
//       data: { publicUrl },
//     } = supabase.storage
//       .from("avatars")
//       .getPublicUrl(filePath);

//     return publicUrl;
//   };

//   // ------------------------------------------------
//   // ADD SKILL
//   // ------------------------------------------------

//   const handleAddSkill = (skill) => {
//     setSkills((previous) => {
//       if (previous.includes(skill)) {
//         return previous;
//       }

//       return [...previous, skill];
//     });

//     setSkillSearch("");
//   };

//   // ------------------------------------------------
//   // REMOVE SKILL
//   // ------------------------------------------------

//   const handleRemoveSkill = (skill) => {
//     setSkills((previous) =>
//       previous.filter(
//         (item) => item !== skill
//       )
//     );
//   };

//   // ------------------------------------------------
//   // SAVE PROFILE
//   // ------------------------------------------------

//   const handleSave = async () => {
//     if (!user) return;

//     try {
//       setSaving(true);

//       // ------------------------------------------
//       // 1. Upload photo if changed
//       // ------------------------------------------

//       let finalPhotoURL = photoURL;

//       if (selectedFile) {
//         finalPhotoURL =
//           await uploadProfileImage();
//       }

//       // ------------------------------------------
//       // 2. Update users table
//       // ------------------------------------------

//       const {
//         error: updateError,
//       } = await supabase
//         .from("users")
//         .update({
//           display_name:
//             name.trim(),

//           full_name:
//             name.trim(),

//           username:
//             username.trim(),

//           bio:
//             bio.trim(),

//           years_of_experience:
//             experienceToNumber(
//               experience
//             ),

//           github_url:
//             githubLink.trim(),

//           linkedin_url:
//             linkedinLink.trim(),

//           website_url:
//             websiteLink.trim(),

//           photo_url:
//             finalPhotoURL || null,

//           updated_at:
//             new Date().toISOString(),
//         })
//         .eq("uid", user.id);

//       if (updateError) {
//         console.error(
//           "PROFILE UPDATE ERROR:",
//           updateError
//         );

//         throw updateError;
//       }

//       // ------------------------------------------
//       // 3. Remove previous skills
//       // ------------------------------------------

//       const {
//         error: deleteSkillsError,
//       } = await supabase
//         .from("user_skills")
//         .delete()
//         .eq("user_uid", user.id);

//       if (deleteSkillsError) {
//         console.error(
//           "DELETE OLD SKILLS ERROR:",
//           deleteSkillsError
//         );

//         throw deleteSkillsError;
//       }

//       // ------------------------------------------
//       // 4. Insert current skills
//       // ------------------------------------------

//       if (skills.length > 0) {
//         const skillsToInsert =
//           skills.map((skill) => ({
//             user_uid: user.id,
//             skill_name: skill,
//           }));

//         const {
//           error: insertSkillsError,
//         } = await supabase
//           .from("user_skills")
//           .insert(
//             skillsToInsert
//           );

//         if (insertSkillsError) {
//           console.error(
//             "INSERT SKILLS ERROR:",
//             insertSkillsError
//           );

//           throw insertSkillsError;
//         }
//       }

//       // ------------------------------------------
//       // 5. Update Supabase Auth metadata
//       // ------------------------------------------

//       const {
//         error: authUpdateError,
//       } = await supabase.auth.updateUser({
//         data: {
//           username:
//             username.trim(),

//           full_name:
//             name.trim(),

//           avatar_url:
//             finalPhotoURL || null,
//         },
//       });

//       if (authUpdateError) {
//         console.error(
//           "AUTH METADATA UPDATE ERROR:",
//           authUpdateError
//         );

//         // Don't fail the whole profile update
//         // because the users table was already saved.
//       }

//       // ------------------------------------------
//       // 6. Reset local state
//       // ------------------------------------------

//       setSelectedFile(null);

//       console.log(
//         "PROFILE + SKILLS UPDATED SUCCESSFULLY"
//       );

//       alert(
//         "Profile updated successfully!"
//       );

//       router.push("/profile");
//     } catch (error) {
//       console.error(
//         "SAVE PROFILE ERROR:",
//         error
//       );

//       alert(
//         error?.message ||
//           "Failed to update profile."
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ------------------------------------------------
//   // LOADING
//   // ------------------------------------------------

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           width: "100%",
//           minHeight: "100vh",
//           display: {
//             xs: "none",
//             sm: "flex",
//           },
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         Loading profile...
//       </Box>
//     );
//   }

//   // ------------------------------------------------
//   // UI
//   // ------------------------------------------------

//   return (
//     <Box
//       sx={{
//         flex: 1,
//         minWidth: 0,
//         width: "100%",
//         px: {
//           sm: 2,
//           md: 3,
//           lg: 5,
//         },
//         py: 4,
//         display: {
//           xs: "none",
//           sm: "block",
//         },
//         overflowX: "hidden",
//       }}
//     >
//       {/* ------------------------------------------ */}
//       {/* BACK */}
//       {/* ------------------------------------------ */}

//       <Button
//         startIcon={
//           <ArrowBackIosNewIcon
//             sx={{
//               fontSize: {
//                 sm: 14,
//                 md: 16,
//               },
//             }}
//           />
//         }
//         variant="outlined"
//         size="small"
//         onClick={() => router.back()}
//         disabled={saving}
//         sx={{
//           textTransform: "none",

//           borderRadius: {
//             sm: "10px",
//             md: "12px",
//           },

//           color: "#333",

//           borderColor: "#ddd",

//           mb: {
//             sm: 3,
//             md: 6,
//           },

//           height: {
//             sm: 36,
//             md: 40,
//             lg: 44,
//           },

//           px: {
//             sm: 1.5,
//             md: 2,
//           },

//           fontSize: {
//             sm: "13px",
//             md: "14px",
//             lg: "15px",
//           },

//           fontWeight: 500,

//           width: "fit-content",

//           minWidth: "auto",

//           "&:hover": {
//             borderColor: "#ddd",
//             backgroundColor: "#fff",
//           },
//         }}
//       >
//         Back
//       </Button>

//       {/* ------------------------------------------ */}
//       {/* MAIN GRID */}
//       {/* ------------------------------------------ */}

//       <Box
//         sx={{
//           display: "grid",

//           gridTemplateColumns: {
//             sm: "1fr",
//             lg: "1fr 320px",
//           },

//           gap: {
//             sm: 3,
//             lg: 6,
//           },
//         }}
//       >
//         {/* ======================================== */}
//         {/* LEFT */}
//         {/* ======================================== */}

//         <Box
//           sx={{
//             maxWidth: 720,
//             minWidth: 0,
//             width: "100%",
//           }}
//         >
//           {/* -------------------------------------- */}
//           {/* PHOTO */}
//           {/* -------------------------------------- */}

//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 3,
//               mb: 5,
//               flexWrap: "wrap",
//             }}
//           >
//             <Avatar
//               src={photoURL || ""}
//               sx={{
//                 width: 92,
//                 height: 92,
//                 fontSize: 32,
//                 fontWeight: 700,
//               }}
//             >
//               {!photoURL &&
//                 (
//                   name?.[0] ||
//                   "U"
//                 ).toUpperCase()}
//             </Avatar>

//             <Box>
//               <Box
//                 sx={{
//                   display: "flex",
//                   gap: 2,
//                   mb: 1.5,
//                   flexWrap: "wrap",
//                 }}
//               >
//                 <Button
//                   variant="outlined"
//                   onClick={handleImageClick}
//                   disabled={saving}
//                   sx={btnStyle}
//                 >
//                   Change photo
//                 </Button>

//                 <Button
//                   variant="outlined"
//                   onClick={
//                     handleRemovePhoto
//                   }
//                   disabled={saving}
//                   sx={{
//                     ...btnStyle,
//                     color: "#ff3b3b",
//                   }}
//                 >
//                   Remove Photo
//                 </Button>

//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   hidden
//                   accept="image/*"
//                   onChange={
//                     handleFileChange
//                   }
//                 />
//               </Box>

//               <Typography
//                 sx={{
//                   color: "#555",
//                   fontSize: 14,
//                 }}
//               >
//                 At least 800*800 px
//                 recommended.
//                 <br />
//                 JPG or PNG is allowed.
//               </Typography>
//             </Box>
//           </Box>

//           {/* -------------------------------------- */}
//           {/* PERSONAL INFORMATION */}
//           {/* -------------------------------------- */}

//           <Typography sx={titleStyle}>
//             Personal information
//           </Typography>

//           <Box
//             sx={{
//               display: "grid",

//               gridTemplateColumns: {
//                 sm: "1fr",
//                 md: "1fr 1fr",
//               },

//               gap: 4,

//               mb: 3,
//             }}
//           >
//             <Input
//               label="Full name"
//               value={name}
//               onChange={setName}
//               disabled={saving}
//             />

//             <Input
//               label="Username"
//               value={username}
//               onChange={setUsername}
//               disabled={saving}
//             />
//           </Box>

//           {/* -------------------------------------- */}
//           {/* LOCATION */}
//           {/* -------------------------------------- */}

//           <Typography sx={titleStyle}>
//             Location
//           </Typography>

//           <TextField
//             fullWidth
//             size="small"
//             value={location}
//             onChange={(event) =>
//               setLocation(
//                 event.target.value
//               )
//             }
//             disabled={saving}
//             placeholder="Enter location"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <LocationOnOutlinedIcon />
//                 </InputAdornment>
//               ),
//             }}
//             sx={fieldStyle}
//           />

//           {/* -------------------------------------- */}
//           {/* BIO */}
//           {/* -------------------------------------- */}

//           <Typography
//             sx={{
//               ...titleStyle,
//               mt: 4,
//             }}
//           >
//             Bio
//           </Typography>

//           <TextField
//             fullWidth
//             multiline
//             minRows={6}
//             value={bio}
//             onChange={(event) =>
//               setBio(event.target.value)
//             }
//             disabled={saving}
//             placeholder="Tell us about yourself (Max 500 Characters)"
//             inputProps={{
//               maxLength: 500,
//             }}
//             helperText={`${bio.length}/500`}
//             FormHelperTextProps={{
//               sx: {
//                 textAlign: "right",
//               },
//             }}
//             sx={fieldStyle}
//           />

//           {/* -------------------------------------- */}
//           {/* EXPERIENCE */}
//           {/* -------------------------------------- */}

//           <Typography
//             sx={{
//               ...titleStyle,
//               mt: 4,
//             }}
//           >
//             Years of Experience
//           </Typography>

//           <TextField
//             select
//             fullWidth
//             size="small"
//             value={experience}
//             onChange={(event) =>
//               setExperience(
//                 event.target.value
//               )
//             }
//             disabled={saving}
//             sx={fieldStyle}
//           >
//             <MenuItem value="0–1 years">
//               0–1 years
//             </MenuItem>

//             <MenuItem value="1–3 years">
//               1–3 years
//             </MenuItem>

//             <MenuItem value="3–5 years">
//               3–5 years
//             </MenuItem>

//             <MenuItem value="5+ years">
//               5+ years
//             </MenuItem>
//           </TextField>

//           {/* -------------------------------------- */}
//           {/* SELECTED SKILLS */}
//           {/* -------------------------------------- */}

//           <Box sx={{ mt: 4 }}>
//             <Typography sx={titleStyle}>
//               Skills
//             </Typography>

//             <Box
//               sx={{
//                 display: "flex",
//                 gap: 1.5,
//                 flexWrap: "wrap",
//                 mb: 2,
//               }}
//             >
//               {skills.length === 0 ? (
//                 <Typography
//                   sx={{
//                     color: "#777",
//                     fontSize: 14,
//                   }}
//                 >
//                   No skills added yet.
//                 </Typography>
//               ) : (
//                 skills.map((skill) => (
//                   <Chip
//                     key={skill}
//                     label={skill}
//                     onDelete={() =>
//                       handleRemoveSkill(
//                         skill
//                       )
//                     }
//                     disabled={saving}
//                     variant="outlined"
//                     sx={chipStyle}
//                   />
//                 ))
//               )}
//             </Box>
//           </Box>

//           {/* -------------------------------------- */}
//           {/* SOCIAL LINKS */}
//           {/* -------------------------------------- */}

//           <Box sx={{ mt: 4 }}>
//             <Typography sx={titleStyle}>
//               Social Links
//             </Typography>

//             <SocialLinks
//               githubLink={githubLink}
//               linkedinLink={linkedinLink}
//               websiteLink={websiteLink}
//               setGithubLink={
//                 setGithubLink
//               }
//               setLinkedinLink={
//                 setLinkedinLink
//               }
//               setWebsiteLink={
//                 setWebsiteLink
//               }
//               disabled={saving}
//             />
//           </Box>
//         </Box>

//         {/* ======================================== */}
//         {/* RIGHT */}
//         {/* ======================================== */}

//         <Paper
//           variant="outlined"
//           sx={{
//             borderRadius: 4,
//             p: 3,
//             height: "fit-content",
//           }}
//         >
//           <Typography
//             sx={{
//               fontSize: 22,
//               fontWeight: 600,
//               mb: 3,
//             }}
//           >
//             Edit
//           </Typography>

//           {/* -------------------------------------- */}
//           {/* ADD SKILLS */}
//           {/* -------------------------------------- */}

//           <Typography sx={titleStyle}>
//             Add skills
//           </Typography>

//           <TextField
//             fullWidth
//             size="small"
//             placeholder="Search roles or skills..."
//             value={skillSearch}
//             onChange={(event) =>
//               setSkillSearch(
//                 event.target.value
//               )
//             }
//             disabled={saving}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <SearchIcon
//                     sx={{
//                       color: "#999",
//                     }}
//                   />
//                 </InputAdornment>
//               ),
//             }}
//             sx={fieldStyle}
//           />

//           <Box
//             sx={{
//               display: "flex",
//               gap: 1,
//               flexWrap: "wrap",
//               mt: 2,
//             }}
//           >
//             {filteredSkills.map(
//               (skill) => (
//                 <Chip
//                   key={skill}
//                   label={skill}
//                   variant="outlined"
//                   onClick={() =>
//                     handleAddSkill(
//                       skill
//                     )
//                   }
//                   disabled={saving}
//                   sx={{
//                     ...chipStyle,

//                     cursor: "pointer",

//                     "&:hover": {
//                       backgroundColor:
//                         "#f4f6ff",
//                     },
//                   }}
//                 />
//               )
//             )}
//           </Box>

//           {skillSearch &&
//             filteredSkills.length ===
//               0 && (
//               <Typography
//                 sx={{
//                   color: "#777",
//                   fontSize: 13,
//                   mt: 2,
//                 }}
//               >
//                 No matching skills
//                 found.
//               </Typography>
//             )}

//           {/* -------------------------------------- */}
//           {/* SELECTED SKILLS */}
//           {/* -------------------------------------- */}

//           <Typography
//             sx={{
//               ...titleStyle,
//               mt: 3,
//             }}
//           >
//             Selected skills
//           </Typography>

//           <Box
//             sx={{
//               display: "flex",
//               gap: 1,
//               flexWrap: "wrap",
//             }}
//           >
//             {skills.length === 0 ? (
//               <Typography
//                 sx={{
//                   color: "#777",
//                   fontSize: 13,
//                 }}
//               >
//                 No skills selected.
//               </Typography>
//             ) : (
//               skills.map((skill) => (
//                 <Chip
//                   key={skill}
//                   label={skill}
//                   onDelete={() =>
//                     handleRemoveSkill(
//                       skill
//                     )
//                   }
//                   disabled={saving}
//                   sx={{
//                     borderRadius:
//                       "20px",
//                   }}
//                 />
//               ))
//             )}
//           </Box>

//           {/* -------------------------------------- */}
//           {/* SOCIAL LINKS */}
//           {/* -------------------------------------- */}

//           <Box
//             sx={{
//               mt: 4,
//               pt: 3,
//               borderTop:
//                 "1px solid #eee",
//             }}
//           >
//             <Typography sx={titleStyle}>
//               Social Links
//             </Typography>

//             <Typography
//               sx={{
//                 fontSize: 13,
//                 color: "#777",
//                 mb: 2,
//               }}
//             >
//               Add your professional
//               links below.
//             </Typography>

//             <SocialLinks
//               githubLink={githubLink}
//               linkedinLink={linkedinLink}
//               websiteLink={websiteLink}
//               setGithubLink={
//                 setGithubLink
//               }
//               setLinkedinLink={
//                 setLinkedinLink
//               }
//               setWebsiteLink={
//                 setWebsiteLink
//               }
//               disabled={saving}
//             />
//           </Box>
//         </Paper>
//       </Box>

//       {/* ------------------------------------------ */}
//       {/* SAVE / CANCEL */}
//       {/* ------------------------------------------ */}

//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "flex-end",
//           gap: 2,
//           mt: 6,
//         }}
//       >
//         <Button
//           variant="outlined"
//           onClick={() =>
//             router.back()
//           }
//           disabled={saving}
//           sx={{
//             ...btnStyle,
//             width: 170,
//           }}
//         >
//           Cancel
//         </Button>

//         <Button
//           variant="contained"
//           onClick={handleSave}
//           disabled={saving}
//           sx={{
//             width: 180,
//             borderRadius: 5,
//             textTransform: "none",
//             bgcolor: "#050505",
//             "&:hover": {
//               bgcolor: "#222",
//             },
//           }}
//         >
//           {saving
//             ? "Saving..."
//             : "Save Changes"}
//         </Button>
//       </Box>
//     </Box>
//   );
// }

// // ======================================================
// // INPUT
// // ======================================================

// function Input({
//   label,
//   value,
//   onChange,
//   disabled,
// }) {
//   return (
//     <Box>
//       <Typography
//         sx={{
//           color: "#444",
//           fontSize: 14,
//           mb: 0.5,
//           fontWeight: 500,
//         }}
//       >
//         {label}
//       </Typography>

//       <TextField
//         fullWidth
//         size="small"
//         value={value}
//         onChange={(event) =>
//           onChange(
//             event.target.value
//           )
//         }
//         disabled={disabled}
//         sx={fieldStyle}
//       />
//     </Box>
//   );
// }

// // ======================================================
// // SOCIAL LINKS
// // ======================================================

// function SocialLinks({
//   githubLink,
//   linkedinLink,
//   websiteLink,
//   setGithubLink,
//   setLinkedinLink,
//   setWebsiteLink,
//   disabled,
// }) {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         gap: 2,
//       }}
//     >
//       {/* LINKEDIN */}

//       <TextField
//         fullWidth
//         size="small"
//         placeholder="https://linkedin.com/in/username"
//         value={linkedinLink}
//         onChange={(event) =>
//           setLinkedinLink(
//             event.target.value
//           )
//         }
//         disabled={disabled}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <LinkedInIcon />
//             </InputAdornment>
//           ),
//         }}
//         sx={fieldStyle}
//       />

//       {/* GITHUB */}

//       <TextField
//         fullWidth
//         size="small"
//         placeholder="https://github.com/username"
//         value={githubLink}
//         onChange={(event) =>
//           setGithubLink(
//             event.target.value
//           )
//         }
//         disabled={disabled}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <GitHubIcon />
//             </InputAdornment>
//           ),
//         }}
//         sx={fieldStyle}
//       />

//       {/* WEBSITE */}

//       <TextField
//         fullWidth
//         size="small"
//         placeholder="https://yourwebsite.com"
//         value={websiteLink}
//         onChange={(event) =>
//           setWebsiteLink(
//             event.target.value
//           )
//         }
//         disabled={disabled}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <LanguageIcon />
//             </InputAdornment>
//           ),
//         }}
//         sx={fieldStyle}
//       />
//     </Box>
//   );
// }

// // ======================================================
// // STYLES
// // ======================================================

// const titleStyle = {
//   fontSize: 16,
//   fontWeight: 600,
//   mb: 1,
//   color: "#1a1a1a",
// };

// const btnStyle = {
//   textTransform: "none",
//   borderRadius: 2,
//   borderColor: "#ddd",
//   color: "#555",
// };

// const fieldStyle = {
//   "& .MuiOutlinedInput-root": {
//     borderRadius: 2,
//   },
// };

// const chipStyle = {
//   borderRadius: "20px",
//   px: 1,
// };

"use client";

import {
  Box,
  Button,
  Typography,
  Avatar,
  TextField,
  Paper,
  Chip,
  InputAdornment,
  Switch,
} from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import EditIcon from "@mui/icons-material/Edit";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/client";
import RevampButton from "@/components/buttons/revampbutton/RevampButton";

// ------------------------------------------------------
// AVAILABLE SKILLS
// ------------------------------------------------------

const availableSkills = [
  "Flutter",
  "Dart",
  "Figma",
  "Kubernetes",
  "Docker",
  "Kafka",
  "Prisma",
  "Canva",
  "JavaScript",
  "Mongo",
  "Postgres",
  "React",
  "Node.js",
  "Express.js",
  "Next.js",
  "TypeScript",
  "Firebase",
  "Supabase",
  "Tailwind CSS",
  "Git",
];

// ------------------------------------------------------
// MAIN COMPONENT
// ------------------------------------------------------

export default function DesktopEditProfilePage() {
  const router = useRouter();

  // --------------------------------------------------
  // USER
  // --------------------------------------------------

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // --------------------------------------------------
  // PROFILE
  // --------------------------------------------------

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState("0–1 years");
  const [location, setLocation] = useState("");

  // --------------------------------------------------
  // SOCIAL LINKS
  // --------------------------------------------------

  const [githubLink, setGithubLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");

  const [editingSocial, setEditingSocial] = useState(false);

  // --------------------------------------------------
  // PHOTO
  // --------------------------------------------------

  const [photoURL, setPhotoURL] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  // --------------------------------------------------
  // SKILLS
  // --------------------------------------------------

  const [skills, setSkills] = useState([]);
  const [skillSearch, setSkillSearch] = useState("");
  const [customSkill, setCustomSkill] = useState("");
const [showCustomSkillInput, setShowCustomSkillInput] = useState(false);

  // --------------------------------------------------
  // PROFILE VISIBILITY
  // UI ONLY FOR NOW
  // --------------------------------------------------

  const [showPublic, setShowPublic] = useState(true);
  const [showBadges, setShowBadges] = useState(true);
  const [showActivity, setShowActivity] = useState(true);

  // --------------------------------------------------
  // EXPERIENCE HELPERS
  // --------------------------------------------------

  const experienceToLabel = (years) => {
    const value = Number(years);

    if (Number.isNaN(value) || value <= 1) {
      return "0–1 years";
    }

    if (value <= 3) {
      return "1–3 years";
    }

    if (value <= 5) {
      return "3–5 years";
    }

    return "5+ years";
  };

  const experienceToNumber = (value) => {
    switch (value) {
      case "0–1 years":
        return 1;

      case "1–3 years":
        return 3;

      case "3–5 years":
        return 5;

      case "5+ years":
        return 6;

      default:
        return 1;
    }
  };

  // --------------------------------------------------
  // FILTER SKILLS
  // --------------------------------------------------

  const filteredSkills = availableSkills.filter((skill) => {
    const matchesSearch = skill
      .toLowerCase()
      .includes(skillSearch.toLowerCase());

    const notSelected = !skills.includes(skill);

    return matchesSearch && notSelected;
  });

  // --------------------------------------------------
  // LOAD USER PROFILE
  // --------------------------------------------------

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);

        // --------------------------------------------
        // AUTH USER
        // --------------------------------------------

        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
          console.error("AUTH USER ERROR:", authError);
          router.push("/Auth/login");
          return;
        }

        if (!authUser) {
          router.push("/Auth/login");
          return;
        }

        setUser(authUser);

        // --------------------------------------------
        // USERS TABLE
        // --------------------------------------------

        const {
          data: profile,
          error: profileError,
        } = await supabase
          .from("users")
          .select("*")
          .eq("uid", authUser.id)
          .maybeSingle();

        if (profileError) {
          console.error("PROFILE FETCH ERROR:", profileError);
          return;
        }

        if (profile) {
          setName(
            profile.full_name ||
              profile.display_name ||
              authUser.user_metadata?.full_name ||
              authUser.user_metadata?.username ||
              ""
          );

          setUsername(
            profile.username ||
              authUser.user_metadata?.username ||
              ""
          );

          setBio(profile.bio || "");

          setExperience(
            experienceToLabel(profile.years_of_experience)
          );

          setLocation(profile.location || "");

          setGithubLink(profile.github_url || "");
          setLinkedinLink(profile.linkedin_url || "");
          setWebsiteLink(profile.website_url || "");

          setPhotoURL(profile.photo_url || "");
        } else {
          setName(
            authUser.user_metadata?.full_name ||
              authUser.user_metadata?.username ||
              ""
          );

          setUsername(
            authUser.user_metadata?.username || ""
          );

          setBio("");

          setGithubLink("");
          setLinkedinLink("");
          setWebsiteLink("");

          setPhotoURL(
            authUser.user_metadata?.avatar_url || ""
          );
        }

        // --------------------------------------------
        // USER SKILLS TABLE
        // --------------------------------------------

        const {
          data: userSkills,
          error: skillsError,
        } = await supabase
          .from("user_skills")
          .select("skill_name")
          .eq("user_uid", authUser.id);

        if (skillsError) {
          console.error("SKILLS FETCH ERROR:", skillsError);
          setSkills([]);
        } else {
          const skillNames = (userSkills || [])
            .map((item) => item.skill_name)
            .filter(Boolean);

          setSkills(skillNames);
        }
      } catch (error) {
        console.error("LOAD PROFILE ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  // --------------------------------------------------
  // PHOTO PICKER
  // --------------------------------------------------

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB.");
      return;
    }

    setSelectedFile(file);
    setPhotoURL(URL.createObjectURL(file));
  };

  // --------------------------------------------------
  // REMOVE PHOTO
  // --------------------------------------------------

  const handleRemovePhoto = () => {
    setSelectedFile(null);
    setPhotoURL("");
  };

  // --------------------------------------------------
  // UPLOAD PHOTO
  // --------------------------------------------------

  const uploadProfileImage = async () => {
    if (!selectedFile || !user) {
      return photoURL;
    }

    const extension =
      selectedFile.name.split(".").pop() || "jpg";

    const filePath = `${user.id}/profile.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, selectedFile, {
        upsert: true,
        contentType: selectedFile.type,
      });

    if (uploadError) {
      console.error("IMAGE UPLOAD ERROR:", uploadError);
      throw uploadError;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    return publicUrl;
  };

  // --------------------------------------------------
  // ADD SKILL
  // --------------------------------------------------

  const handleAddSkill = (skill) => {
    setSkills((previous) => {
      if (previous.includes(skill)) {
        return previous;
      }

      return [...previous, skill];
    });

    setSkillSearch("");
  };

  const handleAddCustomSkill = () => {
  const skill = customSkill.trim();

  if (!skill) {
    return;
  }

  // Don't add duplicate skill
  const alreadyExists = skills.some(
    (item) => item.toLowerCase() === skill.toLowerCase()
  );

  if (alreadyExists) {
    setCustomSkill("");
    setShowCustomSkillInput(false);
    return;
  }

  setSkills((previous) => [...previous, skill]);

  setCustomSkill("");
  setShowCustomSkillInput(false);
};

  // --------------------------------------------------
  // REMOVE SKILL
  // --------------------------------------------------

  const handleRemoveSkill = (skill) => {
    setSkills((previous) =>
      previous.filter((item) => item !== skill)
    );
  };

  // --------------------------------------------------
  // SAVE PROFILE
  // --------------------------------------------------

  const handleSave = async () => {
    if (!user) return;

    try {
      setSaving(true);

      // --------------------------------------------
      // PHOTO
      // --------------------------------------------

      let finalPhotoURL = photoURL;

      if (selectedFile) {
        finalPhotoURL = await uploadProfileImage();
      }

      // --------------------------------------------
      // UPDATE USERS TABLE
      // --------------------------------------------

      const { error: updateError } = await supabase
        .from("users")
        .update({
          display_name: name.trim(),
          full_name: name.trim(),
          username: username.trim(),
          bio: bio.trim(),
          years_of_experience:
            experienceToNumber(experience),
          github_url: githubLink.trim(),
          linkedin_url: linkedinLink.trim(),
          website_url: websiteLink.trim(),
          photo_url: finalPhotoURL || null,
          updated_at: new Date().toISOString(),
        })
        .eq("uid", user.id);

      if (updateError) {
        console.error("PROFILE UPDATE ERROR:", updateError);
        throw updateError;
      }

      // --------------------------------------------
      // DELETE OLD SKILLS
      // --------------------------------------------

      const { error: deleteSkillsError } = await supabase
        .from("user_skills")
        .delete()
        .eq("user_uid", user.id);

      if (deleteSkillsError) {
        console.error(
          "DELETE SKILLS ERROR:",
          deleteSkillsError
        );
        throw deleteSkillsError;
      }

      // --------------------------------------------
      // INSERT CURRENT SKILLS
      // --------------------------------------------

      if (skills.length > 0) {
        const skillsToInsert = skills.map((skill) => ({
          user_uid: user.id,
          skill_name: skill,
        }));

        const { error: insertSkillsError } = await supabase
          .from("user_skills")
          .insert(skillsToInsert);

        if (insertSkillsError) {
          console.error(
            "INSERT SKILLS ERROR:",
            insertSkillsError
          );
          throw insertSkillsError;
        }
      }

      // --------------------------------------------
      // UPDATE AUTH METADATA
      // --------------------------------------------

      const { error: authUpdateError } =
        await supabase.auth.updateUser({
          data: {
            username: username.trim(),
            full_name: name.trim(),
            avatar_url: finalPhotoURL || null,
          },
        });

      if (authUpdateError) {
        console.error(
          "AUTH METADATA UPDATE ERROR:",
          authUpdateError
        );
      }

      setSelectedFile(null);
      setEditingSocial(false);

      alert("Profile updated successfully!");

      router.push("/profile");
    } catch (error) {
      console.error("SAVE PROFILE ERROR:", error);

      alert(
        error?.message ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: {
            xs: "none",
            sm: "flex",
          },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading profile...
      </Box>
    );
  }

  // --------------------------------------------------
  // MAIN UI
  // --------------------------------------------------

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        px: {
          sm: 3,
          md: 5,
          lg: 7,
        },
        py: {
          sm: 3,
          md: 4,
        },
        display: {
          xs: "none",
          sm: "block",
        },
        boxSizing: "border-box",
        backgroundColor: "#fff",
      }}
    >
      {/* BACK */}

      <Button
        variant="outlined"
        startIcon={
          <ArrowBackIosNewIcon
            sx={{ fontSize: 16 }}
          />
        }
        onClick={() => router.back()}
        disabled={saving}
        sx={{
          height: 40,
          px: 2,
          borderRadius: "10px",
          borderColor: "#ddd",
          color: "#333",
          textTransform: "none",
          fontSize: 14,
          mb: 6,
          "&:hover": {
            borderColor: "#ccc",
            backgroundColor: "#fff",
          },
        }}
      >
        Back
      </Button>

      {/* MAIN TWO COLUMN LAYOUT */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            md: "minmax(0, 1fr)",
            lg: "minmax(0, 1fr) 385px",
          },
          gap: {
            md: 4,
            lg: 5,
          },
          alignItems: "start",
        }}
      >
        {/* ================================================= */}
        {/* LEFT COLUMN */}
        {/* ================================================= */}

        <Box
          sx={{
            minWidth: 0,
            maxWidth: 760,
          }}
        >
          {/* PHOTO */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              mb: 5,
            }}
          >
            <Avatar
              src={photoURL || ""}
              sx={{
                width: 96,
                height: 96,
                fontSize: 32,
                fontWeight: 700,
              }}
            >
              {!photoURL &&
                (name?.[0] || "U").toUpperCase()}
            </Avatar>

            <Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mb: 1.5,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleImageClick}
                  disabled={saving}
                  sx={{
                    textTransform: "none",
                    color: "#555",
                    borderColor: "#ddd",
                    borderRadius: "10px",
                    px: 2,
                  }}
                >
                  Change photo
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleRemovePhoto}
                  disabled={saving}
                  sx={{
                    textTransform: "none",
                    color: "#ff3b3b",
                    borderColor: "#ddd",
                    borderRadius: "10px",
                    px: 2,
                  }}
                >
                  Remove Photo
                </Button>

                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Box>

              <Typography
                sx={{
                  color: "#666",
                  fontSize: 14,
                  lineHeight: 1.45,
                }}
              >
                At least 800*800 px recommended.
                <br />
                JPG or PNG is allowed.
              </Typography>
            </Box>
          </Box>

          {/* PERSONAL INFORMATION */}

          <SectionTitle>
            Personal information
          </SectionTitle>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
              },
              gap: 4,
              mb: 3.5,
            }}
          >
            <ProfileInput
              label="Full name"
              value={name}
              onChange={setName}
              disabled={saving}
            />

            <ProfileInput
              label="Username"
              value={username}
              onChange={setUsername}
              disabled={saving}
            />
          </Box>

          {/* LOCATION */}

          <SectionTitle>
            Location
          </SectionTitle>

          <TextField
            fullWidth
            size="small"
            value={location}
            onChange={(event) =>
              setLocation(event.target.value)
            }
            disabled={saving}
            placeholder="Enter location"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnOutlinedIcon
                    sx={{
                      color: "#444",
                      fontSize: 21,
                    }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              ...fieldStyle,
              mb: 3.5,
            }}
          />

          {/* BIO */}

          <SectionTitle>
            Bio
          </SectionTitle>

          <TextField
            fullWidth
            multiline
            minRows={6}
            value={bio}
            onChange={(event) =>
              setBio(event.target.value)
            }
            disabled={saving}
            placeholder="Tell us about yourself (Max 500 Characters)"
            inputProps={{
              maxLength: 500,
            }}
            helperText={`${bio.length}/500`}
            FormHelperTextProps={{
              sx: {
                textAlign: "right",
                mr: 0,
                color: "#888",
              },
            }}
            sx={{
              ...fieldStyle,
              mb: 3.5,
            }}
          />

          {/* ================================================= */}
          {/* SKILLS */}
          {/* ================================================= */}

          <Box
            sx={{
              borderTop: "1px solid #e5e5e5",
              pt: 3.8,
              mt: 3,
            }}
          >
            <SectionTitle>
              Skills
            </SectionTitle>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1.2,
              }}
            >
              {skills.length === 0 ? (
                <Typography
                  sx={{
                    fontSize: 14,
                    color: "#999",
                  }}
                >
                  No skills added yet.
                </Typography>
              ) : (
                skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    onDelete={() =>
                      handleRemoveSkill(skill)
                    }
                    disabled={saving}
                    variant="outlined"
                    sx={{
                      height: 39,
                      px: 0.8,
                      borderRadius: "22px",
                      borderColor: "#d5d5d5",
                      backgroundColor: "#fff",
                      fontSize: 14,
                      color: "#222",
                      "& .MuiChip-deleteIcon": {
                        fontSize: 23,
                        color: "#bdbdbd",
                        mr: 0.2,
                        "&:hover": {
                          color: "#999",
                        },
                      },
                    }}
                  />
                ))
              )}
            </Box>
          </Box>

          {/* ================================================= */}
          {/* SOCIAL LINKS */}
          {/* ================================================= */}

          <Box
            sx={{
              borderTop: "1px solid #e5e5e5",
              mt: 4,
              pt: 3.8,
            }}
          >
            <SectionTitle>
              Social Links
            </SectionTitle>

            <SocialLinksPreview
              githubLink={githubLink}
              linkedinLink={linkedinLink}
              websiteLink={websiteLink}
            />
          </Box>
        </Box>

        {/* IMPORTANT:
            This closes the LEFT COLUMN before
            starting the RIGHT CARD. */}

        {/* ================================================= */}
        {/* RIGHT COLUMN */}
        {/* ================================================= */}

        <Paper
          variant="outlined"
          sx={{
            width: "100%",
            boxSizing: "border-box",
            borderRadius: "18px",
            p: {
              md: 3,
              lg: 3.5,
            },
            borderColor: "#e4e4e4",
            boxShadow:
              "0px 1px 3px rgba(0,0,0,0.02)",
          }}
        >
          {/* EDIT */}

          <Typography
            sx={{
              fontSize: 21,
              fontWeight: 600,
              color: "#111",
              mb: 3,
            }}
          >
            Edit
          </Typography>

          {/* ADD SKILLS */}

          <SectionTitle>
            Add skills
          </SectionTitle>

          <TextField
            fullWidth
            size="small"
            value={skillSearch}
            onChange={(event) =>
              setSkillSearch(event.target.value)
            }
            disabled={saving}
            placeholder="Search roles or skills..."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon
                    sx={{
                      color: "#999",
                      fontSize: 20,
                    }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              ...fieldStyle,
              mb: 2,
            }}
          />

          {/* AVAILABLE SKILLS */}

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {filteredSkills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onClick={() =>
                  handleAddSkill(skill)
                }
                disabled={saving}
                variant="outlined"
                sx={{
                  height: 34,
                  borderRadius: "18px",
                  borderColor: "#d5d5d5",
                  fontSize: 13,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f6f8ff",
                  },
                }}
              />
            ))}
          </Box>

          {skillSearch &&
            filteredSkills.length === 0 && (
              <Typography
                sx={{
                  color: "#888",
                  fontSize: 13,
                  mt: 2,
                }}
              >
                No matching skills found.
              </Typography>
            )}


         <Typography
  onClick={() =>
    setShowCustomSkillInput((previous) => !previous)
  }
  sx={{
    color: "#4167F2",
    fontSize: 14,
    mt: 2,
    cursor: "pointer",
    display: "inline-block",
    "&:hover": {
      textDecoration: "underline",
    },
  }}
>
  {showCustomSkillInput ? "Cancel" : "Add other"}
</Typography>

{showCustomSkillInput && (
  <Box
    sx={{
      display: "flex",
      gap: 1,
      mt: 1.5,
    }}
  >
    <TextField
      size="small"
      fullWidth
      value={customSkill}
      onChange={(event) =>
        setCustomSkill(event.target.value)
      }
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          handleAddCustomSkill();
        }
      }}
      placeholder="Enter your skill"
      disabled={saving}
      sx={fieldStyle}
    />

    <Button
      variant="outlined"
      onClick={handleAddCustomSkill}
      disabled={!customSkill.trim() || saving}
      sx={{
        minWidth: 75,
        borderRadius: "9px",
        textTransform: "none",
      }}
    >
      Add
    </Button>
  </Box>
)}

          {/* DIVIDER */}

          <Box
            sx={{
              borderTop: "1px solid #e5e5e5",
              my: 3.5,
            }}
          />

          {/* SOCIAL LINKS */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <SectionTitle noMargin>
              Social Links
            </SectionTitle>

            <Button
              size="small"
              startIcon={
                <EditIcon
                  sx={{ fontSize: 14 }}
                />
              }
              onClick={() =>
                setEditingSocial((previous) => !previous)
              }
              disabled={saving}
              sx={{
                textTransform: "none",
                minWidth: "auto",
                color: "#555",
                fontSize: 13,
                border: "1px solid #e5e5e5",
                borderRadius: "6px",
                px: 1,
              }}
            >
              {editingSocial ? "Done" : "Edit"}
            </Button>
          </Box>

          {editingSocial ? (
            <SocialInputs
              githubLink={githubLink}
              linkedinLink={linkedinLink}
              websiteLink={websiteLink}
              setGithubLink={setGithubLink}
              setLinkedinLink={setLinkedinLink}
              setWebsiteLink={setWebsiteLink}
              disabled={saving}
            />
          ) : (
            <SocialLinksPreview
              githubLink={githubLink}
              linkedinLink={linkedinLink}
              websiteLink={websiteLink}
            />
          )}

          {/* DIVIDER */}

          <Box
            sx={{
              borderTop: "1px solid #e5e5e5",
              my: 3.5,
            }}
          />

          {/* PROFILE VISIBILITY */}

          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 600,
              mb: 1.5,
              color: "#171717",
            }}
          >
            Profile Visibility
          </Typography>

          <VisibilityRow
            text="Show profile publicly"
            checked={showPublic}
            onChange={setShowPublic}
          />

          <VisibilityRow
            text="Show badges on profile"
            checked={showBadges}
            onChange={setShowBadges}
          />

          <VisibilityRow
            text="Show activity history"
            checked={showActivity}
            onChange={setShowActivity}
          />
        </Paper>
      </Box>

      {/* ================================================= */}
      {/* BOTTOM ACTIONS */}
      {/* ================================================= */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          mt: 6,
          mb: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => router.back()}
          disabled={saving}
          sx={{
            width: 175,
            height: 48,
            borderRadius: "28px",
            borderColor: "#e2e2e2",
            color: "#555",
            textTransform: "none",
            fontSize: 15,
            "&:hover": {
              borderColor: "#ccc",
              backgroundColor: "#fff",
            },
          }}
        >
          Cancel
        </Button>

        <RevampButton
          text={saving ? "Saving..." : "Save Changes"}
          onClick={handleSave}
          disabled={saving}
          width="175px"
          sx={{
            height: 48,
            fontSize: 15,
            borderRadius: "28px",
          }}
        />
      </Box>
    </Box>
  );
}

// ======================================================
// SECTION TITLE
// ======================================================

function SectionTitle({
  children,
  noMargin = false,
}) {
  return (
    <Typography
      sx={{
        fontSize: 16,
        fontWeight: 600,
        color: "#171717",
        mb: noMargin ? 0 : 1.2,
      }}
    >
      {children}
    </Typography>
  );
}

// ======================================================
// PROFILE INPUT
// ======================================================

function ProfileInput({
  label,
  value,
  onChange,
  disabled,
}) {
  return (
    <Box>
      <Typography
        sx={{
          color: "#666",
          fontSize: 14,
          mb: 0.7,
          fontWeight: 500,
        }}
      >
        {label}
      </Typography>

      <TextField
        fullWidth
        size="small"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        disabled={disabled}
        sx={fieldStyle}
      />
    </Box>
  );
}

// ======================================================
// SOCIAL INPUTS
// ======================================================

function SocialInputs({
  githubLink,
  linkedinLink,
  websiteLink,
  setGithubLink,
  setLinkedinLink,
  setWebsiteLink,
  disabled,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      <TextField
        fullWidth
        size="small"
        placeholder="https://www.linkedin.com/in/username"
        value={linkedinLink}
        onChange={(event) =>
          setLinkedinLink(event.target.value)
        }
        disabled={disabled}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LinkedInIcon
                sx={{ fontSize: 20 }}
              />
            </InputAdornment>
          ),
        }}
        sx={fieldStyle}
      />

      <TextField
        fullWidth
        size="small"
        placeholder="https://github.com/username"
        value={githubLink}
        onChange={(event) =>
          setGithubLink(event.target.value)
        }
        disabled={disabled}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <GitHubIcon
                sx={{ fontSize: 20 }}
              />
            </InputAdornment>
          ),
        }}
        sx={fieldStyle}
      />

      <TextField
        fullWidth
        size="small"
        placeholder="https://yourwebsite.com"
        value={websiteLink}
        onChange={(event) =>
          setWebsiteLink(event.target.value)
        }
        disabled={disabled}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LanguageIcon
                sx={{ fontSize: 20 }}
              />
            </InputAdornment>
          ),
        }}
        sx={fieldStyle}
      />
    </Box>
  );
}

// ======================================================
// SOCIAL PREVIEW
// ======================================================

function SocialLinksPreview({
  githubLink,
  linkedinLink,
  websiteLink,
}) {
  const links = [
    {
      icon: <LinkedInIcon />,
      value: linkedinLink || "Not added",
    },
    {
      icon: <GitHubIcon />,
      value: githubLink || "Not added",
    },
    {
      icon: <LanguageIcon />,
      value: websiteLink || "Not added",
    },
  ];

  return (
    <Box
      sx={{
        border: "1px solid #dddddd",
        borderRadius: "9px",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {links.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            minHeight: 54,
            px: 1.5,
            gap: 1.5,
            borderBottom:
              index !== links.length - 1
                ? "1px solid #e5e5e5"
                : "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 22,
              color: "#222",
              flexShrink: 0,
            }}
          >
            {item.icon}
          </Box>

          <Typography
            sx={{
              fontSize: 14,
              color: "#222",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              minWidth: 0,
            }}
          >
            {item.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

// ======================================================
// VISIBILITY ROW
// ======================================================

function VisibilityRow({
  text,
  checked,
  onChange,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: 60,
      }}
    >
      <Typography
        sx={{
          fontSize: 15,
          color: "#111",
          lineHeight: 1.3,
          pr: 2,
        }}
      >
        {text}
      </Typography>

      <Switch
        checked={checked}
        onChange={(event) =>
          onChange(event.target.checked)
        }
        sx={{
          "& .MuiSwitch-switchBase.Mui-checked": {
            color: "#fdfbfb",
          },

          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#4167F2",
            opacity: 1,
          },

          "& .MuiSwitch-track": {
            borderRadius: 20,
          },
        }}
      />
    </Box>
  );
}

// ======================================================
// FIELD STYLE
// ======================================================

const fieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "9px",
    backgroundColor: "#fff",
    minHeight: 44,

    "& fieldset": {
      borderColor: "#dedede",
    },

    "&:hover fieldset": {
      borderColor: "#cfcfcf",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#4167F2",
    },
  },

  "& .MuiInputBase-input": {
    fontSize: 14,
  },

  "& .MuiInputBase-input::placeholder": {
    color: "#999",
    opacity: 1,
  },
};