"use client";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import embassy1 from "@/assets/img/embassy1.jpeg";
import embassy2 from "@/assets/img/embassy2.jpeg";
import embassy3 from "@/assets/img/embassy3.jpeg";
import embassy4 from "@/assets/img/embassy4.jpeg";
import React from "react";
import MoreLink from "@/components/layout/MoreLink";

const Booking = ({ slidesPerView }) => {
  return (
    <>
      <Swiper
        breakpoints={{
          396: {
            slidesPerView: 2,
          },
          576: {
            slidesPerView: 3,
            spaceBetween: 14,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        slidesPerView={slidesPerView}
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        className="grid-slider custom-swiper"
      >
        <SwiperSlide className="grid-slider__slide">
          <Link
            href="https://www.gov.kz/memleket/entities/mfa-hanoi/online-booking"
            target="_blank"
            className="grid-slider__item"
          >
            <Image
              className="grid-slider__bg"
              src={embassy1}
              alt="embassy 1"
              fill
              cover="true"
              center="true"
            />
            <div className="grid-slider__content">
              <h4 className="title-h4 grid-slider__title">Ханой</h4>
              <div className="grid-slider__desc">Вьетнам</div>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="grid-slider__slide">
          {" "}
          <Link
            href="https://www.gov.kz/memleket/entities/mfa-paris/online-booking"
            target="_blank"
            className="grid-slider__item"
          >
            <Image
              className="grid-slider__bg"
              src={embassy2}
              alt="embassy 2"
              fill
              cover="true"
              center="true"
            />
            <div className="grid-slider__content">
              <h4 className="title-h4 grid-slider__title">Париж</h4>
              <div className="grid-slider__desc">Франция</div>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="grid-slider__slide">
          {" "}
          <Link
            href="https://www.gov.kz/memleket/entities/mfa-washington/online-booking"
            target="_blank"
            className="grid-slider__item"
          >
            <Image
              className="grid-slider__bg"
              src={embassy3}
              alt="embassy 3"
              fill
              cover="true"
              center="true"
            />
            <div className="grid-slider__content">
              <h4 className="title-h4 grid-slider__title">Вашингтон</h4>
              <div className="grid-slider__desc">США</div>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className="grid-slider__slide">
          {" "}
          <Link
            href="https://www.gov.kz/memleket/entities/mfa-tashkent/online-booking"
            target="_blank"
            className="grid-slider__item"
          >
            <Image
              className="grid-slider__bg"
              src={embassy4}
              alt="embassy 4"
              fill
              cover="true"
              center="true"
            />
            <div className="grid-slider__content">
              <h4 className="title-h4 grid-slider__title">Ташкент</h4>
              <div className="grid-slider__desc">Узбекистан</div>
            </div>
          </Link>
        </SwiperSlide>
      </Swiper>
      <MoreLink
        link="https://www.gov.kz/memleket/entities/qazalem/activities/30461"
        target
      >
        Подробнее
      </MoreLink>
    </>
  );
};

export default Booking;
