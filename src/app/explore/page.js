import FooterComponent from "@/components/FooterComponent";
import Hero from "@/components/explorePageComponents/Hero";
import StoriesSection from "@/components/explorePageComponents/StoriesSection";
import Features from "@/components/explorePageComponents/Features";
import Projects from "@/components/explorePageComponents/Projects";
import Discussions from "@/components/explorePageComponents/Discussions";
import ExploreCategoriesSection from "@/components/landingPageComponents/ExploreCategories";
import { exploreCategoriesContent } from "@/data/exploreCategoriesData";
import styles from "./page.module.css";

export default function ExplorePage() {
  return (
    <> 
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
    </>
  );
}
