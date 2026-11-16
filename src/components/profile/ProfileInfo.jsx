// import React from 'react';
// import { Box, Avatar, Typography } from '@mui/material';

// const ProfileInfo = ({ user, onEditClick }) => {
//     if (!user) return null;
// console.log('user', user);
//     return (
//         <Box sx={{ display: "flex", alignItems: "center", mb: 5, mt: 2 }}>
//             <Avatar
//                 src={user.photoURL || ""}
//                 sx={{
//                     width: 90,
//                     height: 90,
//                     mr: 2.5,
//                     border: '4px solid #fff',
//                     boxShadow: '0px 4px 10px rgba(0,0,0,0.05)'
//                 }}
//             >

//                 {!user.photoURL && user.displayName?.[0]}
//             </Avatar>

//             <Box>
//                 <Typography variant="h5" fontWeight={700} sx={{ mb: 0.2 }}>
//                     {user.displayName || "User"}
//                 </Typography>

//                 <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.8 }}>
//                     {user.email || "@username"}
//                 </Typography>

//                 <Typography
//                     variant="body2"
//                     sx={{
//                         color: "#2373E2",
//                         mt: 1,
//                         cursor: "pointer",
//                         fontWeight: 600,
//                         fontSize: '0.95rem'
//                     }}
//                     onClick={onEditClick}
//                 >
//                     Edit profile
//                 </Typography>
//             </Box>
//         </Box>
//     );
// };

// export default ProfileInfo;
import React from "react";
import { Box, Avatar, Typography } from "@mui/material";

const ProfileInfo = ({ user, onEditClick }) => {
  if (!user) return null;

  console.log("ProfileInfo user:", user);

  const displayName =
    user.display_name ||
    user.full_name ||
    user.displayName ||
    user.username ||
    "User";

  const username = user.username
    ? `@${user.username}`
    : user.email || "";

  const photo =
    user.photo_url ||
    user.photoURL ||
    "";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 5,
        mt: 2,
      }}
    >
      <Avatar
        src={photo}
        sx={{
          width: 90,
          height: 90,
          mr: 2.5,
          border: "4px solid #fff",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
          fontSize: 32,
          fontWeight: 700,
        }}
      >
        {!photo && displayName?.[0]?.toUpperCase()}
      </Avatar>

      <Box>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ mb: 0.2 }}
        >
          {displayName}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ opacity: 0.8 }}
        >
          {username}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#2373E2",
            mt: 1,
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.95rem",
          }}
          onClick={onEditClick}
        >
          Edit profile
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileInfo;