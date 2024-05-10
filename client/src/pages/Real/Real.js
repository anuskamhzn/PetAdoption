import React from "react";
import styles from "./Real.module.css";
import improveImg from "../../imag/petpalslogo (2).png";

const Real = () => {
  return (
    <div className="mb-5 overflow-hidden  real ">
      <div className="row g-0">
        <div className={`col-md-6 ${styles.imgDiv}`}>
          <img
            data-aos="slide-right"
            data-aos-offset="150"
            src={improveImg}
            alt=""
            className={styles.img}
          />
        </div>
        <div className="col-md-6">
          <div className={styles.text}>
            <p
              data-aos="slide-right"
              data-aos-offset="150"
              className={styles.heading}
            >
              Real
            </p>
            <p
              data-aos="slide-left"
              data-aos-offset="150"
              className={styles.subHeading}
            >
              Great Snooker Experiences
            </p>
            <p
              data-aos="zoom-in"
              data-aos-offset="150"
              className={styles.content}
            >
              At SnookerHouse, we've created the ideal spot for chilling out
              with friends and enjoying some cue action. Our place is all about
              good vibes, great games, and making memories. Plus, we've got you
              covered with the best cues, accessories, and tools – everything
              you need for a fantastic time. So, whether you're a pro or just
              looking for a fun hangout, SnookerHouse is where it's at! Join us
              for a relaxed yet thrilling experience, and let the good times
              roll.{" "}
            </p>
            <div data-aos="zoom-in" style={{ textAlign: "left" }}>
              <button className={`btn custom_btn ${styles.btn}`}>
                LET&apos;S TALK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Real;
