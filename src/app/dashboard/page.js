import DashboardClient from "./DashboardClient";
import { events, announcements } from "@/data/dashboardData";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <DashboardClient
      events={events}
      announcements={announcements}
    />
  );
}