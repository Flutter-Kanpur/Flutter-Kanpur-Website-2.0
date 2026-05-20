"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton";
import WrapperComponent from "@/components/WrapperComponent";

export default function EmailSignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //validations
  const isUsernameValid = form.username.trim().length >= 3;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  const isPasswordValid = form.password.length >= 6;
  const isConfirmValid =
    form.confirmPassword.length > 0 && form.confirmPassword === form.password;

  const canSubmit = useMemo(() => {
    return (
      form.username.trim() &&
      form.email.trim() &&
      form.password.trim() &&
      form.confirmPassword.trim()
    );
  }, [form]);

  const handleChange = (key) => (e) => {
    setForm((p) => ({ ...p, [key]: e.target.value }));
    setErrors((p) => ({ ...p, [key]: "" }));
  };

  const validateAll = () => {
    const next = { username: "", email: "", password: "", confirmPassword: "" };

    if (!form.username.trim()) next.username = "Username is required";
    else if (!isUsernameValid)
      next.username = "Username must be at least 3 characters";

    if (!form.email.trim()) next.email = "Email is required";
    else if (!isEmailValid) next.email = "Enter a valid email address";

    if (!form.password) next.password = "Password is required";
    else if (!isPasswordValid)
      next.password = "Password must be at least 6 characters";

    if (!form.confirmPassword) next.confirmPassword = "Confirm your password";
    else if (!isConfirmValid) next.confirmPassword = "Passwords do not match";

    setErrors(next);

    return !Object.values(next).some(Boolean);
  };

  const handleCreateAccount = async () => {
    const ok = validateAll();
    if (!ok) return;

    try {
      const user = await signUpUserWithEmailAndPassword(
        form.email.trim(),
        form.password,
      );

      await sendVerificationEmail(user);

      await saveUserToTable({
      uid: user.uid,
      username: form.username.trim(),
      email: form.email.trim(),
    });


      router.push("/Auth/login");
    } catch (err) {
      console.error(err);

      const code = err?.code || "";
      if (code === "auth/email-already-in-use") {
        setErrors((p) => ({ ...p, email: "Email already in use." }));
      } else if (code === "auth/invalid-email") {
        setErrors((p) => ({ ...p, email: "Enter a valid email." }));
      } else if (code === "auth/weak-password") {
        setErrors((p) => ({ ...p, password: "Password is too weak." }));
      } else {
        setErrors((p) => ({ ...p, email: "Signup failed. Try again." }));
      }
    }
  };

  // ✅ Reusable field styling:
  // 1) Focused (even if empty) => blue border + blue shadow + white bg
  // 2) Filled (even after blur) => white bg stays
  // 3) Keeps browser suggestions + removes blue autofill background
  const getTextFieldSx = (hasValue) => ({
    "& .MuiOutlinedInput-root": {
      height: 45,
      borderRadius: 3,
      backgroundColor: hasValue ? "#FFFFFF" : "#F6F6F6",
      fontSize: "16px",

      // ✅ DEFAULT (deselected) BORDER
      "& fieldset": {
        borderColor: "#D1D1D1",
        borderWidth: "1px",
      },

      // optional hover
      "&:hover fieldset": {
        borderColor: "#D1D1D1",
      },

      // ✅ FOCUSED STATE
      "&.Mui-focused": {
        backgroundColor: "#FFFFFF",
        boxShadow: "0 0 0 4px rgba(39, 111, 212, 0.25)", // #276FD4 shadow
      },
      "&.Mui-focused fieldset": {
        borderColor: "#4167F2",
        borderWidth: "1.5px",
      },

      "& input::placeholder": {
        fontSize: "13px",
        opacity: 1,
        fontWeight: 500,
        color: "#6D6D6D",
      },
    },

    // Autofill fix (unchanged)
    "& input:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0 1000px ${hasValue ? "#FFFFFF" : "#F6F6F6"} inset`,
      WebkitTextFillColor: "#111",
      caretColor: "#111",
      transition: "background-color 9999s ease-out 0s",
    },
  });

  const checkIcon = (
    <InputAdornment position="end">
      <CheckCircleRoundedIcon sx={{ color: "#22C55E", fontSize: 20 }} />
    </InputAdornment>
  );

  return (
    <WrapperComponent style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingY: 0, backgroundColor: "#fff", gap: '10px', height: '100%' }}>
      <Box
        sx={{
          height: "100dvh",
          width: "100%",
          overflow: "hidden", // no scroll anywhere
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
            gap: 1.6,
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

          <Typography sx={{ fontSize: 22, fontWeight: 800, color: "#000000" }}>
            Create your account
          </Typography>

          <Typography
            sx={{
              fontSize: 13.5,
              fontWeight: 500,
              color: "#6D6D6D",
              textAlign: "center",
              maxWidth: 280,
            }}
          >
            Join Flutter Kanpur and be part of the community.
          </Typography>

          {/* Inputs */}
          <Box
            sx={{
              width: { xs: "100%", sm: 325 },
              maxWidth: 325,
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <TextField
              placeholder="Username"
              value={form.username}
              onChange={handleChange("username")}
              error={Boolean(errors.username)}
              helperText={errors.username}
              fullWidth
              InputProps={{
                endAdornment: isUsernameValid && checkIcon,
              }}
              sx={getTextFieldSx(Boolean(form.username.trim()))}
            />

            <TextField
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange("email")}
              error={Boolean(errors.email)}
              helperText={errors.email}
              fullWidth
              autoComplete="email"
              InputProps={{
                endAdornment: isEmailValid && checkIcon,
              }}
              sx={getTextFieldSx(Boolean(form.email.trim()))}
            />

            <TextField
              placeholder="Create Password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange("password")}
              error={Boolean(errors.password)}
              helperText={errors.password}
              fullWidth
              autoComplete="new-password"
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
              }}
              sx={getTextFieldSx(Boolean(form.password))}
            />

            <TextField
              placeholder="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange("confirmPassword")}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              fullWidth
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword((s) => !s)}
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
              }}
              sx={getTextFieldSx(Boolean(form.confirmPassword))}
            />
          </Box>

          <Box sx={{ width: "100%", maxWidth: 325, mt: 1 }}>
            <PrimaryButton onClick={handleCreateAccount} disabled={!canSubmit}>
              Create account
            </PrimaryButton>
          </Box>

          <Typography sx={{ fontSize: 13.5, fontWeight: 500, color: "#161616", marginBottom:12 }}>
            Already have an account?{" "}
            <Box
              component="span"
              onClick={() => router.push("/Auth/login")}
              sx={{ color: "#4167F2", cursor: "pointer", fontWeight: 500 }}
            >
              Log in
            </Box>
          </Typography>
        </Box>
      </Box>
    </WrapperComponent>
  );
}
