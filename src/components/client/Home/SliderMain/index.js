"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import HomeService from "@/services/HomeServices";
import { LINK_URLS } from "@/utils/constants";
import Social from "@/components/layout/Social";
import { useTranslation } from "@/app/i18n/client";
import CustomSwiperNavs from "@/components/client/Home/SliderMain/CustomSwiperNavs";

const SliderMain = ({ lng }) => {
  const { t } = useTranslation(lng, "home");
  const { data } = useQuery({
    queryKey: ["sliderMainList"],
    queryFn: async () => {
      const { data } = await HomeService.getSliderMain(lng, 5);
      return data;
    },
  });

  const socilalList = useQuery({
    queryKey: ["socialList"],
    queryFn: async () => {
      const { data } = await HomeService.getSocial(null);
      return data;
    },
    // staleTime: Infinity,
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
                  <div className="main-slider__btns">
                    <Link
                      href={`/${lng}/${LINK_URLS.help}`}
                      className="btn btn-link btn-ligth bold main-slider__link help-link"
                    >
                      {t("help")}
                    </Link>
                    <Link
                      href={`/${lng}/${LINK_URLS.events}/${events?.id}`}
                      className="btn btn-link btn-ligth bold main-slider__link"
                    >
                      {t("learnMore")}
                    </Link>
                  </div>
                  <div className="social-home__wrapper">
                    <div className="container">
                      <div className="social-home">
                        <Social data={socilalList} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="main-slider__img-wrap">
                  <div className="main-slider__img-opacity"></div>
                  <Image
                    src={image}
                    fill
                    alt="sss"
                    className="main-slider__img"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        <CustomSwiperNavs />
        {/*<div className="main-slider__more-wrapper">*/}
        {/*  <div className="container main-slider__more-container">*/}
        {/*    <Link*/}
        {/*      href={`/${lng}/${LINK_URLS.events}`}*/}
        {/*      className="btn btn-prime main-slider__more"*/}
        {/*    >*/}
        {/*      Все анонсы*/}
        {/*    </Link>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </Swiper>
    </>
  );
};

export default SliderMain;
