"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton";
import WrapperComponent from "@/components/WrapperComponent";

export default function MLoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    emailOrUsername: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (key) => (e) => {
    setForm((p) => ({ ...p, [key]: e.target.value }));
    setMessage("");
  };

  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const handleLogin = async () => {
    const identifier = form.emailOrUsername.trim();
    const password = form.password;

    if (!identifier || !password) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      let emailToUse = identifier;

      // ✅ If it's username, resolve email from Firestore
      if (!isEmail(identifier)) {
        const resolvedEmail = await findEmailByIdentifier(identifier);

        if (!resolvedEmail) {
          setMessage("No account found for this username/email.");
          return;
        }

        emailToUse = resolvedEmail.trim();
      }
      //Sign in using email+password
      await signInUserWithEmailAndPassword(emailToUse, password);

      router.push("/");
    } catch (err) {
      console.error("LOGIN ERROR:", err);

      const code = err?.code || "";

      if (code === "auth/invalid-credential") {
        //wrong pass OR google-only account
        setMessage(
          "Invalid email/username or password. If you signed up with Google, use Google login.",
        );
      } else if (code === "auth/user-not-found") {
        setMessage("Account not found.");
      } else if (code === "auth/wrong-password") {
        setMessage("Wrong password.");
      } else if (code === "auth/too-many-requests") {
        setMessage("Too many attempts. Try again later.");
      } else {
        setMessage("Login failed. Try again.");
      }
    }
  };

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
          height: "100dvh",
          width: "100%",
          overflow: "hidden", //no scroll
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          boxSizing: "border-box",
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 420,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            boxSizing: "border-box",
          }}
        >
          {/* Mascot */}
          <Box
            component="img"
            src="/assets/auth-assets/bird.png"
            alt="Mascot"
            sx={{
              width: 200,
              height: "auto",
              objectFit: "contain",
              userSelect: "none",
              mb: 1.5,
            }}
          />

          {/* Title */}
          <Typography
            sx={{ fontSize: 24, fontWeight: 700, textAlign: "center", color: "#000000" }}
          >
            Welcome back
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              fontSize: 13.5,
              fontWeight: 500,
              color: "#6D6D6D",
              textAlign: "center",
              maxWidth: 280,
              lineHeight: 1.5,
              mb: 1,
            }}
          >
            Log in to continue where you left off.
          </Typography>

          {/* Inputs */}
          <Box
            sx={{
              width: { xs: "100%", sm: 325 },
              maxWidth: 325,
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              boxSizing: "border-box",
            }}
          >
            <TextField
              placeholder="Email Address/Username"
              value={form.emailOrUsername}
              onChange={handleChange("emailOrUsername")}
              fullWidth
              variant="outlined"
              InputProps={{
                sx: {
                  height: 45,
                  borderRadius: 3,
                  backgroundColor: "#F6F6F6",
                  fontSize: "16px",

                  // ✅ placeholder styling
                  "& input::placeholder": {
                    fontSize: "13px",
                    fontWeight: 500,
                    opacity: 1,
                    color: "#6D6D6D",
                  },
                },
              }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "transparent",
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "transparent",
                  },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#D6D6D6",
                  },
              }}
            />

            <TextField
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange("password")}
              fullWidth
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((s) => !s)}
                      edge="end"
                      sx={{ color: "#000000" }}
                    >
                      <Image
                        src="/assets/m-AuthImages/eye-off.svg"
                        alt="Toggle password visibility"
                        width={18}
                        height={18}
                        style={{ display: "block" }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  height: 45,
                  borderRadius: 3,
                  backgroundColor: "#F6F6F6",
                  fontSize: "16px",
                  fontWeight: 500,

                  "& input::placeholder": {
                    fontSize: "13px", // 👈 reduce here
                    opacity: 1, // keeps color visible (important in MUI)
                    color: "#6D6D6D", // optional softer color
                  },
                },
              }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "transparent",
                },
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "transparent",
                  },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#D6D6D6",
                  },
              }}
            />

            {/* Forgot password */}
            <Typography
              onClick={() => router.push("/forgot-password")} // change route if needed
              sx={{
                fontSize: 14,
                fontWeight: 500,
                color: "#4167F2",
                textAlign: "right",
                cursor: "pointer",
                mt: 0.5,
              }}
            >
              Forgot Password?
            </Typography>
          </Box>

          {/* Login button + message */}
          <Box sx={{ width: "100%", maxWidth: 325, mt: 1, marginBottom: 0.3 }}>
            <PrimaryButton onClick={handleLogin}>Login</PrimaryButton>

            {message && (
              <Typography
                sx={{
                  mt: 1.2,
                  textAlign: "center",
                  fontSize: 13,
                  color: "red",
                }}
              >
                {message}
              </Typography>
            )}
          </Box>

          {/* Bottom create account */}
          <Typography
            sx={{
              fontSize: 14,
              color: "#161616",
              textAlign: "center",
              mt: 1,
              fontWeight: 500,
              marginBottom: 7,
            }}
          >
            New here?{" "}
            <Box
              component="span"
              onClick={() => router.push("/Auth/create-account")}
              sx={{ color: "#4167F2", cursor: "pointer", fontWeight: 500 }}
            >
              Create an account
            </Box>
          </Typography>
        </Box>
      </Box>
    </WrapperComponent>
  );
}
