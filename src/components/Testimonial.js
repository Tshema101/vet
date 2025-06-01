// import { useState } from "react";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import "./styles/Testimonial.css"; // Create this CSS file for styling

// const testimonials = [
//   {
//     id: 1,
//     text: "VetBhutan made it so easy to find a vet for my pet when I needed help the most!",
//     author: "Tshering Tashi",
//   },
//   {
//     id: 2,
//     text: "A game-changer for farmers! Now I can access expert advice on livestock health without traveling long distances.",
//     author: "Karma Tshering",
//   },
//   {
//     id: 3,
//     text: "VetBhutan made it so easy to find a vet for my pet when I needed help the most!",
//     author: "Sangay Penjor",
//   },
//   ,
//   {
//     id: 4,
//     text: "VetBhutan made it so easy to find a vet for my pet when I needed help the most!",
//     author: "Sonam Dorji",
//   },
//   {
//     id: 5,
//     text: "VetBhutan made it so easy to find a vet for my pet when I needed help the most!",
//     author: "Karma Pemo",
//   },
  
//   {
//     id: 6,
//     text: "VetBhutan made it so easy to find a vet for my pet when I needed help the most!",
//     author: "Sangay Choden",
//   },
// ];

// const Testimonial = () => {
//   const [index, setIndex] = useState(0);

//   const prevSlide = () => {
//     setIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
//   };

//   const nextSlide = () => {
//     setIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
//   };

//   const getPositionClass = (i) => {
//     if (i === index) return "testimonial-card center";
//     if (i === (index + 1) % testimonials.length) return "testimonial-card right";
//     if (i === (index - 1 + testimonials.length) % testimonials.length) return "testimonial-card left";
//     return "testimonial-card hidden";
//   };

//   return (
//     <div className="testimonial-section" style={{ marginTop: "100px" }}>
//       <h2 className="testimonial-title">Testimonial</h2>
//       <p className="testimonial-subtitle">We value your experiences! Here's what people are saying about VetConnect.</p>

//       <div className="testimonial-slider">
//         <button className="testimonial-arrow left" onClick={prevSlide}>
//           <FaArrowLeft />
//         </button>

//         <div className="testimonial-cards-wrapper">
//           {testimonials.map((t, i) => (
//             <div key={t.id} className={getPositionClass(i)}>
//               <p className="testimonial-text">“{t.text}”</p>
//               <hr />
//               <p className="testimonial-author">–{t.author}</p>
//             </div>
//           ))}
//         </div>

//         <button className="testimonial-arrow right" onClick={nextSlide}>
//           <FaArrowRight />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Testimonial;



import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./styles/Testimonial.css"; // Create this CSS file for styling
import axios from "axios";

const Testimonial = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [TestimonialList, setTestimonialList] = useState([]);
  const [index, setIndex] = useState(0);
   const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        const response = await axios.get("http://localhost:8080/getTestimonials");
        setTestimonialList(response.data.testimonials);
      } catch (error) {
        setError("cannot display testimonials ");
      } finally {
        setLoading(false);
      }
    };
  
    fetchExpertise();
  }, []);

  return (
    <div className="testimonial-section" style={{ marginTop: "100px" }}>
      <h2 className="testimonial-title">Testimonial</h2>
      <p className="testimonial-subtitle">We value your experiences! Here's what people are saying about VetConnect.</p>

      <div className="testimonial-slider">
        <button className="testimonial-arrow left" onClick={prevSlide}>
          <FaArrowLeft />
        </button>

        <div className="testimonial-cards-wrapper">
        {TestimonialList
                    .filter((testimony) =>
                        testimony.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((testimony,i) => (
            <div key={testimony._id} className={getPositionClass(i)}>
              <p className="testimonial-text">“{testimony.Review}”</p>
              <hr />
              <p className="testimonial-author">{testimony.name}</p>
            </div>
          ))}
        </div>

        <button className="testimonial-arrow right" onClick={nextSlide}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Testimonial;