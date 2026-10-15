import PrimaryButton from "@/components/buttons/PrimaryButton/PrimaryButton";
import Image from "next/image";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TimerRoundedIcon from "@mui/icons-material/TimerRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import styles from "./CommunityMembers.module.css";
import { teamClusters } from "@/data/communityData";

// Maps each member's `accent`/`badgeColor` key to an existing theme color
// and plus the two extra tag colors

const ACCENT_COLORS = {
  primary: "#4167F2",
  pending: "#EF9F20",
  success: "#00B374",
  neutral: "#6D6D6D",
  violet: "#6E1A98",
};


function PhotoTile({ member }) {
  return (
    <div
      className={`${styles.tile} ${member.shape === "circle" ? styles.circle : ""}`}
      style={{
        left: `${member.rect.left}%`,
        top: `${member.rect.top}%`,
        width: `${member.rect.width}%`,
        height: `${member.rect.height}%`,
        transform: `rotate(${member.rotate}deg)`,
        zIndex: member.z,
      }}
    >
      <span className={styles.tileImageWrap}>
        <img
          src={member.image}
          alt={member.tag?.role || "Flutter Kanpur community member"}
          className={styles.tileImage}
          loading="lazy"
        />
      </span>

      {member.badge && (
        <span
          className={styles.cornerBadge}
          style={{ background: ACCENT_COLORS[member.badgeColor] }}
        >
          {member.badge === "check" ? (
            <CheckRoundedIcon sx={{ fontSize: 14 }} />
          ) : (
            <AddRoundedIcon sx={{ fontSize: 14 }} />
          )}
        </span>
      )}
    </div>
  );
}

// Renders the small role/name 
function MemberTag({ member }) {
  const accent = ACCENT_COLORS[member.tag.accent] || ACCENT_COLORS.primary;
  const TagIcon = member.tag.icon === "timer" ? TimerRoundedIcon : null;

  return (
    <span
      className={styles.tag}
      style={{ left: `${member.tagPos.left}%`, top: `${member.tagPos.top}%` }}
    >
      <span className={styles.tagDot} style={{ background: accent }}>
        {TagIcon ? <TagIcon sx={{ fontSize: 16, color: "#FFFFFF" }} /> : member.tag.value}
      </span>
      <span className={styles.tagText}>
        <span className={styles.tagRole}>{member.tag.role}</span>
        <span className={styles.tagName}>{member.tag.name}</span>
      </span>
    </span>
  );
}

export default function MeetTheTeamSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Meet the Team</span>
        <h2 className={styles.heading}>Explore profiles of Flutter Kanpur members and connect with like-minded developers.</h2>

        <PrimaryButton
          fullWidth={false}
          sx={{
            width: "fit-content",
            minWidth: "0",
            maxWidth: "none",
            px: "28px",
            fontSize: "16px",
            fontWeight: 500,
            m:'38px'
            ,
          }}
          endIcon={
            <Image
              src="/assets/explore-page-assets/eye-icon.svg"
              alt=""
              width={16}
              height={16}
            />
          }
        >
          View all members
        </PrimaryButton>
      </div>

      <div className={styles.collage}>
        <AutoAwesomeRoundedIcon
          className={`${styles.sparkle} ${styles.sparkleOne}`}
          sx={{ color: "#EF9F20" }}
        />
        <AutoAwesomeRoundedIcon
          className={`${styles.sparkle} ${styles.sparkleTwo}`}
          sx={{ color: "#EF9F20" }}
        />
        <AutoAwesomeRoundedIcon
          className={`${styles.sparkle} ${styles.sparkleThree}`}
          sx={{ color: "#EF9F20" }}
        />
        <AutoAwesomeRoundedIcon
          className={`${styles.sparkle} ${styles.sparkleFour}`}
          sx={{ color: "#EF9F20" }}
        />
        <AutoAwesomeRoundedIcon
          className={`${styles.sparkle} ${styles.sparkleFive}`}
          sx={{ color: "#EF9F20" }}
        />
        <AutoAwesomeRoundedIcon
          className={`${styles.sparkle} ${styles.sparkleSix}`}
          sx={{ color: "#EF9F20" }}
        />

        {teamClusters.map((cluster) => (
          <div
            key={cluster.id}
            className={styles.cluster}
            style={{ aspectRatio: cluster.aspectRatio, flexGrow: cluster.flexGrow }}
          >
            {cluster.members.map((member) => (
              <PhotoTile key={member.id} member={member} />
            ))}
            {cluster.members
              .filter((member) => member.tag)
              .map((member) => (
                <MemberTag key={`tag-${member.id}`} member={member} />
              ))}
          </div>
        ))}
      </div>
    </section>
  );
}
