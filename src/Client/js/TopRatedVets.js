
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaStar,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import "../css/TopRatedVets.css";

const TopRatedVets = () => {
  const [vets, setVets] = useState([]);
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchTopVets = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/top-vets`);
        setVets(response.data);
      } catch (err) {
        console.error("Error fetching top-rated vets:", err);
      }
    };

    fetchTopVets();
  }, []);

  // Filter only approved vets
  const approvedVets = vets.filter((vet) => vet.is_approved === "true");
  console.log(vets)
  console.log(approvedVets)

  const prevSlide = () => {
    setIndex((prevIndex) =>
      isMobile
        ? prevIndex === 0
          ? approvedVets.length - 1
          : prevIndex - 1
        : prevIndex === 0
        ? approvedVets.length - 2
        : prevIndex - 2
    );
  };

  const nextSlide = () => {
    setIndex((prevIndex) =>
      isMobile
        ? prevIndex + 1 >= approvedVets.length
          ? 0
          : prevIndex + 1
        : prevIndex + 2 >= approvedVets.length
        ? 0
        : prevIndex + 2
    );
  };

  // const handleCardClick = (vet) => {
  //   navigate("/guestvetprofile", {
  //     state: {
  //       vet: vet,
  //     },
  //   });
  // };

  const handleCardClick = (vet) => {
  const isLoggedIn = !!localStorage.getItem("authToken"); // or check for 'user', 'auth', etc.
  
  navigate(isLoggedIn ? "/guestvetprofile" : "/guestvetprofile", {
    state: {
      vet: vet,
    },
  });
};


  return (
    <div className="top-rated-vets">
      <div className="slider-container">
        <button className="arrow left" onClick={prevSlide}>
          <FaArrowLeft style={{ marginLeft: isMobile ? "5px" : "0" }} />
        </button>

        <div
          className="vet-cards"
          style={{
            flexDirection: isMobile ? "column" : "row",
            marginLeft: isMobile ? "50px" : "0", width:isMobile?'480px':'100%'
          }}
        >
          {approvedVets
            .slice(index, index + (isMobile ? 1 : 2))
            .map((vet) => (
              <div
                key={vet._id}
                className="vet-card"
                onClick={() => handleCardClick(vet)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={
                    vet.photo
                      ? vet.photo.startsWith("http")
                        ? vet.photo
                        : `${process.env.REACT_APP_BASE_URL}/${vet.photo
                            .replace(/\\/g, "/")
                            .replace(/^\/+/, "")}`
                      : "/defaultvet.jpg"
                  }
                  alt={vet.name}
                  style={{
                    width: "140px",
                    height: "140px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: "16px",
                    border: "1px solid #ccc",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/defaultvet.jpg";
                  }}
                />

                <div className="vet-info">
                  <h3>Dr. {vet.name}</h3>
                  <p className="specialty">{vet.specialist}</p>
                  <p className="rating">
                    <FaStar
                      className="star-icon"
                      style={{ width: "15px", height: "15px" }}
                    />{" "}
                    {vet.avgRating?.toFixed(1) ?? "N/A"} (
                    {vet.reviewCount ?? 0} reviews)
                  </p>
                  <p>
                    <FaEnvelope
                      className="icon"
                      style={{
                        width: "15px",
                        height: "15px",
                        color: "#7193ac",
                      }}
                    />{" "}
                    {vet.email}
                  </p>
                  <p>
                    <FaMapMarkerAlt
                      className="icon"
                      style={{
                        width: "15px",
                        height: "15px",
                        color: "#7193ac",
                      }}
                    />{" "}
                    {vet.location}
                  </p>
                </div>
              </div>
            ))}
        </div>

        <button className="arrow right" onClick={nextSlide}>
          <FaArrowRight style={{ marginRight: isMobile ? "0" : "-20px" }} />
        </button>
      </div>
    </div>
  );
};

export default TopRatedVets;
