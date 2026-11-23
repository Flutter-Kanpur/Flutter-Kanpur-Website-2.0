"use client";

import { useParams } from "next/navigation";
import OpenCallDetailScreen from "@/components/explorePageComponents/mobileScreen/openCalls/OpenCallDetailScreen";

const OpenCallDetailPage = () => {
  const { id } = useParams();

  return <OpenCallDetailScreen callId={id} />;
};

export default OpenCallDetailPage;
