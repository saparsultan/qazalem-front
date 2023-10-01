"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import HomeService from "@/services/HomeServices";
import { LINK_URLS } from "@/utils/constants";

const SliderMain = ({ lng }) => {
  const { data } = useQuery({
    queryKey: ["sliderMainList"],
    queryFn: async () => {
      const { data } = await HomeService.getSliderMain(lng, 3);
      return data;
    },
  });

  const socilalList = useQuery({
    queryKey: ["socialList"],
    queryFn: async () => {
      const { data } = await HomeService.getSocial(3);
      return data;
    },
  });
  console.log("sliderMain", socilalList);

  return (
    <>
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
        {data &&
          data?.length &&
          data.map(({ id, events, image, text, title_slider }) => {
            return (
              <SwiperSlide key={id} className="main-slider__item">
                <div className="main-slider__content container">
                  <h2 className="main-slider__title">{title_slider}</h2>
                  <div className="main-slider__desc">{text}</div>
                  <Link
                    href={`/${lng}/${LINK_URLS.events}/${events}`}
                    className="btn btn-link btn-ligth bold main-slider__link"
                  >
                    Подробнее
                  </Link>
                </div>
                <Image
                  src={image}
                  fill
                  alt="sss"
                  className="main-slider__img"
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
      <div className="container"></div>
    </>
  );
};

export default SliderMain;
