"use client";
import { useState } from "react";
import SliderInfoItem from "@/components/client/Home/SliderInfo/Item";
import sliderInfo1 from "@/assets/img/slider-info1.jpg";
import sliderInfo2 from "@/assets/img/slider-info2.jpg";
import sliderInfo3 from "@/assets/img/slider-info3.jpg";
import sliderInfo4 from "@/assets/img/slider-info4.jpg";
import { LINK_URLS } from "@/utils/constants";

const SliderInfo = ({ lng }) => {
  const [sliderInfoActive, setSiderInfoActive] = useState(0);
  const handleOnHover = (id) => {
    setSiderInfoActive(id);
  };

  return (
    <section className="section slider-info__container">
      <div className="container">
        <div className="slider-info">
          <SliderInfoItem
            id={0}
            title="О Казахстане"
            image={sliderInfo1}
            alt="Slider info 1"
            link={`/${lng}/${LINK_URLS.aboutKazakhstan}`}
            sliderInfoActive={sliderInfoActive}
            handleOnHover={handleOnHover}
          />
          <SliderInfoItem
            id={1}
            title="Регионы"
            image={sliderInfo2}
            alt="Slider info 2"
            link={`/${lng}/${LINK_URLS.regions}`}
            sliderInfoActive={sliderInfoActive}
            handleOnHover={handleOnHover}
          />
          <SliderInfoItem
            id={2}
            title="Информационная поддержка кандасов"
            image={sliderInfo3}
            alt="Slider info 3"
            link={`/${lng}/${LINK_URLS.faq}`}
            sliderInfoActive={sliderInfoActive}
            handleOnHover={handleOnHover}
          />
          <SliderInfoItem
            id={3}
            image={sliderInfo4}
            alt="Slider info 4"
            link={`/${lng}/${LINK_URLS.faq}`}
            sliderInfoActive={sliderInfoActive}
            handleOnHover={handleOnHover}
          />
        </div>
      </div>
    </section>
  );
};

export default SliderInfo;
