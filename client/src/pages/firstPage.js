import wallpaper from "../imag/pet2.jpg";
import interior from "../imag/pet2.jpg";

import {Link}  from 'react-router-dom';

const img1 = wallpaper;
const img2 = interior;

export default function () {
  return (
    <>
      <div className="pt-5 pb-5">
        <div className="wallpaper">
          <div className="d-flex position-relative">
            <div className="wallpaper">
              <img src={img1} className="img-fluid" alt="" />
            </div>
            <div className="d-flex align-item-center justify-content-center">
            <div className="card-home ">
                <p>I want to adopt a pet </p>
                <p>Search the available pets listed on PetRehomer</p>
                <Link  to="/" className="btn btn-primary ms-1" >Click here</Link>

            </div>
            </div>
          </div>
        </div>
      
      </div>
    </>
  );
}