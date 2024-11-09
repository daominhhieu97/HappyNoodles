import React from 'react';
import { Box } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselSection: React.FC = () => (
  <Box sx={{ mb: 4 }}>
    <div style={{ width: '100%' }}>
      <Carousel showThumbs={false} infiniteLoop autoPlay>
        <div>
          <img
            src="https://images.unsplash.com/photo-1552611052-33e04de081de"
            alt="Happy Noodles Dish 1"
            style={{ width: '100%', height: '500px', objectFit: 'cover' }}
          />
          <p className="legend">Signature Ramen Bowl</p>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624"
            alt="Happy Noodles Dish 2"
            style={{ width: '100%', height: '500px', objectFit: 'cover' }}
          />
          <p className="legend">Spicy Udon Stir-Fry</p>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
            alt="Happy Noodles Ambiance"
            style={{ width: '100%', height: '500px', objectFit: 'cover' }}
          />
          <p className="legend">Our Cozy Restaurant</p>
        </div>
      </Carousel>
    </div>
  </Box>
);

export default CarouselSection;