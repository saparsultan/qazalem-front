"use client";
import SliderMain from "@/components/sliderMain";
import SliderInfo from "@/components/sliderInfo";
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
      {/*<h1>{t("title")}</h1>*/}
      <Link href={`/${lng}/second-page`}>{t("to-second-page")}</Link>
      <SliderInfo />
      <CompanyList />
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
      <BannerBlock />
      <section className="section helpful-home__container">
        <div className="container">
          <div className="helpful-home">
            <h2 className="title title-h2 helpful-home__title">
              ПОЛЕЗНАЯ ИНФОРМАЦИЯ
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
              <Link href="/" className="video-content__link">
                Все видео
              </Link>
            </div>
          </div>
        </div>
      </section>
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
        <div className="container">
          <div className="partners">
            <h2 className="title title-h2 partners__title">Наши партнеры</h2>
            <SliderEmbassy slidesPerView={6} />
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
