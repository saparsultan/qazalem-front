import React from "react";
import Link from "next/link";
import banner from "@/assets/img/banner.jpg";
import { log } from "next/dist/server/typescript/utils";

const bannerStyle = {
  backgroundImage: `url("${banner.src}")`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const BannerBlock = (props) => {
  console.log({ banner });
  return (
    <section
      className="section section--full banner__container"
      style={bannerStyle}
    >
      <div className="container">
        <div className="banner">
          <h3 className="banner__title ex-bold">
            Перейди в виртуальный офис <br /> Фонда Отандастар
          </h3>
          <div className="banner__desc">
            И лорем исмут это стандартный текст для сайтов в метавселенных
          </div>
          <Link href="/" className="btn btn-link btn-ligth">
            Перейти в виртуальное пространство
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BannerBlock;
