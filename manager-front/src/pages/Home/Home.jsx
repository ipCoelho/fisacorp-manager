import React, { useRef, useState } from 'react';
import './Home.scss';
import Header from '../../components/Header/Header';
import CarouselComponent from '../../components/CarouselComponent/CarouselComponent';
import CarouselPage from '../../components/CarouselPage/CarouselPage';
import Footer from '../../components/Footer/Footer';
import { CarouselContext } from '../../contexts/CarouselContext';

import womanComputerSvg from '../../assets/svg/woman-computer.svg';
import womanPipeSvg from '../../assets/svg/woman-pipe.svg';
import TitleText from '../../components/TitleText/TitleText';
import ContactForm from '../../components/ContactForm/ContactForm';

export default function Home() {
  const carouselRef = useRef(null);

  const [activeSlide, setActiveSlide] = useState(0);

  const goToSlide = (slideIndex) => {
    carouselRef.current.slickGoTo(slideIndex);
    setActiveSlide(slideIndex);
  };

  const handleNextClick = () => {
    const nextSlideIndex = (activeSlide + 1) % 3;
    goToSlide(nextSlideIndex);
  };

  return (
    <div className="home-container">
      <CarouselContext.Provider value={{ activeSlide, setActiveSlide }}>
        <Header onLinkClick={goToSlide} />
        <div className="carousel-wrapper">
          <CarouselComponent ref={carouselRef}>
            <CarouselPage
              leftContent={
                <TitleText
                  title={'Soluções em gestão de tarefas.'}
                  text={
                    'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.'
                  }
                />
              }
              rightContent={<img src={womanComputerSvg} alt="Fisa Corp" />}
              onNextClick={handleNextClick}
            />
            <CarouselPage
              leftContent={<img src={womanPipeSvg} alt="Fisa Corp" />}
              rightContent={
                <TitleText
                  title={'Controle as atividades do dia a dia.'}
                  text={
                    'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.'
                  }
                />
              }
              onNextClick={handleNextClick}
            />
            <CarouselPage
              leftContent={
                <TitleText
                  title={'Entre em contato conosco para maiores informações.'}
                  text={
                    'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.'
                  }
                />
              }
              rightContent={<ContactForm />}
              onNextClick={handleNextClick}
            />
          </CarouselComponent>
          <button
            className="next-page-btn"
            onClick={() => goToSlide((activeSlide + 1) % 3)}
          >
            {activeSlide === 2 ? '⬅' : '➡'}
          </button>
        </div>
        <Footer />
      </CarouselContext.Provider>
    </div>
  );
}
