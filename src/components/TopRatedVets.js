import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./styles/TopRatedVets.css"; // Make sure this file is updated for styling
import vet1 from "./Images/vet1.png"; // Ensure this path is correct
import vet2 from "./Images/vet2.png"; // Ensure this path is correct
import vet3 from "./Images/vet3.png"; // Ensure this path is correct    
import vet4 from "./Images/vet4.png"; // Ensure this path is correct
import defaultvet from "./Images/defaultvet.jpg";
const vets = [
  {
    id: 1,
    name: "Dr. Pema Tshoki",
    specialty: "Veterinary Surgeon",
    rating: 4.5,
    reviews: 120,
    email: "pemtsho@gmail.com",
    phone: "17890839",
    location: "Babesa, Thimphu",
    image: vet1,
  },
  {
    id: 2,
    name: "Dr. Phuntsho Wangs",
    specialty: "Animal Nutritionist",
    rating: 4.7,
    reviews: 95,
    email: "phunss@gmail.com",
    phone: "17809347",
    location: "Changjiji, Thimphu",
    image: vet2,
  },
  {
    id: 3,
    name: "Dr. Tshering Zam",
    specialty: "Exotic Animal Specialist",
    rating: 4.3,
    reviews: 75,
    email: "Tsheringzam@gmail.com",
    phone: "17903845",
    location: "Kawajangsa, Thimphu",
    image: vet3,
  },
  {
    id: 4,
    name: "Dr. Sangay Dorji",
    specialty: "Emergency Veterinarian",
    rating: 4.8,
    reviews: 140,
    email: "sangayn@gmail.com",
    phone: "17890384",
    location: "Kabesa, Thimphu",
    image: vet4,
  },
];

const TopRatedVets = () => {
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? vets.length - 2 : prevIndex - 2));
  };

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 2 >= vets.length ? 0 : prevIndex + 2));
  };

  return (
    <div className="top-rated-vets">
      <div className="slider-container">
        <button className="arrow left" onClick={prevSlide}>
          <FaArrowLeft />
        </button>

        <div className="vet-cards">
          {vets.slice(index, index + 2).map((vet) => (
            <div key={vet.id} className="vet-card">
              {/* Vet Image */}
              <img src={vet.image} alt={vet.name || {defaultvet}} className="vet-image" />

              {/* Vet Details */}
              <div className="vet-info">
                <h3>{vet.name}</h3>
                <p className="specialty">{vet.specialty}</p>
                <p className="rating">
                  <FaStar className="star-icon" /> {vet.rating} {vet.reviews} reviews
                </p>
                <p>
                  <FaEnvelope className="icon" style={{color:'#5E788A', width:'15px', height:'12px'}} /> {vet.email}
                </p>
                <p>
                  <FaPhone className="icon" style={{color:'#5E788A', width:'15px', height:'12px'}}/> {vet.phone}
                </p>
                <p>
                  <FaMapMarkerAlt className="icon" style={{color:'#5E788A', width:'15px', height:'12px'}}/> {vet.location}
                </p>
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
