"use client";
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.scss";
import Link from "next/link";
import Image from "next/image";
import tabImg1 from "@/assets/img/tab-img1.jpg";

const CompanyList = (props) => {
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
                Kazakh Tourism 1
              </h3>
              <p className="company-list-content__desc">
                Lorem Ipsum - это, часто используемый в печати и вэб-дизайне.
                Lorem I psum является стандартной рыбой для текстов на латинице
                с начала XVI века. В то время некий текстов на латинице с начала
                XVI века. В то время некий
              </p>
              <Link
                href="/"
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
                Kazakh Tourism 2
              </h3>
              <p className="company-list-content__desc">
                Lorem Ipsum - это текст-рыба, часто используемый в печати и
                вэб-дизайне. Lorem I psum является стандартной рыбой для текстов
                на латинице с начала XVI века. В то время некий текстов на
                латинице с начала XVI века. В то время некий
              </p>
              <Link
                href="/"
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
                href="/"
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
                Kazakh Tourism 4
              </h3>
              <p className="company-list-content__desc">
                Lorem Ipsum - это текст-рыба, часто используемый в печати и
                вэб-дизайне. Lorem I psum является стандартной рыбой для текстов
                на латинице с начала XVI века. В то время некий текстов на
                латинице с начала XVI века. В то время некий
              </p>
              <Link
                href="/"
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
                Kazakh Tourism 5
              </h3>
              <p className="company-list-content__desc">
                Lorem Ipsum - это текст-рыба, часто используемый в печати и
                вэб-дизайне. Lorem I psum является стандартной рыбой для текстов
                на латинице с начала XVI века. В то время некий текстов на
                латинице с начала XVI века. В то время некий
              </p>
              <Link
                href="/"
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
                Kazakh Tourism 6
              </h3>
              <p className="company-list-content__desc">
                Lorem Ipsum - это текст-рыба, часто используемый в печати и
                вэб-дизайне. Lorem I psum является стандартной рыбой для текстов
                на латинице с начала XVI века. В то время некий текстов на
                латинице с начала XVI века. В то время некий
              </p>
              <Link
                href="/"
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
                Kazakh Tourism 7
              </h3>
              <p className="company-list-content__desc">
                Lorem Ipsum - это текст-рыба, часто используемый в печати и
                вэб-дизайне. Lorem I psum является стандартной рыбой для текстов
                на латинице с начала XVI века. В то время некий текстов на
                латинице с начала XVI века. В то время некий
              </p>
              <Link
                href="/"
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

export default CompanyList;
