"use client";

import { useParams } from "next/navigation";
import JobDetailScreen from "@/components/explorePageComponents/mobileScreen/jobs/JobDetailScreen";

const JobDetailPage = () => {
  const { id } = useParams();

  return <JobDetailScreen jobId={id} />;
};

export default JobDetailPage;
