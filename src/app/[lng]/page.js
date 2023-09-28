"use client";
import SliderMain from "@/components/sliderMain";
import SliderInfo from "@/components/client/home/sliderInfo";
import CompanyList from "@/components/companyList";
import SliderEmbassy from "@/components/sliderEmbassy";
import ProjectsHome from "@/components/projectsHome";
import BlogList from "@/components/blogList";
import BannerBlock from "@/components/bannerBlock";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import embassy1 from "@/assets/img/embassy1.jpeg";
import youtubeIcon from "@/assets/img/icons/youtube.svg";
import BannerLink from "@/components/bannerLink";
import WorldNews from "@/components/worldNews";
import News from "@/components/news";
import { useTranslation } from "@/app/i18n/client";
import YouTube from "react-youtube";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import tabImg1 from "@/assets/img/tab-img1.jpg";
import React from "react";
import Partners from "@/components/client/home/Partners";

const Home = ({ params: { lng } }) => {
  const { t } = useTranslation(lng, "translation");
  const demo = [
    {
      title: "1",
      desc: "desc 1",
    },
    {
      title: "2",
      desc: "desc 2",
    },
    {
      title: "3",
      desc: "desc 3",
    },
  ];

  console.log({ lng });

  return (
    <div className="main">
      <SliderMain />
      <SliderInfo />
      <section className="section company-list__container">
        <div className="container">
          <div className="company-list">
            <h2 className="title title-h2 company-list__title">
              Внести свой вклад <br /> в развитие Казахстана
            </h2>
            <CompanyList />
          </div>
        </div>
      </section>
      <section className="section embassy__container">
        <div className="container">
          <div className="embassy">
            <h2 className="title title-h2">Бронирование в консульствe</h2>
            <SliderEmbassy slidesPerView={4} />
          </div>
        </div>
      </section>
      {/*<section className="section projects-home__container">*/}
      {/*  <div className="container">*/}
      {/*    <div className="projects-home">*/}
      {/*      <h2 className="title title-h2 projects-home__title">Проекты</h2>*/}
      {/*      <ProjectsHome />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}
      {/*<section className="section interview-home__container">*/}
      {/*  <div className="container">*/}
      {/*    <div className="interview-home">*/}
      {/*      <h2 className="title title-h2 interview-home__title">Интервью</h2>*/}
      {/*      <BlogList />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}
      <section className="section helpful-home__container">
        <div className="container">
          <div className="helpful-home">
            <h2 className="title title-h2 helpful-home__title">
              Полезная информация
            </h2>
            <SliderEmbassy slidesPerView={5} />
          </div>
        </div>
      </section>
      <BannerLink />
      <section className="section video__container">
        <div className="container">
          <div className="video">
            <h2 className="title title-h2 video__title">
              QAZALEM{" "}
              <Image
                src={youtubeIcon}
                alt="video-icon"
                className="video__title-icon"
              />{" "}
              CHANNEL
            </h2>
            <div className="video-content">
              <div className="video-content__list">
                <div className="video-content__item video-content__item--one">
                  <div className="video-block"></div>
                </div>
                <div className="video-content__item video-content__item--two">
                  <div className="video-block"></div>
                  <div className="video-block"></div>
                </div>
              </div>
              <Link
                href="https://www.youtube.com/channel/UCef62ITFdIiXn3oXc_0BCLg"
                target="_blank"
                className="video-content__link"
              >
                Все видео
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/*<YouTubePlayer videoId="K4HFp_CGlHI" />*/}
      <section className="section world-news-home__container">
        <div className="container">
          <div className="world-news-home">
            <h2 className="title title-h2 world-news-home__title">
              Мировые события
            </h2>
            <div className="world-news-home__content">
              <WorldNews />
            </div>
          </div>
        </div>
      </section>
      <section className="section news-home__container">
        <div className="container">
          <div className="news-home">
            <h2 className="title title-h2 news-home__title">Новости</h2>
            <div className="news-home__content">
              <News />
            </div>
          </div>
        </div>
      </section>
      <section className="section partners__container">
        <div className="container container--banner">
          <div className="partners">
            <h2 className="title title-h2 partners__title">Наши партнеры</h2>
            <Partners />
          </div>
        </div>
      </section>
      <BannerBlock />
    </div>
  );
};
export default Home;

export const YouTubePlayer = ({ videoId }) => {
  // Set up event handlers
  const onReady = (event) => {
    // Access the player instance
    const player = event.target;

    // For example, you can automatically play the video
    player.playVideo();
  };
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const onError = (error) => {
    console.error("YouTube Player Error:", error);
  };

  return (
    <YouTube
      videoId={videoId}
      opts={opts}
      onReady={onReady}
      onError={onError}
      loading="dddd"
    />
  );
};
