"use client";

import { useMediaQuery } from "@mui/material";
import FooterComponent from "@/components/FooterComponent";
import Hero from "@/components/explorePageComponents/desktopScreen/Hero";
import StoriesSection from "@/components/explorePageComponents/desktopScreen/StoriesSection";
import Features from "@/components/explorePageComponents/desktopScreen/Features";
import Projects from "@/components/explorePageComponents/desktopScreen/Projects";
import Discussions from "@/components/explorePageComponents/desktopScreen/Discussions";
import ExploreScreen from "@/components/explorePageComponents/mobileScreen";
import ExploreCategoriesSection from "@/components/landingPageComponents/ExploreCategories";
import { exploreCategoriesContent } from "@/data/exploreCategoriesData";
import ScreenUtilScaler from "@/components/layouts/ScreenUtilScaler";
import { ULTRA_WIDE_MIN } from "@/theme/breakpoints";
import styles from "./page.module.css";

const DESIGN_WIDTH = 1440;

export default function ExplorePage() {
  const isMobile = useMediaQuery("(max-width:480px)");

  if (isMobile) return <ExploreScreen />;

  return (
    <ScreenUtilScaler
      designWidth={DESIGN_WIDTH}
      desktopMin={ULTRA_WIDE_MIN}
      allowUpscale
    >
      <Hero />

      <div className={styles.stories}>
        <StoriesSection />
      </div>

      <div className={styles.features}>
        <Features />
      </div>

      <div className={styles.projects}>
        <Projects />
      </div>

      <div className={styles.discussions}>
        <Discussions />
      </div>

      <div className={styles.container}>
        <ExploreCategoriesSection
          title={exploreCategoriesContent.title}
          titleHighlight={exploreCategoriesContent.titleHighlight}
          categories={exploreCategoriesContent.categories}
          variant="explore"
        />
      </div>

      <div className={styles.footerContainer}>
        <FooterComponent />
      </div>
    </ScreenUtilScaler>
  );
}