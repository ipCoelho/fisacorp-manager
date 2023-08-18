import React, { useImperativeHandle, useContext, useRef } from 'react';
import Slider from 'react-slick';
import { CarouselContext } from '../../contexts/CarouselContext';
import './CarouselComponent.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CarouselComponent = React.forwardRef((props, ref) => {
  const { activeSlide, setActiveSlide } = useContext(CarouselContext);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    afterChange: setActiveSlide,
    initialSlide: activeSlide,
  };

  const sliderRef = useRef(null);

  useImperativeHandle(ref, () => ({
    slickGoTo: (slideIndex) => {
      sliderRef.current.slickGoTo(slideIndex);
    },
  }));

  return (
    <Slider ref={sliderRef} {...settings}>
      {props.children}
    </Slider>
  );
});

export default CarouselComponent;
