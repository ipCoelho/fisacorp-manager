import React from 'react';
import './CarouselPage.scss';

export default function CarouselPage({ leftContent, rightContent }) {
  return (
    <>
      <div className="carousel-page">
        <div className="carousel-page-side">{leftContent}</div>
        <div className="carousel-page-side">{rightContent}</div>
      </div>
    </>
  );
}
