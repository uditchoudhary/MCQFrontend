import React from 'react';
import './ImageComponent.css';

interface ImageComponentProps {
  src: string;
  alt?: string; // optional alt text
}

const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt = 'Image' }) => {
  return (
    <div className="image-container">
      <img 
        src={src} 
        alt={alt} 
        className="responsive-image" 
      />
    </div>
  );
};

export default ImageComponent;
