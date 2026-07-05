import EventPageComponent from "@/components/EventsPageComponents";
import PaddingContainer from "@/components/PaddingContainer";
import React from "react";
import NavbarSection from "@/components/EventsNavbar/NavbarSection";
import SearchSection from "@/components/EventsNavbar/SearchSection";

const page = () => {
  return (
    <PaddingContainer>
      <NavbarSection />
      <SearchSection />
      <EventPageComponent />
    </PaddingContainer>
  );
};

export default page;
