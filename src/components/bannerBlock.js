import React from "react";
import Link from "next/link";
import banner from "@/assets/img/banner.jpg";

const bannerStyle = {
  backgroundImage: `url("${banner.src}")`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const BannerBlock = (props) => {
  console.log({ banner });
  return (
    <section className="section section--full banner__container">
      <div className="container container--banner">
        <div className="banner" style={bannerStyle}>
          <span className="banner__label bold">QAZALEM</span>
          <h3 className="banner__title bold">
            Перейди в виртуальный офис <br /> Фонда Отандастар
          </h3>
          <div className="banner__desc">Можете пройти на наше мероприятие</div>
          <Link href="/" className="btn btn-link btn-dark">
            Перейти в виртуальное пространство
          </Link>
        </div>
      </div>
      <div className="banner__background"></div>
    </section>
  );
};

export default BannerBlock;
