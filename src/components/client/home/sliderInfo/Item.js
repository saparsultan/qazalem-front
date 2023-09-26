import React from "react";
import Image from "next/image";
import Link from "next/link";
import cx from "classnames";
const SliderInfoItem = ({
  id,
  image,
  alt,
  link,
  sliderInfoActive,
  handleOnHover,
}) => {
  return (
    <div
      className={cx("slider-info__item", {
        active: sliderInfoActive === id,
      })}
      onMouseEnter={() => handleOnHover(id)}
    >
      <Image
        className="slider-info__bg"
        src={image}
        fill
        cover="true"
        center="true"
        alt={alt}
      />
      <div className="slider-info__content">
        <div className="slider-info__desc ex-bold">О КАЗАХСТАНЕ</div>
        <Link
          href={link}
          className="btn btn-accent btn-link btn-ligth sm-bold slider-info__link"
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
};
export default SliderInfoItem;
