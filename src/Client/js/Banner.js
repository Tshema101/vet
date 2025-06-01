import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import '../css/Banner.css'; // Import your CSS file for styling
const CLOUDINARY_NAME = "dk6arlfnf"; // Hardcoded Cloudinary cloud name

const Banner = () => {
    const [bannerData, setBannerData] = useState([]);

    useEffect(() => {
        const fetchCloudinaryImages = async () => {
            try {
                const response = await fetch('https://vetserver.onrender.com/api/images'); // Replace with your actual API
                if (!response.ok) {
                    throw new Error('Failed to fetch images');
                }
                const imageIds = await response.json();
                
                // Construct Cloudinary image URLs directly
                const cloudinaryUrls = imageIds.map(id => 
                    `https://res.cloudinary.com/${CLOUDINARY_NAME}/image/upload/${id}`
                );
                
                setBannerData(cloudinaryUrls);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchCloudinaryImages();
    }, []);

    return (
        <>
        
        <div className='banner-container' style={{ width: '100%', maxWidth: '1500px', marginTop:'85px', height:'650px'}}>
 {/* Decorative SVGs */}
 <div className="decorative-overlay">
 <svg 
                        className="bone-animation" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 576 512" 
                        width="200" 
                        height="30">
                        <path fill="#fff" d="M153.7 144.8c6.9 16.3 20.6 31.2 38.3 31.2l192 0c17.7 0 31.4-14.9 38.3-31.2C434.4 116.1 462.9 96 496 96c44.2 0 80 35.8 80 80c0 30.4-17 56.9-42 70.4c-3.6 1.9-6 5.5-6 9.6s2.4 7.7 6 9.6c25 13.5 42 40 42 70.4c0 44.2-35.8 80-80 80c-33.1 0-61.6-20.1-73.7-48.8C415.4 350.9 401.7 336 384 336l-192 0c-17.7 0-31.4 14.9-38.3 31.2C141.6 395.9 113.1 416 80 416c-44.2 0-80-35.8-80-80c0-30.4 17-56.9 42-70.4c3.6-1.9 6-5.5 6-9.6s-2.4-7.7-6-9.6C17 232.9 0 206.4 0 176c0-44.2 35.8-80 80-80c33.1 0 61.6 20.1 73.7 48.8z"/>
                    </svg>

                    {/* Realistic Paw SVG */}
                    <svg 
                        className="paw-animation" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 512 512" 
                        width="60" 
                        height="50">
                        <path fill="#fff" d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5c-14.3-43.0.3-86.2 32.6-96.8 32.3-10.6 70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3c-18.8-32.4-14.2-70.1 10.2-84.1 24.5-14 54-47.3 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5l0 1.6c0 25.8-20.9 46.7-46.7 46.7-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3l0-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3c24.5 14 29.1 51.7 10.2 84.1-19 32.4-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8 14.3-42.9 52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8c-14.3 42.9-52.1 69.1-84.4 58.5z"/>
                    </svg>


                    {/* <svg className="ball-outline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="40" height="40">
  <circle cx="50" cy="50" r="45" fill="none" stroke="#fff" strokeWidth="4"/>
  <path d="M30 10 C70 40, 30 60, 70 90" fill="none" stroke="#fff" strokeWidth="2"/>
</svg> */}

{/* <svg className="curved-lines" viewBox="0 0 100 20" width="100" height="20">
                        <path d="M10 10 Q20 0 30 10 Q40 20 50 10 Q60 0 70 10 Q80 20 90 10" stroke="#fff" strokeWidth="3" fill="none" />
                        <circle cx="5" cy="10" r="3" fill="#fff" />
                        <circle cx="95" cy="10" r="3" fill="#fff" />
                    </svg> */}
                </div>

            <Carousel
                showArrows={true}
                infiniteLoop={true}
                autoPlay={true}
                interval={4000}
                showThumbs={false}
                showStatus={false}
            >
                {bannerData.map((imageUrl, index) => (
                    <div key={index}>
                        <img 
                            className="banner-image"
                            src={imageUrl} 
                            alt={`banner-${index}`}
                            style={{ 
                                // width: '100%',
                                // maxWidth: '1500px',
                                // height: '630px',
                                // objectFit: 'cover',
                                // filter: 'brightness(0.75)',
                                // opacity: '85%',		
                                // borderRadius: '10px'
                                border:"none"
                            }}
                        />
                    </div>
                ))}
            </Carousel>
        </div>
        
         <style jsx>{`
                .banner-container {
                    width: 100%;
                    max-width: 1500px;
                    margin: 0 auto;
                    position: relative;
                    margin-top: 85px;
                    height: 650px;
                }

                .banner-image {
                    width: 100%;
                    height: 100%;
                    max-height: 650px;
                    object-fit: cover;
                    filter: brightness(0.73);
                    opacity: 0.85;
                }

                .decorative-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                    z-index: 2;
                    display: flex;
                    justify-content: space-between;
                    padding: 20px;
                }

                .bone-animation {
                    width: 200px;
                    height: 30px;
                    animation: floatUpDown 4s ease-in-out infinite;
                }

                .paw-animation {
                    width: 70px;
                    height: 50px;
                    align-self: flex-end;
                    animation: floatLeftRight 5s ease-in-out infinite;
                }

                @keyframes floatUpDown {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }

                @keyframes floatLeftRight {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(10px); }
                }

    

     

            `}</style>
        </>   
        
    );
};

export default Banner;
