import styles from "./Hero.module.css";
import Image from "next/image";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <span className={styles.badge}>Explore</span>
        <h1 className={styles.heading}>
          Discover blogs, projects,
          <br />
          discussions, and what&apos;s new on the
          <br />
          platform.
        </h1>

        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          commodo cursus magna, vel
           <br />
           scelerisque nisl consectetur et. Donec
          ullamcorper nulla non metus auctor fringilla.
        </p>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search blogs, projects, discussions..."
            className={styles.searchInput}
          />

          <span className={styles.searchIcon}>
            <Image
              src="/assets/explore-page-assets/search-icon.svg"
              alt="Search"
              width={18}
              height={18}
            />
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
