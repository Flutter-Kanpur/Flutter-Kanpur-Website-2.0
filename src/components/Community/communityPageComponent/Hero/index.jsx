import { Button } from "@mui/material";
import styles from "./Hero.module.css";
import Image from "next/image";

const DISCORD_URL =
  process.env.NEXT_PUBLIC_DISCORD_URL || "https://discord.gg/flutterkanpur";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <span className={styles.badge}>Community</span>

        <h1 className={styles.heading}>
          Where interaction builds reputation and
          <br />
          collabration builds growth
        </h1>

        <p className={styles.description}>
          The Flutter Kanpur Community is a space to asks questions, share
          knowledge, participate in
          <br />
          discussions and build your prsence through meaningfull contributions.
        </p>

        <Button
          component="a"
          href={DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            backgroundColor: "#1A1A1A",
            color: "#FFF",
            fontSize: "clamp(13px, calc(9px + 0.75vw), 18px)",
            padding: "0.55em 2em",
            borderRadius: "100px",
            textTransform: "none",
            fontWeight: 500,
            mt: 1,
            textDecoration: "none",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          <span>Join our discord</span>

          <Image
            src="/assets/forum-page-assets/right-arrow.svg"
            alt="Left Arrow"
            width={18}
            height={18}
            style={{ marginLeft: "0.55em", width: "1em", height: "1em" }}
          />
        </Button>
      </div>
    </section>
  );
};

export default Hero;