import FooterComponent from "@/components/FooterComponent";
import Hero from "@/components/explorePageComponents/Hero";
import StoriesSection from "@/components/explorePageComponents/StoriesSection";
import Features from "@/components/explorePageComponents/Features";
import Projects from "@/components/explorePageComponents/Projects";
import Discussions from "@/components/explorePageComponents/Discussions";
import ExploreCategoriesSection from "@/components/landingPageComponents/ExploreCategories";
import { exploreCategoriesContent } from "@/data/exploreCategoriesData";

export default function ExplorePage() {
  return (
    <>
      <Hero />
      <StoriesSection />
      <Features />

      <Projects />

      <Discussions />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "72px 24px",
        }}
      >
        <ExploreCategoriesSection
          title={exploreCategoriesContent.title}
          titleHighlight={exploreCategoriesContent.titleHighlight}
          categories={exploreCategoriesContent.categories}
          variant="explore"
        />
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px 48px",
        }}
      >
        <FooterComponent />
      </div>
    </>
  );
}
