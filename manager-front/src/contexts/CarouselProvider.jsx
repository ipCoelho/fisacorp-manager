import React, { useState } from 'react';
import { CarouselContext } from './CarouselContext';

export const CarouselProvider = ({ children }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <CarouselContext.Provider value={{ activeSlide, setActiveSlide }}>
      {children}
    </CarouselContext.Provider>
  );
};
