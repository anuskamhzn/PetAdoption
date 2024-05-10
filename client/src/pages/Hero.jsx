import caro1 from "../imag/img.jpg";
import caro2 from "../imag/img.png";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay } from "swiper/modules";

const Header = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      navigation={false}
      modules={[Autoplay]}
      className="mySwiper"
    >
      <div>
        <div class="h-100 p-0 " style={{ marginBottom: "10px" }}>
          <div class="owl-carousel header-carousel position-relative">
            <SwiperSlide>
              <div class="owl-carousel-item position-relative">
                <img class="img-fluid w-100" src={caro1} alt="" />
                <div
                  class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
                  style={{ backgroundColor: "rgba(0, 0, 0, .2)" }}
                >
                  <div class="container">
                    <div class="row  herotext">
                      <div class=" col-lg-7">
                        <h3
                          class="display-5 text-white mb-2  "
                          style={{ width: "100%" }}
                        >
                          Looking for a pet partner the town?{" "}
                        </h3>
                        <p class="fs-6 fw-medium text-white mb-2 ">
                          Get a friendly neighbourhood pet.
                        </p>
                        <Link
                          to="/Aboutus"
                          id="gold"
                          class="btn btn-hero text-white rounded-pill py-sm-3 px-sm-5 me-3 animated slideInLeft"
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class="owl-carousel-item position-relative ">
                <img class="img-fluid w-100" src={caro2} alt="" />
                <div
                  class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
                  style={{ backgroundColor: "rgba(0, 0, 0, .2)" }}
                >
                  <div class="container">
                    <div class="row  herotext">
                      <div class=" col-lg-7">
                        <h3
                          class="display-5 text-white mb-2  "
                          style={{ width: "100%" }}
                        >
                          Discover joy, love, and companionship with our
                          adorable adoptable pets{" "}
                        </h3>
                        <p class="fs-6 fw-medium text-white mb-2 ">
                          Find Your Fur-ever Friend at PetPals.
                        </p>
                        <Link
                          to="/Aboutus"
                          id="gold"
                          class="btn btn-hero text-white rounded-pill py-sm-3 px-sm-5 me-3 animated slideInLeft"
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </div>
        </div>
      </div>
    </Swiper>
  );
};

export default Header;
