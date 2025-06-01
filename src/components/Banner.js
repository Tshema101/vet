// import React, { useEffect, useState } from 'react';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';

// const Banner = () => {
//     const [bannerData, setBannerData] = useState([]);

//     useEffect(() => {
//         const fetchCloudinaryImages = async () => {
//             try {
//                 const response = await fetch('http://localhost:8080/api/images'); // Replace with actual API
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch images');
//                 }
//                 const imageIds = await response.json();
                
//                 // Construct Cloudinary image URLs
//                 const cloudinaryUrls = imageIds.map(id => 
//                     `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload/${id}`
//                 );
                
//                 setBannerData(cloudinaryUrls);
//             } catch (error) {
//                 console.error('Error fetching images:', error);
//             }
//         };

//         fetchCloudinaryImages();
//     }, []);

//     return (
//         <div style={{ width: '100%', maxWidth: '1200px', margin: 'auto' }}>
//             <Carousel
//                 showArrows={true}
//                 infiniteLoop={true}
//                 autoPlay={true}
//                 interval={4000}
//                 showThumbs={false}
//                 showStatus={false}
//             >
//                 {bannerData.map((imageUrl, index) => (
//                     <div key={index}>
//                         <img 
//                             src={imageUrl} 
//                             alt={`banner-${index}`}
//                             style={{ 
//                                 width: '100%',
//                                 height: '400px',
//                                 objectFit: 'cover',
//                                 borderRadius: '10px'
//                             }}
//                         />
//                     </div>
//                 ))}
//             </Carousel>
//         </div>
//     );
// };

// export default Banner;


import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const CLOUDINARY_NAME = "dk6arlfnf"; // Hardcoded Cloudinary cloud name
// const CLOUDINARY_API_KEY= "757294143265889";
// const CLOUDINARY_API_SECRET= "qcOHUf_EWo38NhlrAXL5QpglFyI";
// const CLOUDINARY_URL="cloudinary://757294143265889:qcOHUf_EWo38NhlrAXL5QpglFyI@dk6arlfnf";

const Banner = () => {
    const [bannerData, setBannerData] = useState([]);

    useEffect(() => {
        const fetchCloudinaryImages = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/images'); // Replace with your actual API
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
        <div style={{ width: '100%', maxWidth: '1500px', marginTop:'85px', height:'650px'}}>
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
                            src={imageUrl} 
                            alt={`banner-${index}`}
                            style={{ 
                                width: '100%',
                                maxWidth: '1500px',
                                height: '600px',
                                objectFit: 'cover',
                                // borderRadius: '10px'
                            }}
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;
