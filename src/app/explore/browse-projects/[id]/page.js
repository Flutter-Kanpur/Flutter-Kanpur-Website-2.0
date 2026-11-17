"use client";

import { useParams } from "next/navigation";
import ProjectDetailScreen from "@/components/explorePageComponents/mobileScreen/projects/ProjectDetailScreen";

const ProjectDetailPage = () => {
  const { id } = useParams();

  return <ProjectDetailScreen projectId={id} />;
};

export default ProjectDetailPage;
