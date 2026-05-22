import React from 'react';
import { Dialog, DialogContent, Typography, Button } from '@mui/material';
import RevampButton from '../buttons/revampbutton/RevampButton';

const LogoutDialog = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
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
                {/* <Button
                    fullWidth
                    disableElevation
                    onClick={onConfirm}
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
                </Button> */}
<RevampButton
  text="Logout" 
  bgColor="#CC3333" 
  sx={{ 
    boxShadow: 'none',             // Removes the main shadow
    '&:hover': { 
       boxShadow: 'none'           // Removes shadow when hovering
    },
    '&:active': { 
       boxShadow: 'none'           // Removes shadow when clicking
    }
  }}
  onClick= {onConfirm}
/>

                <Button
                    fullWidth
                    disableRipple
                    onClick={onClose}
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
};

export default LogoutDialog;
