import React from "react";
import styles from "./ChoosingUs.module.css";
import experience from "../../imag/experience.png";
import communication from "../../imag/communication.png";
import comfort from "../../imag/comfort.png";

const ChoosingUs = () => {
  return (
    <div style={{ backgroundColor: "#CCE9F1" }}>
      <div className="container overflow-hidden text-center">
        <p
          data-aos="slide-right"
          data-aos-offset="220"
          className={styles.heading}
        >
          Why choosing A-minute snooker?
        </p>
        <p data-aos="slide-left" className={styles.sub_text}>
          Elevate your snooker experience!{" "}
        </p>
        <div
          className={`row ${styles.sub} align-items-center justify-content-center`}
        >
          <div data-aos="fade-right" className="col-md-4 ">
            <img src={experience} alt="experience" />
            <p className={styles.logo_head}>Compassionate Care</p>
            <p className={styles.logo_text}>
              Ensuring every pet receives love and top-notch treatment.
            </p>
          </div>

          <div data-aos="fade" className="col-md-4">
            <img src={communication} alt="experience" />
            <p className={styles.logo_head}>Community Engagement</p>
            <p className={styles.logo_text}>
              Hosting events to promote pet welfare and responsible ownership.{" "}
            </p>
          </div>

          <div data-aos="fade-left" className="col-md-4">
            <img src={comfort} alt="experience" />
            <p className={styles.logo_head}>Lifelong Support</p>
            <p className={styles.logo_text}>
              Providing ongoing guidance for all pet-related needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChoosingUs;
