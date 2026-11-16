import { useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormField from "./FormField";
import Image from "next/image";

const FileDropzone = ({
  label = "Upload screenshot or file (optional)",
  file,
  onFile,
  accept = "*/*",
}) => {
  const inputRef = useRef(null);

  const handleFiles = (files) => {
    const nextFile = files?.[0];
    if (nextFile) onFile?.(nextFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  return (
    <FormField label={label}>
      <Box
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        sx={{
          width: "100%",
          height: "135px",
          boxSizing: "border-box",
          border: "1px dashed #D0D0D0",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#707070",
          backgroundColor: "#FFFFFF",
          gap: "8px",
        }}
      >
        <Image
         src="/assets/community-page-assets/CloudUploadOutlinedIcon.svg"
         width={24}
         height={24}
         alt="Cloud Upload Icon"
        />
        
        

        <Typography
          sx={{
            fontSize: "16px",
            lineHeight: "20px",
            color: "#707070",
            m: 0,
          }}
        >
          {file ? file.name : "Choose a file or drag & drop it here."}
        </Typography>

        <Box
          component="button"
          type="button"
          onClick={() => inputRef.current?.click()}
          sx={{
            minWidth: "108px",
            height: "37px",
            px: "14px",
            border: "1px solid #D4D8E8",
            borderRadius: "7px",
            backgroundColor: "#FFFFFF",
            color: "#111111",
            fontFamily: "inherit",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
          }}
        >
          Browse files
        </Box>

        <Box
          ref={inputRef}
          component="input"
          type="file"
          accept={accept}
          onChange={(event) => handleFiles(event.target.files)}
          sx={{ display: "none" }}
        />
      </Box>
    </FormField>
  );
};

export default FileDropzone;
