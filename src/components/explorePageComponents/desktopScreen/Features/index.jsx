import React from "react";
import styles from "./Features.module.css";
import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton";
import Image from "next/image";
import { featuresContent, featuresList } from "@/data/featuresData";

export default function Features() {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.label}>{featuresContent.label}</span>
        <h2 className={styles.sectionTitle}>{featuresContent.title}</h2>
      </div>

      <div className={styles.container}>
        <div className={styles.leftCard}>
          <div className={styles.logo}>
            <Image
              src={featuresContent.logo}
              alt="Readme"
              width={48}
              height={48}
            />
          </div>

          <p className={styles.lead}>
            {featuresContent.leadLead}
            <span className={styles.leadMuted}>
              {featuresContent.leadMuted}
            </span>
          </p>

          <PrimaryButton
            fullWidth={false}
            sx={{
              width: "fit-content",
              minWidth: "0",
              maxWidth: "none",
              px: "24px",
              fontSize: "18px",
              fontWeight: "400px",
              marginLeft: "-75px",
              marginTop: "24px",
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
            {featuresContent.ctaLabel}
          </PrimaryButton>
        </div>

        <div className={styles.rightGrid}>
          {featuresList.map((feature) => (
            <div
              key={feature.id}
              className={`${styles.featureItem} ${styles[feature.area]}`}
            >
              <Image
                src="/assets/explore-page-assets/write-blog.svg"
                alt=""
                width={18}
                height={18}
              />

              <span>{feature.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
