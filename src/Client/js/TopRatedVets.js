
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "../css/TopRatedVets.css";

const TopRatedVets = () => {
  const [vets, setVets] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

     const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    
  useEffect(() => {
    const fetchTopVets = async () => {
      try {
        const response = await axios.get("https://vetserver.onrender.com/top-vets"); // Adjust URL to match your backend
        setVets(response.data);
      } catch (err) {
        console.error("Error fetching top-rated vets:", err);
      }
    };

    fetchTopVets();
  }, []);

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? vets.length - 2 : prevIndex - 2));
  };

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 2 >= vets.length ? 0 : prevIndex + 2));
  };

  const handleCardClick = (vet) => {
  navigate('/vprofile', {
      state: {
        vet: vet, // Sending vet data to the 'VetProfile' page
      },
    });
  };

  return (
    <div className="top-rated-vets">
      <div className="slider-container">
        <button className="arrow left" onClick={prevSlide}>
          <FaArrowLeft />
        </button>

        <div className="vet-cards">
          {vets.slice(index, index + 2).map((vet) => (
            <div key={vet._id} className="vet-card"
            onClick={() => handleCardClick(vet)}
            style={{ cursor: "pointer" }}>
              {/* <img src={vet.image} alt={vet.name} className="vet-image" /> */}
  <img
     src={
    vet.photo
      ? vet.photo.startsWith('http')
        ? vet.photo // Already a full URL
        : `https://vetserver.onrender.com/${vet.photo.replace(/\\/g, '/').replace(/^\/+/, '')}`
      : '/defaultvet.jpg'
  }
  alt={vet.name}
style={{
      width: '140px',
      height: '140px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginRight: '16px',
      border: '1px solid #ccc', // Border color
    }}
  onError={(e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = '/defaultvet.jpg';
  }}
    
  />


              <div className="vet-info">
                <h3>Dr. {vet.name}</h3>
                <p className="specialty">{vet.specialist}</p>
                <p className="rating">
                  <FaStar className="star-icon" style={{ width:"15px", height:"15px"}}  />   {vet.avgRating?.toFixed(1) ?? "N/A"} ({vet.reviewCount ?? 0} reviews)
                </p>
                <p><FaEnvelope className="icon" style={{ width:"15px", height:"15px", color:"#7193ac"}}  /> {vet.email}</p>
                {/* <p><FaPhone className="icon" /> {vet.phone}</p> */}
                <p><FaMapMarkerAlt className="icon" style={{ width:"15px", height:"15px", color:"#7193ac"}} /> {vet.location}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="arrow right" onClick={nextSlide}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default TopRatedVets;
