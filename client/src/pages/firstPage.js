import wallpaper from "../imag/pets.jpg";
import { Link } from 'react-router-dom';
import HomePage from "./HomePage";

const img1 = wallpaper;

export default function Home() {
  return (
    <div className="full-screen">
      <div className="wallpaper">
        <div className="d-flex align-items-center justify-content-center full-height">
          <img src={img1} className="img-fluid" alt="" />
          <div className="card-home position-absolute text-center">
            <h1>Find the perfect pet for your Home</h1>
            <p>Search the available pets listed on Pet-Pals</p>
            <Link to="/homepage" className="btn btn-primary ms-1">Click here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
