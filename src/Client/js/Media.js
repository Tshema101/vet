import React, { useState, useEffect } from "react";
import "../css/Media.css";
import Navbar from "./Navbar";
import Footer from "./Footer"; // Import your Footer component
import dis1 from "../Images/dis1.png"; // Replace with your image path
import dis2 from "../Images/dis2.png"; // Replace with your image path
import dis3 from "../Images/dis3.png"; // Replace with your image path
import Banner from "./Banner"; // Import your Banner component



const Media = () => {
  const [contentData, setContentData] = useState([]);
const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
      
      useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
  
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/content`);
        const data = await response.json();
        setContentData(data);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, []);

  // Filter the outbreak data directly here
  const outbreakData = contentData.filter(
    (item) => item.Description && item.Disease_Name && item.image
  );

  // Styles
  const styles = {

    Section: {
      textAlign: 'center',
      padding: '2rem',
      maxWidth: '1000px',
    //   marginLeft: '588x',
    //   marginRight: '600px',
      position: 'relative',
      zIndex: 1,
    },
    news: {
         fontSize:isMobile?'2rem': '3.5rem',
        color: 'white',
        fontWeight: 'bold',
        marginBottom: '2rem',
        marginTop: '-347px',

      },
}
  return (
    <div style={{top: '0', position: 'absolute', width: '100%'}}>
         <Navbar />
    <div className="media-container">
          {/* Banner */}
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '650px', zIndex: 0}}>
      <Banner  />
      </div>

          {/* Welcome Section */}
          <div style={{ ...styles.Section, position: 'relative', zIndex: 1, marginLeft: '170px' }}>        
        {/* <h2 style={styles.news} className="news">News & Articles</h2> */}
        <h2 style={{...styles.news, marginLeft:isMobile?'-185px':'0px', marginTop:isMobile?'-11rem':'-350px'}} className="news">News & Articles</h2>

      </div>



{/* Outbreak Section */}
<section className="media-section">
          {outbreakData.map((item, index) => (
            <div className="media-content" key={index}>
              <div className="media-text">
                <h2 style={{fontSize:isMobile?'17px':'22px', fontWeight:"bold"}}>{item.Disease_Name}</h2>
                <p>{item.Description}</p>
              </div>
              <div className="media-image">
                {/* <img src={item.image} alt={item.Disease_Name} /> */}
                  {item.image?.filter(cert => typeof cert === 'string').map((cert, index) => (
                    <div key={`existing-${index}`} className="certification-itemm" style={{width: '90%', height: '90%', margin:" 0 auto", marginTop: '20px', marginBottom:"50px"}}>

                      {cert.endsWith('.pdf') ? (
                        <div className="pdf-thumbnail">PDF</div>
                      ) : (
                        <img
                          src={cert}
                          alt={`Certification ${index + 1}`}
                          className="certification-thumbnail"
                        />
                      )}
                  
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </section>


      {/* FMD Section */}
      {/* <section className="media-section">
        <div className="media-content reverse">
          <div className="media-image">
            <img src={dis2} alt="Foot and Mouth Disease" />
          </div>
          <div className="media-text">
            <h2>Foot and Mouth Disease (FMD)</h2>
            <p>
              A highly contagious viral disease affecting cattle, sheep, pigs, and goats,
              leading to economic losses due to trade restrictions.
            </p>
            <h4>Symptoms</h4>
            <ul>
              <li>Fever</li>
              <li>Blisters in the mouth, tongue, hooves, and teats</li>
              <li>Excessive salivation</li>
              <li>Lameness and reluctance to move</li>
              <li>Decreased milk production</li>
            </ul>
            <h4>Transmission</h4>
            <ul>
              <li>Direct contact with infected animals</li>
              <li>Contaminated feed, water, or equipment</li>
              <li>Airborne transmission over long distances</li>
            </ul>
            <h4>Prevention</h4>
            <ul>
              <li>Strict biosecurity measures</li>
              <li>Vaccination in high-risk areas</li>
              <li>Quarantine for infected animals</li>
            </ul>
          </div>
        </div>
      </section> */}

      {/* Bird Flu Section */}
      {/* <section className="media-section">
        <div className="media-content">
          <div className="media-text">
            <h2>Avian Influenza (Bird Flu)</h2>
            <p>
              A viral disease that affects poultry (chickens, ducks, turkeys) and can sometimes spread to humans.
            </p>
            <h4>Symptoms</h4>
            <ul>
              <li>Sudden death without warning signs</li>
              <li>Swollen head, comb, and wattles</li>
              <li>Respiratory distress (coughing, sneezing)</li>
              <li>Drop in egg production</li>
              <li>Diarrhea</li>
            </ul>
            <h4>Transmission</h4>
            <ul>
              <li>Contact with infected wild birds or contaminated water sources</li>
              <li>Aerosol droplets from infected birds</li>
              <li>Contaminated feed or farm workers</li>
            </ul>
            <h4>Prevention</h4>
            <ul>
              <li>Culling infected flocks</li>
              <li>Limiting exposure to wild birds</li>
              <li>Disinfecting poultry farms regularly</li>
            </ul>
          </div>
          <div className="media-image">
            <img src={dis3} alt="Avian Influenza" />
          </div>
        </div>
      </section> */}
    </div>
    <Footer />
    </div>
  );
};

export default Media;
