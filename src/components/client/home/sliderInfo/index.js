"use client";
import { useState } from "react";
import SliderInfoItem from "@/components/client/home/sliderInfo/Item";
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
          <SliderInfoItem
            id={0}
            image={sliderInfo1}
            alt="Slider info 1"
            link={"/"}
            sliderInfoActive={sliderInfoActive}
            handleOnHover={handleOnHover}
          />
          <SliderInfoItem
            id={1}
            image={sliderInfo2}
            alt="Slider info 2"
            link={"/"}
            sliderInfoActive={sliderInfoActive}
            handleOnHover={handleOnHover}
          />
          <SliderInfoItem
            id={2}
            image={sliderInfo3}
            alt="Slider info 3"
            link={"/"}
            sliderInfoActive={sliderInfoActive}
            handleOnHover={handleOnHover}
          />
          <SliderInfoItem
            id={3}
            image={sliderInfo4}
            alt="Slider info 4"
            link={"/"}
            sliderInfoActive={sliderInfoActive}
            handleOnHover={handleOnHover}
          />
        </div>
      </div>
    </section>
  );
};

export default SliderInfo;
