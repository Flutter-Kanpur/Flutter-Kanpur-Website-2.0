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
import { supabase } from "@/lib/supabase/client";

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

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const [loading, setLoading] = useState(false);

  // VALIDATIONS

  const isUsernameValid = form.username.trim().length >= 3;

  const isEmailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

  const isPasswordValid = form.password.length >= 6;

  const isConfirmValid =
    form.confirmPassword.length > 0 &&
    form.confirmPassword === form.password;

  const canSubmit = useMemo(() => {
    return (
      form.username.trim() &&
      form.email.trim() &&
      form.password &&
      form.confirmPassword
    );
  }, [form]);

  // -----------------------------
  // HANDLE INPUT CHANGE
  // -----------------------------

  const handleChange = (key) => (e) => {
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: "",
      general: "",
    }));
  };

  // VALIDATE FORM

  const validateAll = () => {
    const next = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    };

    if (!form.username.trim()) {
      next.username = "Username is required";
    } else if (!isUsernameValid) {
      next.username = "Username must be at least 3 characters";
    }

    if (!form.email.trim()) {
      next.email = "Email is required";
    } else if (!isEmailValid) {
      next.email = "Enter a valid email address";
    }

    if (!form.password) {
      next.password = "Password is required";
    } else if (!isPasswordValid) {
      next.password = "Password must be at least 6 characters";
    }

    if (!form.confirmPassword) {
      next.confirmPassword = "Confirm your password";
    } else if (!isConfirmValid) {
      next.confirmPassword = "Passwords do not match";
    }

    setErrors(next);

    return !Object.values(next).some(Boolean);
  };


  const handleCreateAccount = async () => {
    if (!validateAll()) return;

    setLoading(true);

    try {
      const username = form.username.trim();
      const email = form.email.trim().toLowerCase();
      const password = form.password;

      // Create Supabase Auth account
      const { data, error } = await supabase.auth.signUp({
        email,
        password,

        // Store username in Supabase Auth user metadata
        options: {
          data: {
            username,
          },
        },
      });

      if (error) {
        console.error("SUPABASE SIGNUP ERROR:", error);

        if (
          error.message.toLowerCase().includes("already registered") ||
          error.message.toLowerCase().includes("already exists")
        ) {
          setErrors((prev) => ({
            ...prev,
            email: "Email already in use.",
          }));
        } else if (
          error.message.toLowerCase().includes("password")
        ) {
          setErrors((prev) => ({
            ...prev,
            password: error.message,
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            general: error.message || "Signup failed. Try again.",
          }));
        }

        return;
      }

      console.log("SUPABASE SIGNUP SUCCESS:", data);


      if (data.user) {
        // Email verification enabled
        if (!data.session) {
          alert(
            "Account created successfully! Please check your email to verify your account."
          );

          router.push("/Auth/login");
          return;
        }

        // Email verification disabled
        router.push("/");
      }
    } catch (err) {
      console.error("CREATE ACCOUNT ERROR:", err);

      setErrors((prev) => ({
        ...prev,
        general: "Something went wrong. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };


  const getTextFieldSx = (hasValue) => ({
    "& .MuiOutlinedInput-root": {
      height: 45,
      borderRadius: 3,
      backgroundColor: hasValue ? "#FFFFFF" : "#F6F6F6",
      fontSize: "16px",

      "& fieldset": {
        borderColor: "#D1D1D1",
        borderWidth: "1px",
      },

      "&:hover fieldset": {
        borderColor: "#D1D1D1",
      },

      "&.Mui-focused": {
        backgroundColor: "#FFFFFF",
        boxShadow: "0 0 0 4px rgba(39, 111, 212, 0.25)",
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

    "& input:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0 1000px ${
        hasValue ? "#FFFFFF" : "#F6F6F6"
      } inset`,
      WebkitTextFillColor: "#111",
      caretColor: "#111",
      transition: "background-color 9999s ease-out 0s",
    },
  });


  const checkIcon = (
    <InputAdornment position="end">
      <CheckCircleRoundedIcon
        sx={{
          color: "#22C55E",
          fontSize: 20,
        }}
      />
    </InputAdornment>
  );

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
          overflow: "hidden",
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

          {/* Title */}
          <Typography
            sx={{
              fontSize: 22,
              fontWeight: 800,
              color: "#000000",
            }}
          >
            Create your account
          </Typography>

          {/* Subtitle */}
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
            {/* USERNAME */}
            <TextField
              placeholder="Username"
              value={form.username}
              onChange={handleChange("username")}
              error={Boolean(errors.username)}
              helperText={errors.username}
              fullWidth
              slotProps={{
                input: {
                  endAdornment: isUsernameValid ? checkIcon : null,
                },
              }}
              sx={getTextFieldSx(Boolean(form.username.trim()))}
            />

            {/* EMAIL */}
            <TextField
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange("email")}
              error={Boolean(errors.email)}
              helperText={errors.email}
              fullWidth
              autoComplete="email"
              slotProps={{
                input: {
                  endAdornment: isEmailValid ? checkIcon : null,
                },
              }}
              sx={getTextFieldSx(Boolean(form.email.trim()))}
            />

            {/* PASSWORD */}
            <TextField
              placeholder="Create Password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange("password")}
              error={Boolean(errors.password)}
              helperText={errors.password}
              fullWidth
              autoComplete="new-password"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword((prev) => !prev)
                        }
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
                },
              }}
              sx={getTextFieldSx(Boolean(form.password))}
            />

            {/* CONFIRM PASSWORD */}
            <TextField
              placeholder="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange("confirmPassword")}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              fullWidth
              autoComplete="new-password"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword((prev) => !prev)
                        }
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
                },
              }}
              sx={getTextFieldSx(Boolean(form.confirmPassword))}
            />
          </Box>

          {/* GENERAL ERROR */}
          {errors.general && (
            <Typography
              sx={{
                width: "100%",
                maxWidth: 325,
                fontSize: 13,
                color: "#EF4444",
                textAlign: "center",
              }}
            >
              {errors.general}
            </Typography>
          )}

          {/* CREATE ACCOUNT */}
          <Box
            sx={{
              width: "100%",
              maxWidth: 325,
              mt: 1,
            }}
          >
            <PrimaryButton
              onClick={handleCreateAccount}
              disabled={!canSubmit || loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </PrimaryButton>
          </Box>

          {/* LOGIN */}
          <Typography
            sx={{
              fontSize: 13.5,
              fontWeight: 500,
              color: "#161616",
              marginBottom: 12,
            }}
          >
            Already have an account?{" "}
            <Box
              component="span"
              onClick={() => router.push("/Auth/login")}
              sx={{
                color: "#4167F2",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Log in
            </Box>
          </Typography>
        </Box>
      </Box>
    </WrapperComponent>
  );
}