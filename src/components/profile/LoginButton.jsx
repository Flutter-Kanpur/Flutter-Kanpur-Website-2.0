import { Dialog, DialogContent, Typography, Button, Box } from "@mui/material";
// import { getAuth, signOut } from "firebase/auth"; 

import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";

import { useRouter } from "next/router"; 

export default function LogoutDialog({ openLogout, setOpenLogout }) {
  const router = useRouter();

  return (
    <Dialog
      open={openLogout}
      onClose={() => setOpenLogout(false)}
      PaperProps={{
        sx: {
          borderRadius: "32px", 
          padding: "16px", 
          width: "100%",
          maxWidth: "360px", 
          boxShadow: "0px 10px 40px rgba(0,0,0,0.1)", 
        },
      }}
    >
      <DialogContent sx={{ textAlign: "center", padding: "24px 16px" }}>
        <Typography variant="h5" fontWeight={700} color="#000" mb={1.5}>
          Log out?
        </Typography>
        <Typography 
            variant="body1" 
            color="text.secondary" 
            mb={4} 
            lineHeight={1.5}
            sx={{ fontSize: "1.05rem" }}
        >
          You’ll need to log in again to access your account.
        </Typography>
        <Button
          fullWidth
          disableElevation
          onClick={async () => {
            const auth = getAuth();
            await signOut(auth);
            router.push("/");
          }}
          sx={{
            background: "linear-gradient(180deg, #D32F2F 0%, #C62828 100%)",
            color: "#fff",
            borderRadius: "50px", 
            py: 1.8, 
            textTransform: "none", 
            fontSize: "1.1rem",
            fontWeight: 500,
            mb: 2,
            boxShadow: "0px 4px 12px rgba(211, 47, 47, 0.4)", 
            "&:hover": { 
                background: "linear-gradient(180deg, #B71C1C 0%, #B71C1C 100%)",
                boxShadow: "0px 6px 16px rgba(211, 47, 47, 0.5)" 
            },
          }}
        >
          Log out
        </Button>
        <Button
          fullWidth
          disableRipple
          onClick={() => setOpenLogout(false)}
          sx={{
            color: "#C62828",
            textTransform: "none",
            fontSize: "1.1rem",
            fontWeight: 500,
            "&:hover": { backgroundColor: "transparent", color: "#B71C1C" },
          }}
        >
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
}