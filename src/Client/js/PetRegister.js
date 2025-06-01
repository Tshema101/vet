import React, { useState , useEffect } from 'react';
import { FaUserCircle, FaPlus, FaCalendarCheck } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';
import {useLocation, useNavigate } from 'react-router-dom'; 
import "../css/VetRegister.css"
const PetRegister = () => {

  const navigate = useNavigate(); // for navigation
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
  
      useEffect(() => {
        const name = localStorage.getItem('userName');
        const email = localStorage.getItem('userEmail');
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('authToken');
    
        if (name && email) {
          setUserName(name);
          setUserEmail(email);
        }
        // if (userId && token) {
        //   fetch(`https://vetserver.onrender.com/pets?userId=${userId}`, {
        //     headers: {
        //       'Authorization': `Bearer ${token}`,
        //     },
        //   })
        //     .then(response => response.json())
        //     .then(data => setPets(data))
        //     .catch(error => console.error('Error fetching pets:', error));
        // }
      }, []);

 const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
     
    
  const location = useLocation();
  const token = localStorage.getItem('authToken'); 
  console.log(token)
  const [form, setForm] = useState({
    petname: '',
    species: '',
    customSpecies: '',
    breed: '',
    weight: '',
    age: '',
    gender: ''
  });

  const [showPopup, setShowPopup] = useState(false); // State for showing the popup


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // If changing species, reset breed as well
  if (name === 'species') {
    setForm({
      ...form,
      species: value,
      customSpecies: '',
      breed: '', // reset breed
    });
  } else if (name === 'breed') {
    setForm({
      ...form,
      breed: value,
      customBreed: '',
    });
  } else {
    setForm({ ...form, [name]: value });
  }
  };

  const handleGenderChange = (e) => {
    setForm({ ...form, gender: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // ✅ Redirect to Userprofile and pass pet data via state
  //   navigate('/userprofile', { state: form });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
 const finalForm = {
    ...form,
    species: form.species === 'Other' ? form.customSpecies : form.species,
    breed: form.breed === 'Other' ? form.customBreed : form.breed,
  };

    const token = localStorage.getItem('authToken'); // Changed to "authToken"
  
    try {
      const response = await fetch('https://vetserver.onrender.com/petregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
  
      if (!response.ok) {
        throw new Error('Failed to register pet');
      }
  
      const result = await response.json();
      console.log('Pet registered successfully:', result);
  
      setShowPopup(true); // Show popup

    setTimeout(() => {
      navigate('/userprofile', {
        state: {
          pets: [...(location.state?.pets || []), form],
        },
      });
    },10000); // Delay navigation by 2 seconds

  
    } catch (error) {
      console.error('Error submitting pet registration:', error);
     
      
    }
  };
  

  const containerstyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
    marginTop: '100px',
  };

  const profileIconStyle = {
    fontSize: '80px',
    height: '100px',
    width: '100px',
    color: 'grey',
    marginBottom: '10px',
  };

  const nameStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const emailStyle = {
    fontSize: '12px',
    color: '#333',
    fontStyle: 'italic',
    marginBottom: '20px',
  };

  const dividerStyle = {
    width: '90%',
    borderTop: '1px solid #ccc',
    marginBottom: '30px',
  };

  const sectionTitleStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: '35px',
    marginBottom: '10px',
  };

  const cstyle = {
    fontFamily: 'Arial, sans-serif',
    padding: '30px',
    width: '90%',
    margin: '0 auto',
    marginTop: '-60px',	
  };

  const titleStyle = {
    fontSize: isMobile?'18px':'26px',
    fontWeight: 'bold',
    color: '#2c3e50',
  };

  const subtitleStyle = {
    fontSize:isMobile?'13px': '14px',
    color: '#333',
    marginTop: '8px',
    marginBottom: '20px',
  };

  const formBoxStyle = {
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '8px',
    height:isMobile?" auto": "460px",

  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: 'bold',
    fontSize: '13px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '14px',
    height: '50px',

  };

  const rowStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    gap: '50px',
  };

  const columnStyle = {
    flex: '1',
  };

  const genderStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '40px',
    marginBottom: '20px',
    fontSize: '14px',
  };

  const noteStyle = {
    fontSize: '13px',
    color: '#666',
    fontStyle: 'italic',
    marginTop: '10px',
  };

  const buttonstyle = {
    backgroundColor: '#60b5e5',
    color: 'white',
    padding: '10px 30px',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '13px',
    marginTop: '20px',
    cursor: 'pointer',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '50px',
  };


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

  const breedOptions = {
    Dog: ['Labrador', 'Bulldog', 'German Shepherd', 'Pomeranian', 'Golden Retriever',"other"],
    Cat: ['Persian', 'Siamese', 'Maine Coon', 'Bengal', 'Sphynx',"other"],
    Bird: ['Parrot', 'Canary', 'Finch', 'Cockatiel', 'Lovebird',"other"],
    Cow: ['Jersey', 'Holstein', 'Brown Swiss', 'Ayrshire',"other"],
    Horse: ['Arabian', 'Thoroughbred', 'Quarter Horse', 'Clydesdale',"other"],
    Reptile: ['Iguana', 'Gecko', 'Snake', 'Turtle',"other"],
    Other: [" "],
  };
