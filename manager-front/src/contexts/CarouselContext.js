import { createContext } from 'react';

export const CarouselContext = createContext({
  activeSlide: 0,
  setActiveSlide: () => {},
});
