"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProjectSubmittedScreen from "@/components/communityScreen/projectScreen/ProjectSubmittedScreen";

// Reuses the community "submitted" screen with Open call copy.
const ApplicationSubmittedPage = () => (
  <ProjectSubmittedScreen
    title="Application submitted"
    message="Thank you for applying. Our team will review your application and get back to you if shortlisted."
    status="Current status: Under review"
    buttonLabel="Back to open calls"
    href="/explore/open-calls"
    startIcon={<ArrowBackIcon sx={{ fontSize: 18 }} />}
    buttonWidth={252}
    spacing={{ titleMt: -12, messageMt: 14, statusMt: 25, buttonMt: 47 }}
  />
);

export default ApplicationSubmittedPage;