const currentBreedOptions =
  breedOptions.hasOwnProperty(form.species) ? breedOptions[form.species] : breedOptions.Other;

  useEffect(() => {
    setForm((prevForm) => ({ ...prevForm, breed: '' }));
  }, [form.species]);

  return (
    <div style={{top: '0', width: '100%', }}>
             <Navbar />



 <div style={containerstyle}>
      <FaUserCircle style={profileIconStyle} />
      <div style={nameStyle}>{userName}</div>
      <div style={emailStyle}>Email: <span style={{ fontStyle: 'italic' }}>{userEmail}</span></div>


      <div style={dividerStyle}></div>
    </div>


    <div style={cstyle}>
      <div style={titleStyle}>Tell us about your pet</div>
      <div style={subtitleStyle}>
        That's why we're all here, after all. Whether big or small, furry or slimy, we want to meet your pet!
      </div>
      <form style={formBoxStyle} onSubmit={handleSubmit}>
        <div style={rowStyle}>
          <div style={columnStyle}>
            <label style={labelStyle}>Pet Name</label>
            <input
              style={inputStyle}
              type="text"
              name="petname"
              placeholder="Enter Pet Name"
              value={form.petname}
              onChange={handleChange}
              required
            />
          </div>
          <div style={columnStyle}>
            <label style={labelStyle}>Weight</label>
            <input
              style={inputStyle}
              type="number"
              name="weight"
              placeholder="Weight in kg"
              value={form.weight}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div style={rowStyle}>
          <div style={columnStyle}>
            <label style={labelStyle}>Species</label>
     
 <input
      style={inputStyle}
      list="speciesOptions"
      name="species"
      placeholder="Select or type species"
      value={form.species}
      onChange={handleChange}
      required
    />
    <datalist id="speciesOptions">
      <option value="Dog" />
      <option value="Cat" />
      <option value="Cow" />
      <option value="Horse" />
      <option value="Bird" />
      <option value="Reptile" />
      <option value="Rabbit" />
      {/* <option value="Hamster" />
      <option value="Guinea Pig" />
      <option value="Ferret" /> */}
    </datalist>


          </div>
          <div style={columnStyle}>
            <label style={labelStyle}>Age</label>
            <input
              style={inputStyle}
              type="number"
              name="age"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div style={rowStyle}>
        <div style={columnStyle}>
  <label style={labelStyle}>Breed</label>
  <input
 style={inputStyle}
      list="breedOptions"
      name="breed"
      placeholder="Select breed"
      value={form.breed}
      onChange={handleChange}
      disabled={currentBreedOptions.length === 0}
    />
    <datalist id="breedOptions">
      {currentBreedOptions.map((breed, index) => (
        <option key={index} value={breed} />
      ))}
    </datalist>

  
</div>

          <div style={columnStyle}>
            <label style={labelStyle}>Gender</label>
            <div style={genderStyle}>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={form.gender === 'Male'}
                  onChange={handleGenderChange}
                />{' '}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={form.gender === 'Female'}
                  onChange={handleGenderChange}
                />{' '}
                Female
              </label>
            </div>
          </div>
        </div>

        <div style={noteStyle}>
          **Double-check your pet's details before finalizing the registration.
          Click 'submit' to complete the process.**
        </div>

        <button onSubmit={() => setShowPopup(true)} type="submit" style={buttonstyle}>
          SUBMIT
        </button>
      </form>
    </div>

    {showPopup && (
        <div style={popupStyles.overlay}>
          <div style={popupStyles.box}>
            <div style={popupStyles.tickAnimation}>
              <svg viewBox="0 0 52 52" style={popupStyles.svg}>
                <circle style={popupStyles.circle} cx="25" cy="26" r="24" />
                <path style={popupStyles.check} fill="none" d="M14,27 L22,35 L38,19" />
              </svg>
            </div>
            <p >Pet registered successfully!</p>
            <button onClick={() => navigate('/userprofile')} style={{ padding: '10px 20px', backgroundColor: '#113047', color: 'white', fontSize: '16px', width: '100px', borderRadius: '20px', cursor: 'pointer', marginTop: '20px' }}>
              OK
            </button>
          </div>
        </div>
      )}

    <Footer />
<style jsx>{`
  /* Base Styles */
  .containerstyle {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: visible;
  }

  /* Media Queries */

  @media (max-width: 1200px) {
    .rowStyle {
      flex-direction: column;
      gap: 15px;
    }
    .columnStyle {
      width: 100%;
    }
    .formBoxStyle {
      height: auto;
      padding-bottom: 30px;
      display: flex;
      flex-direction: column;
    }
  }

  @media (max-width: 992px) {
    .containerstyle {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      overflow: visible;
    }

    .rowStyle {
      flex-direction: column;
      gap: 9px;
      margin-bottom: 10px;
    }

    .columnStyle {
      width: 100%;
    }

    .cstyle {
      width: 95%;
      margin-top: -30px;
      height: auto;
    }

    .formBoxStyle {
      height: auto;
      padding-bottom: 30px;
      display: flex;
      flex-direction: column;
    }
  }

  @media (max-width: 768px) {
    .containerstyle {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      overflow: visible;
    }

    .titleStyle {
      font-size: 22px;
    }

    .subtitleStyle {
      font-size: 13px;
    }

    .profileIconStyle {
      font-size: 60px;
      height: 80px;
      width: 80px;
    }

    .formBoxStyle {
      height: auto;
      padding-bottom: 30px;
      display: flex;
      flex-direction: column;
    }

    .genderStyle {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      display: flex;
      margin-bottom: 20px;
    }

    .inputStyle {
      height: 45px;
    }

    .buttonstyle {
      display: block;
      width: 100%;
      margin-top: 30px;
    }

    .popupStyles.box {
      width: 90%;
      height: auto;
      padding: 20px;
    }
  }

  @media (max-width: 576px) {
    .containerstyle {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      overflow: visible;
      margin-top: 70px;
    }

    .inputStyle {
      height: 40px;
    }

    .formBoxStyle {
      height: auto;
      padding-bottom: 30px;
      display: flex;
      flex-direction: column;
    }

    .genderStyle {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      display: flex;
      margin-bottom: 20px;
    }

    .buttonstyle {
      width: 100%;
      margin-top: 20px;
      display: block;
    }

    .cstyle {
      width: 100%;
      padding: 15px;
    }

    .titleStyle {
      font-size: 20px;
    }
  }

  @media (max-width: 480px) {
    .containerstyle {
      margin-top: 60px;
    }

    .titleStyle {
      font-size: 18px;
    }

    .sectionTitleStyle {
      font-size: 12px;
      margin-left: 15px;
    }

    .formBoxStyle {
      height: auto;
      padding-bottom: 30px;
      display: flex;
      flex-direction: column;
    }

    .genderStyle {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      display: flex;
      margin-bottom: 20px;
    }

    .inputStyle {
      font-size: 13px;
      padding: 8px;
    }

    .labelStyle {
      font-size: 12px;
    }

    .noteStyle {
      font-size: 12px;
    }

    .buttonstyle {
      width: 100%;
      display: block;
      margin-top: 20px;
    }
  }

  @media (max-width: 360px) {
    .containerstyle {
      margin-top: 50px;
    }

    .profileIconStyle {
      font-size: 50px;
      height: 70px;
      width: 70px;
    }

    .inputStyle {
      padding: 6px;
      font-size: 12px;
    }

    .buttonstyle {
      padding: 8px 20px;
      font-size: 12px;
      width: 100%;
      display: block;
    }

    .cstyle {
      padding: 10px;
    }
  }
`}</style>
    </div>
  );
};

export default PetRegister;
