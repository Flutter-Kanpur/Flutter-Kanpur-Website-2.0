import React from "react";
import styles from "./StoriesSection.module.css";
import { exploreData } from "@/data/exploreData";
import StoryCard from "@/components/explorePageComponents/cards/StoryCard";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton";
import Image from "next/image";

const StoriesSection = () => {
  return (
    <section className={styles.storiesSection}>
      <section className={styles.container}>
        <div className={styles.left}>
          <h1>
            Explore Stories <br />
            Written by Fellow <br />
            Users
          </h1>

          <p>
            Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Vestibulum id ligula porta felis
            euismod semper. Aenean lacinia bibendum nulla sed consectetur. Cras
            mattis consectetur purus sit amet fermentum. Maecenas sed diam eget
            risus varius blandit sit amet non magna. Nullam id dolor id nibh
            ultricies vehicula ut id elit.
          </p>

          <PrimaryButton
            fullWidth={false}
            sx={{
              width: "fit-content",
              minWidth: "unset",
              maxWidth: "unset",
              px: 3,
              mt: "auto",
            }}
            endIcon={
              <Image
                src="/assets/explore-page-assets/eye-icon.svg"
                alt="View"
                width={18}
                height={18}
              />
            }
          >
            View more blogs
          </PrimaryButton>
        </div>

        <div className={styles.right}>
          <div className={styles.grid}>
            {exploreData.map((item) => (
              <StoryCard key={item.id} story={item} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default StoriesSection;
