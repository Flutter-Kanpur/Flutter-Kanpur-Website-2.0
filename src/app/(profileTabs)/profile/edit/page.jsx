"use client";

import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/client";

import ProfileAvatarCard from "@/components/profile/edit/ProfileAvatarCard";
import ProfileBasicInfo from "@/components/profile/edit/ProfileBasicInfo";
import SocialLinksSection from "@/components/profile/edit/SocialLinksSection";
import SuccessOverlay from "@/components/profile/edit/SuccessOverlay";
import ActionButtons from "@/components/profile/edit/ActionButtons";

import DesktopEditProfile from "@/components/profile/edit/DesktopEditProfilePage";
import MobileLayout from "@/components/layouts/MobileLayout";
import GradientHeader from "@/components/header/GradientHeader";

export default function EditProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);

        // Get currently logged-in Supabase user
        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) {
          console.error("AUTH USER ERROR:", authError);
          router.push("/auth/login");
          return;
        }

        if (!authUser) {
          router.push("/auth/login");
          return;
        }

        setUser(authUser);

        console.log("LOGGED IN AUTH USER:", authUser);

        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("*")
          .eq("uid", authUser.id)
          .maybeSingle();

        if (profileError) {
          console.error("USERS TABLE ERROR:", profileError);
          return;
        }

        console.log("PROFILE FROM USERS TABLE:", profile);

        if (profile) {
          setName(
            profile.full_name ||
              profile.display_name ||
              ""
          );

          setUsername(profile.username || "");

          setAbout(profile.bio || "");

          setExperience(
            experienceToLabel(profile.years_of_experience)
          );

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

          setPhotoURL(
            authUser.user_metadata?.avatar_url || ""
          );
        }
      } catch (error) {
        console.error("LOAD PROFILE ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB.");
      return;
    }

    setSelectedFile(file);

    const previewUrl = URL.createObjectURL(file);
    setPhotoURL(previewUrl);
  };


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

  const handleUpdate = async () => {
    if (!user) return;

    try {
      setLoading(true);

      let finalPhotoURL = photoURL;

      if (selectedFile) {
        finalPhotoURL = await uploadProfileImage();
      }

      const yearsOfExperience =
        experienceToNumber(experience);

      // Update existing users row
      const { error: updateError } = await supabase
        .from("users")
        .update({
          display_name: name.trim(),
          full_name: name.trim(),
          username: username.trim(),
          bio: about.trim(),
          years_of_experience: yearsOfExperience,
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

      console.log("PROFILE UPDATED SUCCESSFULLY");

      setSelectedFile(null);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        router.back();
      }, 1500);
    } catch (error) {
      console.error("UPDATE ERROR:", error);

      alert(
        error?.message ||
          "Unable to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) {
    return (
      <MobileLayout>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Loading profile...
        </Box>
      </MobileLayout>
    );
  }

  return (
    <>
      <DesktopEditProfile />

      <MobileLayout>
        <GradientHeader
          title="Edit profile"
          onBack={() => router.back()}
          sx={{ mb: "-60px" }}
        />

        {showSuccess && <SuccessOverlay />}

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            p: 2,
          }}
        >
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
      </MobileLayout>
    </>
  );
}