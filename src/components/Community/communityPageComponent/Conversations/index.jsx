import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton";
import styles from "./Conversations.module.css";

import {
  
  conversationFeatures,
} from "@/data/communityData";
import Image from "next/image";


const icon = "/assets/community-page-assets/conversation.svg";


export default function ConversationsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <h2 className={styles.heading}>
            <span className={styles.headingAccent}>
              Conversations
            </span>{" "}
            that move the community forward
          </h2>
          <p className={styles.description}>
            Engage in topic-based discussions, ask questions, help others, and exchange ideas around Flutter, Dart, tools, careers, and real-world development challenges.
          </p>

          <div className={styles.featureGrid}>
            {conversationFeatures.map((feature) => {
              
              return (
                <div
                  key={feature.id}
                  className={`${styles.featureItem} ${styles[feature.area]}`}
                >
                  <Image 
                  src={icon}
                  height={22}
                  width={22}
                  alt="Conversation Icon"
                  />
                  <span>{feature.title}</span>
                </div>
              );
            })}
          </div>

          <PrimaryButton
            fullWidth={false}
            sx={{
              width: "fit-content",
              minWidth: "0",
              maxWidth: "none",
              px: "32px",
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            Start a discussion
          </PrimaryButton>
        </div>

        <div className={styles.right}>
          <Image
            src="/assets/community-page-assets/community-convo.svg"
            alt="conversation Image"
            width={503}
            height={572}              
                          
          />
        </div>
      </div>
    </section>
  );
}
