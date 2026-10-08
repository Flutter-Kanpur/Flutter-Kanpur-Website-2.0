import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton";
import styles from "./BuiltOnRespectSection.module.css";
import Image from "next/image";
import { height } from "@mui/system";
import { Button } from "@mui/material";



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
            <Button sx={{
                backgroundColor: '#1A1A1A',
                color: '#FFF',
                padding: '12px 19px',
                borderRadius: '100px',
                textTransform: 'none',
                fontSize: '18px',
                fontWeight: 500,
                
                '&:hover': {
                    backgroundColor: '#333'
                }
            }}>
            <span >Join our discord</span>
            
              
            
        </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
