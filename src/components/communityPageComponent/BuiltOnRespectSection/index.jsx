import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton";
import styles from "./BuiltOnRespectSection.module.css";
import Image from "next/image";



function DiscordIcon() {
  return (
    <Image
    src="/assets/community-page-assets/discordIcon.svg"
    height={24}
    width={24}
    alt="Discard Icon"
    />
  );
}

export default function BuiltOnRespectSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <h2 className={styles.heading}>
            Built on Respect,
            <br />
            <span className={styles.headingAccent}>
              Learning & Inclusion
            </span>
          </h2>
          <p className={styles.description}>
            Flutter Kanpur values constructive discussions, inclusive participation, and collaborative learning—ensuring everyone feels welcome to contribute.
          </p>
        </div>

        <div className={styles.right}>
          <div className={styles.card}>
            <span className={styles.iconWrap}>
              <DiscordIcon />
            </span>
            <h3 className={styles.cardTitle}>
              Join Our Discord
            </h3>
            <p className={styles.cardDescription}>
              Share your feedback, suggestions or simply chat with our community of passionate developers.
            </p>
            <PrimaryButton
              fullWidth={false}
              sx={{
                width: "fit-content",
                minWidth: "0",
                maxWidth: "none",
                px: "28px",
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              Join discord
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
