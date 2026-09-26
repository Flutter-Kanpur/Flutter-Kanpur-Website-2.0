import { Button } from "@mui/material";
import styles from "./Hero.module.css";
import Image from "next/image";
import { height } from "@mui/system";




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
          The Flutter Kanpur Community is a space to asks questions, share knowledge, participate in 
          <br /> discussions and build your prsence through meaningfull contributions.
        
        </p>

        
        
        <Button sx={{
                backgroundColor: '#1A1A1A',
                color: '#FFF',
                padding: '16px 48px',
                borderRadius: '100px',
                textTransform: 'none',
                fontSize: '18px',
                fontWeight: 500,
                mt: 1,
                '&:hover': {
                    backgroundColor: '#333'
                }
            }}>
            <span >Join our discord</span>
            
              <Image
                src="/assets/community-page-assets/arrow-left.svg"
                alt="Left Arrow"
                width={18}
                height={18}
                style={{ marginLeft: "10px" }}
              />
            
        </Button>

        
        
        
      </div>
    </section>
  );
};

export default Hero;
