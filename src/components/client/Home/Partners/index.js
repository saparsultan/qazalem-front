"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import HomeService from "@/services/HomeServices";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import embassy1 from "@/assets/img/embassy1.jpeg";
import { BASE_URL } from "@/utils/constants";

const Partners = (props) => {
  const { data } = useQuery({
    queryKey: ["partnersList"],
    queryFn: async () => {
      const { data } = await HomeService.getPartners();
      return data;
    },
  });
  console.log({ data });

  return (
    <Swiper
      slidesPerView="6"
      spaceBetween={20}
      navigation={true}
      modules={[Navigation]}
      className="grid-slider partners-slider"
    >
      {data?.length &&
        data.map(({ id, image, url, name }) => {
          return (
            <SwiperSlide
              className="grid-slider__slide partners__slide"
              key={id}
            >
              <Link
                href={url}
                target="_blank"
                className="partners__item"
                title={name}
              >
                <Image
                  className="grid-slider__bg partners__img"
                  src={image}
                  alt={name}
                  fill
                  center="true"
                />
              </Link>
            </SwiperSlide>
          );
        })}
      <div className="partners-slider__gradient partners-slider__prev"></div>
      <div className="partners-slider__gradient partners-slider__next"></div>
    </Swiper>
  );
};
export default Partners;
