import titleImage from "./Assets/rent_stock.jpg";
import { Link } from "react-router-dom";
import ".//Styles/Hero.css";
function App() {

  return (

    <div className="hero">
      <img src={titleImage} alt='Rental Finder Hero Image' className="hero-image" />

      <div className="hero-text">
        <h1>Rental Finder</h1>
        <p className="subtitle">
          Explore variuos properties available for rent all trhoughout Australia!<br />
          Use filters to find the most suitable place for you!<br />
          Start {" "}
          <Link to="/table">
            <button type="button" className='button-link'>HERE</button>
          </Link>
        </p>
      </div>

    </div>
  )
}

export default App
