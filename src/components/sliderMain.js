"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import bgSlider from "@/assets/img/bg-slider.png";
import Link from "next/link";

const SliderMain = () => {
  return (
    <Swiper
      spaceBetween={0}
      centeredSlides={true}
      // autoplay={{
      //   delay: 2500,
      //   disableOnInteraction: false,
      // }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper main-slider"
    >
      <SwiperSlide className="main-slider__item">
        <div className="main-slider__content">
          <h2 className="main-slider__title">
            Встреча казахов
            <br /> в Монголии
          </h2>
          <div className="main-slider__desc">
            <p className="sm-bold">
              <strong>4-8 июля 2023 года</strong> при поддержке{" "}
              <strong>Посольства Казахстана в Монголии</strong>
            </p>
            <p className="sm-bold">
              <strong>Фонд Отандастар проводит IV малый курултай</strong> в
              Улан-Баторе, Кобдинском и Баян-Улгейском регионах с участием
              руководителей казахских культурных организаций Монголии и
              представителей казахской диаспоры.
            </p>
          </div>
          <Link href="/" className="btn btn-link ex-bold main-slider__link">
            Подробнее
          </Link>
        </div>
        <Image src={bgSlider} alt="sss" className="main-slider__img" />
      </SwiperSlide>
      <SwiperSlide className="main-slider__item">
        <div className="main-slider__content">
          <h2 className="main-slider__title">
            Встреча казахов
            <br /> в Монголии
          </h2>
          <div className="main-slider__desc">
            <p className="sm-bold">
              <strong>4-8 июля 2023 года</strong> при поддержке{" "}
              <strong>Посольства Казахстана в Монголии</strong>
            </p>
            <p className="sm-bold">
              <strong>Фонд Отандастар проводит IV малый курултай</strong> в
              Улан-Баторе, Кобдинском и Баян-Улгейском регионах с участием
              руководителей казахских культурных организаций Монголии и
              представителей казахской диаспоры.
            </p>
          </div>
          <Link href="/" className="btn btn-link ex-bold main-slider__link">
            Подробнее
          </Link>
        </div>
        <Image src={bgSlider} alt="sss" className="main-slider__img" />
      </SwiperSlide>
      <SwiperSlide className="main-slider__item">
        <div className="main-slider__content">
          <h2 className="main-slider__title">
            Встреча казахов
            <br /> в Монголии
          </h2>
          <div className="main-slider__desc">
            <p className="sm-bold">
              <strong>4-8 июля 2023 года</strong> при поддержке{" "}
              <strong>Посольства Казахстана в Монголии</strong>
            </p>
            <p className="sm-bold">
              <strong>Фонд Отандастар проводит IV малый курултай</strong> в
              Улан-Баторе, Кобдинском и Баян-Улгейском регионах с участием
              руководителей казахских культурных организаций Монголии и
              представителей казахской диаспоры.
            </p>
          </div>
          <Link href="/" className="btn btn-link ex-bold main-slider__link">
            Подробнее
          </Link>
        </div>
        <Image src={bgSlider} alt="sss" className="main-slider__img" />
      </SwiperSlide>
    </Swiper>
  );
};

export default SliderMain;
