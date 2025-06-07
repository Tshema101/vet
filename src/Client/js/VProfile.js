
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import RateVetForm from "./RateVetForm";
import { MdReport } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import "../css/VetRegister.css"

const VetProfile = () => {
  const {email}= useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { vet } = location.state || {}; 

  const [showPopup, setShowPopup] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [totalReviews, setTotalReviews] = useState(0);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportText, setReportText] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
        
        useEffect(() => {
          const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
          };
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
        }, []);

  // Format the date to dd-MM-yyyy for API
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  //   return weekDates;
  // };
    const getWeekDates = (date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  };


  const handleReportSubmit = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/reportVet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': Bearer ${yourTokenHere}, // Optional, if your route requires auth
        },
        body: JSON.stringify({
          vetId: vet._id, // Make sure you have this from parent or props
          reason: reportText,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Vet reported successfully:', data);
        // alert("Report submitted successfully.");
          setShowPopup(true);
        setIsModalOpen(false);
        setReportText('');
      } else {
        console.error('Error reporting vet:', data);
        alert(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error('Network error:', error);
      alert("Network error occurred.");
    }
  };
  

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/vet/${vet._id}/getreviews`);
        setReviews(response.data.reviews || []);
        setAverageRating(response.data.averageRating);
        setTotalReviews(response.data.totalReviews || 0);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    if (vet._id) {
      fetchReviews();
    }
  }, [vet._id]);
  
  useEffect(() => {
    if (selectedSlot) {
      console.log("Selected Date:", selectedSlot.date);
      console.log("Start Time:", selectedSlot.slot.from);
      console.log("End Time:", selectedSlot.slot.to);
    }
  }, [selectedSlot]);


  useEffect(() => {
    if (!vet._id) return;

    const fetchSlots = async () => {
      const headers = { 
      
        'Content-Type': 'application/json'
      };
    
      // Format date as DD-MM-YYYY
      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const year = currentDate.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;
      
      const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    
      try {
        console.log(`Fetching slots for date: ${formattedDate}`);
        
        // Try fetching specific date availability first
        const dateRes = await fetch(`${process.env.REACT_APP_BASE_URL}/availability/date/${vet._id}/${formattedDate}`, { headers });
        const dateData = await dateRes.json();
        console.log('Date response:', dateData);

        if (dateData?.success && dateData?.data?.slots?.length > 0) {
          const formattedSlots = dateData.data.slots.map(slot => ({
            from: slot.startTime,
            to: slot.endTime,
            active: slot.status,
          }));
       
          setTimeSlots(formattedSlots);
          setIsLoading(false)
          return;
        }
        if (dateData?.success && Array.isArray(dateData?.data?.slots)) {
          setTimeSlots([]);      
          setIsLoading(false);   
          return;
        }
        
     
      } catch (err) {
        console.error("Error fetching slots:", err);
        setTimeSlots([]);
      }
    };
  
    fetchSlots();
  }, [currentDate, vet._id]);

  // Get week dates
  const weekDates = getWeekDates(new Date(currentDate));

  const changeWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction * 7);
    setCurrentDate(newDate);
    setSelectedSlot(null);
  };

  const handleBooking = () => {
    navigate('/appointment');
  };

  useEffect(() => {
    if (!vet) {
      navigate('/vets');
    }
  }, [vet, navigate]);
console.log(vet)
  const isToday = (date) =>
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear();

  const handleNavigate = () => {
    navigate('/booking');
  };
  console.log(`selectced ${selectedSlot}`)


  const popupStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999
    },
    box: {
      background: '#fff',
      padding: '30px',
      borderRadius: '5px',
      textAlign: 'center',
      animation: 'fadeIn 0.3s ease',
      width: '500px',
      height: '250px',	
      boxShadow: '0 0 10px rgba(0,0,0,0.25)'
    },
    text: {
      fontSize: '18px',
      margin: '20px 0',
    },
    okButton: {
      padding: '10px 20px',
      border: 'none',
      background: '#113047',
      color: 'white',
      fontSize: '16px',
      width:"100px",
      borderRadius: '8px',
      cursor: 'pointer',
      marginTop: '20px',
    },
    tickAnimation: {
      width: '90px',
      height: '90px',
      margin: '0 auto 10px auto',
    },
    svg: {
      width: '100px',
      height: '100%'
    },
    circle: {
      fill: 'none',
      stroke: '#4CAF50',
      strokeWidth: 5,
      strokeMiterlimit: 10,
      strokeDasharray: 157,
      strokeDashoffset: 157,
      animation: 'stroke 0.6s forwards'
    },
    check: {
      stroke: '#4CAF50',
      strokeWidth: 5,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeDasharray: 48,
      strokeDashoffset: 48,
      animation: 'checkmark 0.6s 0.6s forwards'
    }
  };


  return (
    <div style={{ top: '0', width: '100%' }}>
      <Navbar />

      <div style={{ maxWidth: '1200px', marginLeft: '90px', fontFamily: 'Arial, sans-serif', color: '#333', marginTop: '120px' }} className='vet'>
        <div onClick={handleNavigate} className='times'>
          <FaTimes style={{ fontSize: '23px', color: '#011523', marginBottom: '20px' }} />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px' }}>
          {/* Left Side - Vet Info */}
          <div style={{ flex: '1', minWidth: '580px' }} className='vetinfo'>
            <div style={{ display: 'flex', flexDirection: 'row', padding: '20px' }} className='vetprofile'>
            <img
     src={
    vet.photo
      ? vet.photo.startsWith('http')
        ? vet.photo // Already a full URL
        : `${process.env.REACT_APP_BASE_URL}/${vet.photo.replace(/\\/g, '/').replace(/^\/+/, '')}`
      : '/defaultvet.jpg'
  }
  alt={vet.name}
style={{
      width: isMobile?'150px':'209px',
      height:isMobile?'140px': '213px',
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
              <div style={{ marginLeft: '20px', flex: '1', marginTop: '20px' }}>
                <h2 style={{ margin: '0 0 5px' }}>{vet.name}
                <MdReport 
             style={{ marginLeft: '10px', color: '#ff4d4f', cursor: 'pointer' ,  marginBottom:"-2px"}}
            size={20}
             onClick={() => setIsModalOpen(true)}
 />
                </h2>
                <p style={{ color: '#777', margin: '0 0 8px' }}>{vet.specialist}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px', marginLeft: '-7px' }}>
  <span style={{ fontSize: '14px', color: '#777' }}></span>
  <span style={{ color: '#6DC5EE', fontSize: '16px' }}>
    {Array.from({ length: 5 }, (_, i) => {
      if (averageRating >= i + 1) return '★';          // full star
      if (averageRating >= i + 0.5) return '☆';        // half star (you can customize)
      return '☆';                                      // empty star
    }).join('')}
  </span>
  <span style={{ fontSize: '13px', color: '#777' }}>({averageRating})</span>
  <p style={{ fontSize: '13px', color: '#777', marginRight: '20px' }}>{totalReviews} Reviews</p>
</div>
              </div>
            </div>

            <p className='vetdescription' style={{ fontSize: '14px', marginBottom: '15px' }}>{vet.description}</p>
            <p style={{ fontSize: '14px', color: '#777', marginBottom: '13px' }}>{vet.location}</p>
        <p style={{ fontSize: '14px', color: '#777', marginBottom: '10px', display:"flex", gap:"10px", marginTop:"10px" }}><p style={{color:"#212121", fontWeight:"bold", fontSize:"13px"}}> Charge per hour:</p> ${vet.chargePerHour}</p>

            <p
              style={{ fontSize: '14px', color: 'grey', cursor: 'pointer', textDecoration: 'none', marginBottom: '30px' }}
              onClick={() => setShowCertificate(true)}
            >
              Certification details: view ❯
            </p>

            {/* Certificate Modal */}
            {showCertificate && (
              <div
                onClick={() => setShowCertificate(false)}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1000,
                }}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '5px',
                    maxWidth: '800px',
                    width: '100%',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                  }}
                >
                  <h3 style={{ marginBottom: '20px' }}>Certificates</h3>

                  {vet.certifications.map((cert, index) => {
                    const imageUrl = cert?cert:null;
                    

                    return (
                      <div
                        key={index}
                        style={{
                          position: 'relative',
                          background: '#fff',
                          padding: '20px',
                          borderRadius: '8px',
                          marginBottom: '20px',
                        }}
                      >
                        {/* <FaTimes
                          onClick={() => setShowCertificate(false)}
                          style={{
                            position: 'absolute',
                            top: '-70px',
                            right: '10px',
                            cursor: 'pointer',
                          }}
                        /> */}
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt="Certificate"
                            style={{ maxWidth: '100%', height: 'auto' }}
                          />
                        ) : (
                          <p>No image available</p>
                        )}
                      </div>
                    );
                  })}

                  <button
                    onClick={() => setShowCertificate(false)}
                    style={{
                      marginTop: '10px',
                      padding: '8px 16px',
                      backgroundColor: '#113047',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            <div style={{ borderBottom: '1px solid grey', marginBottom: '20px' }}></div>
            <div>
      {/* Rate and Reviews */}
      <h3 style={{ marginBottom: '15px', fontSize: '16px' }}>Rate and Reviews</h3>

   

      {/* Review cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        {reviews.map((review, index) => (
          <div
            key={index}
            style={{
              background: '#fff',
              border: '1px solid #d9d9d9',
              borderRadius: '3px',
              padding: '16px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              fontSize: '13px',
              lineHeight: '1.5',
            }}
          >
           
           <p style={{ color: '#6DC5EE', marginBottom: '8px', fontSize: '16px' }}>
  {Array.from({ length: 5 }, (_, i) =>
    review.rating >= i + 1 ? '★' : '☆'
  ).join('')}
</p>

            <p style={{ fontSize: 'bold', color: '#333' }}>{review.comment}</p>
            <hr style={{marginTop:"10px", marginBottom:"10px"}} />
            <p style={{ fontSize: '11px', marginTop: '8px', fontStyle: 'italic', color: '#777' }}>
              - {review.clientId?.name || 'Anonymous'}
            </p>
          </div>
        ))}
      </div>

      <div style={{ fontSize: '12px', color: 'grey', textAlign: 'center', marginTop: '40px' , marginBottom: '10px' }}>
        view more
      </div>
      <div style={{ borderBottom: '1px solid grey', marginBottom: '50px' }}></div>
    </div>
          
          </div>


          {/* Right Side - Booking */}
          <div style={{ flex: '2', minWidth: '570px', border: '2px solid rgb(238, 238, 238)', borderRadius: '8px', padding: '20px', height: '80%' }} className='slot'>
            <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>Available Time Slot</div>

            {/* Week Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <button
                onClick={() => changeWeek(-1)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: '20px',
                }}
              >
                ❮
              </button>
              <button
                onClick={() => changeWeek(1)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: '20px',
                }}
              >
                ❯
              </button>
            </div>



            {/* Date Selection */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginBottom: '15px' }}>
              {weekDates?.map((date) => {
                const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
                const isSelected = currentDate.toDateString() === date.toDateString();
                const isTodayDate = isToday(date);

                return (
                  <div
                    key={date.toDateString()}
                    onClick={() => !isPast && setCurrentDate(date)}
                    style={{
                      flex: '1',
                      textAlign: 'center',
                      padding: '8px',
                      borderRadius: '8px',
                      border: isSelected ? '2px solid rgb(75, 106, 129)' : '1px solid #ddd',
                      backgroundColor: isSelected ? '#D8F3FF' : '#fff',
                      color: isPast ? '#ccc' : '#333',
                      cursor: isPast ? 'not-allowed' : 'pointer',
                      opacity: isPast ? 0.6 : 1,
                      fontWeight: isTodayDate ? 'bold' : 'normal',
                      transition: 'all 0.3s ease',
                      marginBottom: '10px',
                    }}
                  >
                    <div style={{ fontSize: '12px', marginBottom: '4px' }}>
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                      {date.getDate()}
                    </div>
                  </div>
                );
              })}
            </div>

  {/* Selected Date */}
 <div style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', marginTop: '20px', fontSize:"15px" }}>
{currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
 </div>
                    <hr style={{marginBottom:"20px", marginTop:"-9px", border:"1px solid rgb(17, 31, 42)"}}></hr>

      

 {isLoading ? (
  <div style={{ textAlign: 'center', padding: '20px' }}>Loading time slots...</div>
) : (
  <div style={{ marginBottom: '40px' }}>
  {timeSlots.filter(slot => slot.active === "available").length > 0 ? (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
    {timeSlots
      .filter(slot => slot.active === "available")
      .map((slot, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '8px',
            border:
              selectedSlot?.slot?.from === slot.from &&
              selectedSlot?.slot?.to === slot.to
                ? '2px solid #D8F3FF'
                : '1px solid #ddd',
            backgroundColor:
              selectedSlot?.slot?.from === slot.from &&
              selectedSlot?.slot?.to === slot.to
                ? '#D8F3FF'
                : '#fff',
            padding: '12px 20px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onClick={() =>
            setSelectedSlot({ date: currentDate.toDateString(), slot })
          }
          onMouseEnter={e =>
            (e.currentTarget.style.backgroundColor = '#f0f8ff')
          }
          onMouseLeave={e =>
            (e.currentTarget.style.backgroundColor =
              selectedSlot?.slot?.from === slot.from &&
              selectedSlot?.slot?.to === slot.to
                ? '#D8F3FF'
                : '#fff')
          }
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <span style={{ fontWeight: '600' }}>Today at</span>
            <span style={{ padding: '4px 8px', borderRadius: '4px' }}>{slot.from}</span>
            <span style={{ margin: '0 5px' }}>to</span>
            <span style={{ padding: '4px 8px', borderRadius: '4px' }}>{slot.to}</span>
          </div>
          {/* <div style={{ fontWeight: '600', color: '#333' }}>Nu. 500</div> */}
        </div>
      ))}
  </div>
) : (
  <div style={{ textAlign: 'center', color: '#555', marginTop: '40px' }}>
    <div style={{ fontSize: '40px', marginBottom: '10px' }}>📄</div>
    <strong>No appointment available on this date.</strong>
    <div>Please choose a different date to see available appointment times.</div>
  </div>
)}

  </div>
)}



{/* Continue Booking Button */}
   <button
     // onClick={handleBooking}
     onClick={() => navigate('/appointment', { state: {
      ...selectedSlot,
      vetId: vet._id
    } })}
     disabled={!selectedSlot}
     style={{
       marginTop: '10px',
       width: '100%',
        height: '50px',
       padding: '12px',
       backgroundColor: selectedSlot ? '#6DC5EE' : '#d1d1d1',
       color: '#fff',
       border: 'none',
       borderRadius: '8px',
       cursor: selectedSlot ? 'pointer' : 'not-allowed',
       fontSize: '16px',
       fontWeight: 'bold',
       transition: 'all 0.3s ease',
     }}
   >
     Continue Booking
  </button>

  
          </div>
        </div>

<RateVetForm vetId={vet._id}  className="review"/>
{/* 
  {/* report Modal  */}
 {isModalOpen && (
         <div style={{
           position: 'fixed',
           top: 0,
           left: 0,
           width: '100vw',
           height: '100vh',
           backgroundColor: 'rgba(0,0,0,0.2)',
           display: 'flex',
           justifyContent: 'center',
           alignItems: 'center',
           zIndex: 1000,
         }}>
           <div style={{
             background: 'white',
            borderRadius: '7px',
             width: '550px',
             height: '250px',
             padding: '20px',
             position: 'relative',

           }}>
             {/* Close Button */}
             <button
               onClick={() => setIsModalOpen(false)}
               style={{
                 position: 'absolute',
                 top: '10px',
                 right: '20px',
                 border: 'none',
                 background: 'none',
                 fontSize: '29px',
                cursor: 'pointer',
               }}
             >
               ×
             </button>
            <h3 style={{ marginBottom: '15px' }}>Report this vet?</h3>
             <textarea
               placeholder="Type your concern here..."
               value={reportText}
               onChange={(e) => setReportText(e.target.value)}
               style={{
                 width: '100%',
                 height: '100px',
                borderRadius: '5px',
                 border: '1px solid #ccc',
                 padding: '10px',
                 resize: 'none',
                 marginBottom: '20px',
               }}
             />
             <button
            onClick={() => {
            
              handleReportSubmit();
              setIsModalOpen(false);
            }}
               style={{
                 backgroundColor: '#0b2239',
                 color: 'white',
                 border: 'none',
                 borderRadius: '8px',
                 padding: '10px 20px',
                 cursor: 'pointer',
                 width: '20%',
                 boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                 marginLeft:"200px",
               }}
             >
              Report
             </button>
           </div>
         </div>
      )}

      </div>

      {/* confirmation popup */}
      {showPopup && (
    <div style={popupStyles.overlay}>
    <div style={popupStyles.box}>
      <div style={popupStyles.tickAnimation}>
        <svg viewBox="0 0 52 52" style={popupStyles.svg}>
          <circle style={popupStyles.circle} cx="25" cy="26" r="24" />
          <path style={popupStyles.check} fill="none" d="M14,27 L22,35 L38,19" />
        </svg>
      </div>
            <p className="popup-text">Report submitted successfully!</p>
            <button onClick={() => setShowPopup(false)} style={{  
              padding: '10px 20px',
              border: 'none',
              background: '#113047',
              color: 'white',
              fontSize: '16px',
              width:"100px",
              borderRadius: '20px',
              cursor: 'pointer',
              marginTop: '20px',}}>OK</button>
          </div>
        </div>
      )}

      <Footer />
      <style jsx>{`
          .vet {
            margin-top: 120px;
          }

          @media (max-width: 1200px) {
            .vet {
              margin-left: 20px;
              margin-right: 20px;
            }
          }

          @media (max-width: 992px) {
            .vet {
              flex-direction: column;
            }
            .vetinfo, .slot {
              min-width: 100% !important;
            }
          }

          @media (max-width: 768px) {
            .vet {
              margin-top: 100px;
            }
            .vetprofile {
              flex-direction: column;
              align-items: left;
              text-align: left;
              font-size:12px
            }
            .week-navigation {
              flex-wrap: wrap;
            }
            .vetinfo{
      margin-left:-70px
              }
      .slot{
              width:500px;
      margin-left:-70px

              }
      .times{
      margin-left:-70px;
      font-size:10px;
      }

              .review{
              width:800px;
      margin-left:-70px

              }
          }

          @media (max-width: 576px) {
            .vet {
              margin-top: 80px;
              padding: 0 10px;
            }
            .date-selection {
              flex-wrap: wrap;
            }
            .date-selection div {
              min-width: 45%;
              margin-bottom: 10px;
            }
            .time-slots {
              padding: 10px;
            }
                 .vetprofile {
              flex-direction: column;
              align-items: left;
              text-align: left;
              font-size:12px
            }
            .week-navigation {
              flex-wrap: wrap;
            }

                  .review{
       margin:0 auto;

              }
          }

          @media (max-width: 480px) {
            .vet {
              margin-top: 70px;


            }
              .vetinfo{
      margin-left:-70px
              }
            .vetprofile img {
              width: 50px;
              height: 50px;
            }
   .vetprofile {
              flex-direction: column;
              align-items: left;
              text-align: left;
              font-size:12px
            }
            .week-navigation {
              flex-wrap: wrap;
            }

            .date-selection div {
              min-width: 100%;
              
            }
              .slot{
              width:500px;
      margin-left:-70px

              }

    
          }

          @media (max-width: 360px) {
            .vet {
              margin-top: 60px;
            }
                  .slot{
              width:500px;
              }
                       .vetinfo{
      margin-left:-70px
              }
                 .vetprofile {
              flex-direction: column;
              align-items: left;
              text-align: left;
              font-size:12px
            }
            .week-navigation {
              flex-wrap: wrap;
            }
          }
        `}</style>
    </div>
  );
};

export default VetProfile;