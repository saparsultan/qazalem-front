"use client";
import Link from "next/link";
import Image from "next/image";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.scss";
import tabImg1 from "@/assets/img/tab-img1.jpg";
import { LINK_URLS } from "@/utils/constants";

const ServicesHome = ({ lng }) => {
  return (
    <div className="company-list__content">
      <Tabs className="company-list__tabs-wrap">
        <TabList className="tab-list__tabs">
          <Tab className="tab-list__tab">Kazakh Tourism</Tab>
          <Tab className="tab-list__tab">Kazakh Invest</Tab>
          <Tab className="tab-list__tab">Alem Metaverse</Tab>
          <Tab className="tab-list__tab">QazTrade</Tab>
          <Tab className="tab-list__tab">KazakhExport</Tab>
          <Tab className="tab-list__tab">ВТП Атамекен</Tab>
          <Tab className="tab-list__tab">Astana Hub</Tab>
        </TabList>
        <TabPanel>
          <div className="company-list-content">
            <div className="company-list-content__item">
              <h3 className="title title-h3 company-list-content__title">
                Kazakh Tourism
              </h3>
              <p className="company-list-content__desc">
                АО «Национальная компания «Kazakh Tourism» было основано в 2017
                году после многочисленных успешных мероприятий проведенных в
                стране с целью продолжения продвижения Казахстана в мировом
                масштабе как туристического направления. Kazakh Tourism, являясь
                бренд-менеджером страны по туризму и дочерней компанией
                Министерства культуры и спорта, обеспечивает всестороннее и
                целостное позиционирование страны как на международном, так и на
                внутреннем рынке. Kazakh Tourism уделяет особое внимание
                маркетингу и продвижению страны, привлечению инвестиций в туризм
                и реализации Государственной программе развития туризма до 2025
                года.
              </p>
              <Link
                href={`/${lng}/${LINK_URLS.services}`}
                className="btn btn-link btn-accent company-list-content__link"
              >
                Подробнее
              </Link>
            </div>
            <div className="company-list-content__item company-list-content__item--img">
              <Image
                src={tabImg1}
                className="company-list-content__img"
                alt="tab-img-1"
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="company-list-content">
            <div className="company-list-content__item">
              <h3 className="title title-h3 company-list-content__title">
                Kazakh Invest
              </h3>
              <p className="company-list-content__desc">
                АО «Национальная компания «KAZAKH INVEST» создана в соответствии
                с постановлением Правительства Республики Казахстан от 1 марта
                2017 года № 100 «О переименовании акционерного общества
                «Национальное агентство по экспорту и инвестициям «KAZNEX
                INVEST» в целях содействия устойчивому социально-экономическому
                развитию Республики Казахстан путем привлечения иностранных
                инвестиций в приоритетные сектора экономики и комплексного
                сопровождения инвестиционных проектов. Указом Президента
                Республики Казахстан «О мерах по дальнейшему совершенствованию
                системы государственного управления Республики Казахстан» от 26
                декабря 2018 года №806 права владения
              </p>
              <Link
                href={`/${lng}/${LINK_URLS.services}`}
                className="btn btn-link btn-accent company-list-content__link"
              >
                Подробнее
              </Link>
            </div>
            <div className="company-list-content__item company-list-content__item--img">
              <Image
                src={tabImg1}
                className="company-list-content__img"
                alt="tab-img-1"
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="company-list-content">
            <div className="company-list-content__item">
              <h3 className="title title-h3 company-list-content__title">
                Kazakh Tourism 3
              </h3>
              <p className="company-list-content__desc">
                Lorem Ipsum - это текст-рыба, часто используемый в печати и
                вэб-дизайне. Lorem I psum является стандартной рыбой для текстов
                на латинице с начала XVI века. В то время некий текстов на
                латинице с начала XVI века. В то время некий
              </p>
              <Link
                href={`/${lng}/${LINK_URLS.services}`}
                className="btn btn-link btn-accent company-list-content__link"
              >
                Подробнее
              </Link>
            </div>
            <div className="company-list-content__item company-list-content__item--img">
              <Image
                src={tabImg1}
                className="company-list-content__img"
                alt="tab-img-1"
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="company-list-content">
            <div className="company-list-content__item">
              <h3 className="title title-h3 company-list-content__title">
                QazTrade
              </h3>
              <p className="company-list-content__desc">
                Акционерное общество «Центр развития торговой политики
                «QazTrade» (далее — QazTrade) создано в соответствии с
                постановлением Правительства Республики Казахстан от 30 июня
                2006 года № 616 «О некоторых вопросах создания акционерного
                общества «Центр развития торговой политики» и постановлением
                Правительства Республики Казахстан от 6 сентября 2019 года № 663
                «О переименовании акционерного общества «Центр развития торговой
                политики» в акционерное общество «Центр развития торговой
                политики «QazTrade».
              </p>
              <Link
                href={`/${lng}/${LINK_URLS.services}`}
                className="btn btn-link btn-accent company-list-content__link"
              >
                Подробнее
              </Link>
            </div>
            <div className="company-list-content__item company-list-content__item--img">
              <Image
                src={tabImg1}
                className="company-list-content__img"
                alt="tab-img-1"
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="company-list-content">
            <div className="company-list-content__item">
              <h3 className="title title-h3 company-list-content__title">
                KazakhExport
              </h3>
              <p className="company-list-content__desc">
                АО «Экспортная страховая компания «KazakhExport» – является
                единственной специализированной страховой организацией –
                институтом развития Республики Казахстан, осуществляющей функции
                экспортно-кредитного агентства. Данные функции KazakhExport были
                закреплены в Государственной программе по форсированному
                индустриально-инновационному развитию РК на 2010-2014 годы, в
                целях создания эффективных финансовых механизмов по поддержке
                выхода казахстанской продукции обрабатывающего сектора на
                зарубежные рынки. KazakhExport в рамках своей основной
                деятельности предоставляет предприятиям экспортерам
                обрабатывающего сектора и БВУ страховую защиту от риска
                неплатежей при внешнеторговых
              </p>
              <Link
                href={`/${lng}/${LINK_URLS.services}`}
                className="btn btn-link btn-accent company-list-content__link"
              >
                Подробнее
              </Link>
            </div>
            <div className="company-list-content__item company-list-content__item--img">
              <Image
                src={tabImg1}
                className="company-list-content__img"
                alt="tab-img-1"
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="company-list-content">
            <div className="company-list-content__item">
              <h3 className="title title-h3 company-list-content__title">
                ВТП Атамекен
              </h3>
              <p className="company-list-content__desc">
                Внешнеторговая палата Казахстана (ВПК) была образована 29 июля
                2014 г. и является 100% дочерней компанией Национальной палаты
                предпринимателей Республики Казахстан «Атамекен». Основная
                задача, которая была поставлена перед Внешнеторговой палатой
                Казахстана - представление интересов казахстанского бизнеса во
                внешнеэкономической сфере.
              </p>
              <Link
                href={`/${lng}/${LINK_URLS.services}`}
                className="btn btn-link btn-accent company-list-content__link"
              >
                Подробнее
              </Link>
            </div>
            <div className="company-list-content__item company-list-content__item--img">
              <Image
                src={tabImg1}
                className="company-list-content__img"
                alt="tab-img-1"
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="company-list-content">
            <div className="company-list-content__item">
              <h3 className="title title-h3 company-list-content__title">
                Astana Hub
              </h3>
              <p className="company-list-content__desc">
                Astana Hub это крупнейший технопарк для IT-проектов в
                Центральной Азии. С помощью него развиваются самые интересные
                стартап-проекты в стране. Astana Hub представляет собой
                корпоративный бизнес-инкубатор, направленный на развитие
                передовых идей в сфере IT., площадка где созданы условия для
                свободного развития местных и зарубежных технологических
                компаний.
              </p>
              <Link
                href={`/${lng}/${LINK_URLS.services}`}
                className="btn btn-link btn-accent company-list-content__link"
              >
                Подробнее
              </Link>
            </div>
            <div className="company-list-content__item company-list-content__item--img">
              <Image
                src={tabImg1}
                className="company-list-content__img"
                alt="tab-img-1"
              />
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ServicesHome;
