"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import cx from "classnames";
import sliderInfo1 from "@/assets/img/slider-info1.jpg";
import sliderInfo2 from "@/assets/img/slider-info2.jpg";
import sliderInfo3 from "@/assets/img/slider-info3.jpg";
import sliderInfo4 from "@/assets/img/slider-info4.jpg";

const SliderInfo = () => {
  const [sliderInfoActive, setSiderInfoActive] = useState(0);
  const handleOnHover = (id) => {
    setSiderInfoActive(id);
  };

  return (
    <section className="section slider-info__container">
      <div className="container">
        <div className="slider-info">
          <div
            className={cx("slider-info__item", {
              active: sliderInfoActive === 0,
            })}
            onMouseEnter={() => handleOnHover(0)}
          >
            <Image
              className="slider-info__bg"
              src={sliderInfo1}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt="Slider info 1"
            />
            <div className="slider-info__content">
              <div className="slider-info__desc ex-bold">О КАЗАХСТАНЕ</div>
              <Link
                href="/"
                className="btn btn-link btn-ligth ex-bold slider-info__link"
              >
                Подробнее
              </Link>
            </div>
          </div>
          <div
            className={cx("slider-info__item", {
              active: sliderInfoActive === 1,
            })}
            onMouseEnter={() => handleOnHover(1)}
          >
            <Image
              className="slider-info__bg"
              src={sliderInfo2}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt="Slider info 1"
            />
            <div className="slider-info__content">
              <div className="slider-info__desc ex-bold">О КАЗАХСТАНЕ</div>
              <Link href="/" className="btn btn-link slider-info__link">
                Подробнее
              </Link>
            </div>
          </div>
          <div
            className={cx("slider-info__item", {
              active: sliderInfoActive === 2,
            })}
            onMouseEnter={() => handleOnHover(2)}
          >
            <Image
              className="slider-info__bg"
              src={sliderInfo3}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt="Slider info 1"
            />
            <div className="slider-info__content">
              <div className="slider-info__desc ex-bold">О КАЗАХСТАНЕ</div>
              <Link href="/" className="btn btn-link slider-info__link">
                Подробнее
              </Link>
            </div>
          </div>
          <div
            className={cx("slider-info__item", {
              active: sliderInfoActive === 3,
            })}
            onMouseEnter={() => handleOnHover(3)}
          >
            <Image
              className="slider-info__bg"
              src={sliderInfo4}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt="Slider info 1"
            />
            <div className="slider-info__content">
              <div className="slider-info__desc ex-bold">О КАЗАХСТАНЕ</div>
              <Link href="/" className="btn btn-link slider-info__link">
                Подробнее
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SliderInfo;
