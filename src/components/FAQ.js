import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./styles/FAQ.css";



const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [contentData, setContentData] = useState([]);
  const toggleFAQ = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("http://localhost:8080/allContent");
        const data = await response.json();
        setContentData(data);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, []);

  const faqData = contentData.filter(item => item.Question && item.Answer);
  return (
    <div className="faq-section">
      <p className="faq-tag">FAQ</p>
      <h2 className="faq-title">Frequently Asked Questions</h2>

      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{faq.Question}</span>
              {activeIndex === index ? (
                <FaChevronUp className="faq-icon rotated" />
              ) : (
                <FaChevronDown className="faq-icon" />
              )}
            </div>

            <div className={`faq-answer-wrapper ${activeIndex === index ? "open" : ""}`}>
              <div className="faq-answer">
                <ul>
                  <li>{faq.Answer}</li>
                </ul>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;