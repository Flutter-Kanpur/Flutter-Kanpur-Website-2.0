
"use client";

import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckIcon from "@mui/icons-material/Check";
import MobileFormLayout from "../../FormComponents/MobileFormLayout";
import {
  
  projectShowcaseContent,
} from "@/data/projectScreenData";

const font = 'var(--font-product-sans), "Product Sans", sans-serif';

// Timeline geometry (px):
const CIRCLE = 28;
const LINE_W = 8;


/**
 * ProjectShowcaseScreen — "Showcase your work…" 
 */
const ProjectShowcaseScreen = () => {
  const router = useRouter();
  const { steps } = projectShowcaseContent;

  return (
    <MobileFormLayout formSx={{ mt: "136px", gap: 0 }}>
      <IconButton
        aria-label="Close"
        onClick={() => router.back()}
        sx={{
          position: "absolute",
          top: "-53.5px",
          right: "1px",
          p: 0,
          width: "22px",
          height: "22px",
          color: "#000000",
        }}
      >
        <CloseRoundedIcon sx={{ fontSize: "22px" }} />
      </IconButton>

      {/* Headline */}
      <Typography
        sx={{
          fontFamily: font,
          fontSize: "20px",
          fontWeight: 500,
          lineHeight: "25px",
          color: "#000000",
          textAlign: "center",
          whiteSpace: "pre-line",
        }}
      >
        Showcase your work and inspire <br/>other community members.
      </Typography>

      {/* Timeline */}
      <Box sx={{ position: "relative", mt: "46px", ml: "26px" }}>
        
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            left: `${(CIRCLE - LINE_W) / 2}px`,
            top: "15px",
            width: `${LINE_W}px`,
            height: "223px",
            background: "linear-gradient(180deg, #4167F2 0%, #FFFFFF 100%)",
           
          }}
        />

        <Box sx={{ width:"295px", display: "flex", flexDirection: "column", gap: "40px", }}>
          {steps.map((step) => (
            <Box
              key={step.id}
              sx={{ position: "relative", pl: `${CIRCLE + 14}px` }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  top: "1px",
                  width: `${CIRCLE}px`,
                  height: `${CIRCLE}px`,
                  borderRadius: "50%",
                  bgcolor: "#4167F2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                }}
              >
                <CheckIcon sx={{ fontSize: "15px", color: "#FFFFFF" }} />
              </Box>

              <Typography
                sx={{
                  fontFamily: font,
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  color: "#000000",
                }}
              >
                {step.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: font,
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                  color: "#6D6D6D",
                  mt: "5px",
                  whiteSpace: "pre-line",
                }}
              >
                {step.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* CTA card */}
      <Box
        sx={{
          width: "320px",
          maxWidth: "100%",
          mx: "auto",
          mt: "54.5px",
          pt: "20px",
          pb: "19px",
          borderRadius: "24px",
          bgcolor: "#EFF3FF",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <Typography
          sx={{
            fontFamily: font,
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "22px",
            color: "#000000",
          }}
        >
          Ready to share your project?
        </Typography>
        <Typography
          sx={{
            fontFamily: font,
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "23px",
            color: "#6D6D6D",
            mt: "7px",
            whiteSpace: "pre-line",
          }}
        >
          Upload your project and let the <br/>community inspired by your work.
        </Typography>
        <Button
          variant="contained"
          onClick={() => router.push("/community/project/upload")}
          sx={{
            mt: "15px",
            height: "38px",
            minWidth: 0,
            px: "14px",
            borderRadius: "999px",
            bgcolor: "#000000",
            color: "#FFFFFF",
            fontFamily: font,
            fontSize: "14px",
            fontWeight: 500,
            textTransform: "none",
            boxShadow: "none",
            "&:hover": { bgcolor: "#000000", boxShadow: "none" },
          }}
        >
          Upload project
        </Button>
      </Box>
    </MobileFormLayout>
  );
};

export default ProjectShowcaseScreen;