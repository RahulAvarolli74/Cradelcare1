import React, { useRef } from 'react';
import '../styles/Gallery.css';

const Gallery = () => {
  const scrollRef = useRef(null);

  const scroll = (offset) => {
    if(scrollRef.current) {
      scrollRef.current.scrollLeft += offset;
    }
  };

  return (
    <div className="gallery-page text-center">
      <h1>Gallery</h1>
      
      <div className="gallery-wrapper">
        <button className="scroll-btn left" onClick={() => scroll(-300)}>
          <i className="fas fa-chevron-left"></i>
        </button>
        
        <div className="gallery-container" ref={scrollRef}>
          {/* Add your images here */}
          <img src="/images/gallery1.jpg" alt="Prototype" />
          <img src="/images/gallery2.jpg" alt="Sensor" />
          <img src="/images/gallery3.jpg" alt="Setup" />
          <img src="/images/gallery4.jpg" alt="Prototype" />
        </div>

        <button className="scroll-btn right" onClick={() => scroll(300)}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      <div className="video-section">
        <h2>Video of our product</h2>
        <video controls className="product-video">
          <source src="/images/product-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Gallery;