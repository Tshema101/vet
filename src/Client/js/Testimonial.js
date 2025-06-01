import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "../css/Testimonial.css"; // Create this CSS file for styling
import axios from "axios";

const Testimonial = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [TestimonialList, setTestimonialList] = useState([]);
  const [index, setIndex] = useState(0);
   const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    
       const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
      
      useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? TestimonialList.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex === TestimonialList.length - 1 ? 0 : prevIndex + 1));
  };

  const getPositionClass = (i) => {
    if (i === index) return "testimonial-card center";
    if (i === (index + 1) % TestimonialList.length) return "testimonial-card right";
    if (i === (index - 1 +TestimonialList.length) % TestimonialList.length) return "testimonial-card left";
    return "testimonial-card hidden";
  };

  useEffect(() => {
    const fetchExpertise = async () => {
  
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/getTestimonials`);
        setTestimonialList(response.data.testimonials);
        

// Set initial index to show last testimonial on left
        // if (TestimonialList.length > 0) {
        //   setIndex(1); // This makes testimonial at index 0 appear on left
        // }

      } catch (error) {
        setError("cannot display testimonials ");
      } finally {
        setLoading(false);
      }
    };
  
    fetchExpertise();
  }, []);

   // Helper function to get the correct testimonial index accounting for array bounds
  const getTestimonialIndex = (i) => {
    return (i + TestimonialList.length) % TestimonialList.length;
  };

  return (
    <div className="testimonial-section" style={{ marginTop: "100px" }}>
      <h2 className="testimonial-title">Testimonial</h2>
      <p className="testimonial-subtitle">We value your experiences! Here's what people are saying about VetConnect.</p>

      <div className="testimonial-slider" style={{width:isMobile?'500px':'100%', marginLeft:isMobile?'-30px':'0'}}>
        <button className="testimonial-arrow left" onClick={prevSlide}>
          <FaArrowLeft />
        </button>

        <div className="testimonial-cards-wrapper">
        {TestimonialList
  .filter((testimony) => 
    !testimony.Disable && testimony.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .map((testimony, i) => (
    <div key={testimony._id} className={getPositionClass(i)}>
      <p className="testimonial-text">“{testimony.Review}”</p>
      <hr style={{marginTop:"30px"}} />
      <p className="testimonial-author">- {testimony.name}</p>
    </div>
))}
        </div>

       {/* <div className="testimonial-cards-wrapper">
          {loading ? (
            <div className="testimonial-card center">
              <p>Loading testimonials...</p>
            </div>
          ) : error ? (
            <div className="testimonial-card center">
              <p>{error}</p>
            </div>
          ) : TestimonialList.length > 0 ? (
            <>
              <div className="testimonial-card left">
                <p className="testimonial-text">“{TestimonialList[getTestimonialIndex(index - 1)].Review}”</p>
                <hr style={{marginTop:"30px"}} />
                <p className="testimonial-author">- {TestimonialList[getTestimonialIndex(index - 1)].name}</p>
              </div>
              
              <div className="testimonial-card center">
                <p className="testimonial-text">“{TestimonialList[index].Review}”</p>
                <hr style={{marginTop:"30px"}} />
                <p className="testimonial-author">- {TestimonialList[index].name}</p>
              </div>
              
              <div className="testimonial-card right">
                <p className="testimonial-text">“{TestimonialList[getTestimonialIndex(index + 1)].Review}”</p>
                <hr style={{marginTop:"30px"}} />
                <p className="testimonial-author">- {TestimonialList[getTestimonialIndex(index + 1)].name}</p>
              </div>
            </>
          ) : (
            <div className="testimonial-card center">
              <p>No testimonials available</p>
            </div>
          )}
        </div>   */}

        <button className="testimonial-arrow right" onClick={nextSlide}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Testimonial;