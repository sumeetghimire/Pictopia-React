import React, { useState, useEffect } from 'react';
import './Pictopia.css';

const Pictopia = ({ images, thumbnail = true, displayPerRow = 3 }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  const openModal = (index) => {
    setCurrentIndex(index);
    setZoomLevel(1);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setZoomLevel(1);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setZoomLevel(1);
  };

  const zoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom + 0.2);
  };

  const zoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.2, 0.2));
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    setZoomLevel(1);
  };

  return (
    <div>
      <div
        className="Pictopia"
        style={{ gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Gallery image ${index + 1}`}
            onClick={() => openModal(index)}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="pictopia">
          <span className="close" onClick={closeModal}>&times;</span>
          <span className="prev" onClick={prevImage}>&#10094;</span>
          <img
            className="pictopia-image"
            src={images[currentIndex]}
            alt="Current view"
            style={{ transform: `scale(${zoomLevel})` }}
          />
          <span className="next" onClick={nextImage}>&#10095;</span>
          <span className="zoom-in" onClick={zoomIn}>+</span>
          <span className="zoom-out" onClick={zoomOut}>-</span>

          {thumbnail && (
            <div className="thumbnails">
              {images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  className={index === currentIndex ? 'active' : ''}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Pictopia;
