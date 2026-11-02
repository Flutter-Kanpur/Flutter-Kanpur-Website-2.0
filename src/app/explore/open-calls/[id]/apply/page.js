"use client";

import { useParams } from "next/navigation";
import ApplyOpenCallScreen from "@/components/explorePageComponents/mobileScreen/openCalls/ApplyOpenCallScreen";

const ApplyOpenCallPage = () => {
  const { id } = useParams();

  return <ApplyOpenCallScreen callId={id} />;
};

export default ApplyOpenCallPage;
