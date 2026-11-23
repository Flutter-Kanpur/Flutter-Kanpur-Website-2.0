"use client";

import { useParams } from "next/navigation";
import ProjectUploadErrorScreen from "@/components/communityScreen/projectScreen/ProjectUploadErrorScreen";

// Reuses the community error screen with Open call copy.
const ApplicationErrorPage = () => {
  const { id } = useParams();

  return (
    <ProjectUploadErrorScreen
      title="Couldn't submit your application"
      message="Please check your internet connection and try again."
      retryHref={`/explore/open-calls/${id}/apply`}
      backLabel="Back to open calls"
      backHref="/explore/open-calls"
    />
  );
};

export default ApplicationErrorPage;
