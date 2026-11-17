import FooterComponent from "@/components/FooterComponent";
import Hero from "@/components/explorePageComponents/Hero";
import StoriesSection from "@/components/explorePageComponents/StoriesSection";
import Features from "@/components/explorePageComponents/Features";
import Projects from "@/components/explorePageComponents/Projects";
import Discussions from "@/components/explorePageComponents/Discussions";
import MemberStoriesSection from "@/components/explorePageComponents/MemberStoriesSection";
import ScreenUtilScaler from "@/components/layouts/ScreenUtilScaler";
import { ULTRA_WIDE_MIN } from "@/theme/breakpoints";
import styles from "./page.module.css";

const DESIGN_WIDTH = 1440;

export default function ExplorePage() {
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

      <MemberStoriesSection />

      <div className={styles.footerContainer}>
        <FooterComponent />
      </div>
    </ScreenUtilScaler>
  );
}
