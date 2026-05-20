"use client";

import React, { useState } from "react";
import { Box, Typography, Button, Paper, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { Divider } from "@mui/material";
import Image from "next/image";
// import { auth } from "@/lib/firebase/server/setup";
import GoogleButton from "@/components/buttons/continueWithGoogleButton/googleButton";
// import { checkUserExistsInFirestore } from "@/lib/firebase/server/server-actions";
// import { signInWithGoogle } from "@/lib/firebase/server/auth";
import WrapperComponent from "@/components/WrapperComponent";

export default function SignupPage() {
  const router = useRouter();

  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });

  return (
    <WrapperComponent
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingY: 0,
        backgroundColor: "#fff",
        gap: "10px",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: "100%", sm: 420, md: 480 },
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Mascot */}
          <Box
            component="img"
            src="/assets/auth-assets/bird.png"
            alt="Loading Mascot"
            sx={{
              width: 200, // 👈 make it bigger here
              height: "auto", // ✅ keeps original aspect ratio
              objectFit: "contain",
              userSelect: "none",
              mb: 1.5,
            }}
          />

          <Typography
            sx={{
              fontSize: { xs: 20, sm: 22, md: 24 },
              fontWeight: 700,
              textAlign: "center",
              color: "#000000"
            }}
          >
            Let&apos;s you in
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 13, sm: 13.5, md: 14.5 },
              color: "#6D6D6D",
              textAlign: "center",
              fontStyle: "medium",
              fontWeight: 400,
              lineHeight: 1.6,
              maxWidth: { xs: 280, md: 360 },
              mb: { xs: 2, sm: 2.5, md: 3 },
            }}
          >
            Be part of a community that learns <br />
            and builds together.
          </Typography>

          <Box sx={{ width: "100%", mt: 0.5 }}>
            {/* GOOGLE LOGIN */}
            <GoogleButton
              onClick={async () => {
                try {
                  // Fake loading delay
                  await new Promise((resolve) => setTimeout(resolve, 1000));

                  // Dummy user data
                  const dummyUser = {
                    name: "Sarah",
                    email: "sarahfatima1924@gmail.com",
                  };

                  // Fake database check
                  const userExists = true;

                  console.log("Logged in user:", dummyUser);

                  router.push(userExists ? "/" : "/onboarding/screen1");
                } catch (err) {
                  console.error(err);
                }
              }}
            />

            {/* EMAIL LOGIN */}
            <Paper
              elevation={0}
              sx={{
                border: "1px solid #E6E6E6",
                borderRadius: 3,
                mt: { xs: 1.5, sm: 2 },
                overflow: "hidden",
              }}
            >
              <Button
                fullWidth
                onClick={() => {
                  router.push("/Auth/login");
                }}
                sx={{
                  py: { xs: 1.3, sm: 1.5 },
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: { xs: 16, sm: 15 },
                }}
                style={{ color: "#000000" }}
              >
                <Image
                  src="/assets/auth-assets/email.png"
                  alt="email icon"
                  width={16}
                  height={16}
                  style={{ marginRight: 8 }}
                />
                Sign in with Email
              </Button>
            </Paper>

            {/* OR */}
            <Divider
              sx={{
                my: 2,
                "&::before, &::after": {
                  borderColor: "#E6E6E6",
                },
                fontSize: 14,
                color: "#000000",
                fontWeight: 400,
              }}
            >
              OR
            </Divider>

            {/* CREATE ACCOUNT */}
            <Button
              fullWidth
              sx={{
                height: 46,
                borderRadius: "100px",
                backgroundColor: "#0A0A0A", // ✅ Exact color
                color: "#F4F4F4",
                fontSize: 16,
                fontWeight: 400,

                px: "28px", // ✅ Left + Right padding
                py: "10px", // ✅ Top + Bottom padding
                gap: "6px", // ✅ Gap between icon/text (if any)

                textTransform: "none",

                // ✅ Inner shadow from Figma
                boxShadow: "inset 4px 6px 6px rgba(226,226,226,0.2)",

                "&:hover": {
                  backgroundColor: "#000",
                  boxShadow: "inset 4px 6px 6px rgba(226,226,226,0.2)",
                },
              }}
              onClick={() => router.push("/Auth/create-account")}
            >
              Create Account
            </Button>
          </Box>
        </Box>
      </Box>
    </WrapperComponent>
  );
}
