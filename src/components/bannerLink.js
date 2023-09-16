import React from "react";
import Link from "next/link";
import banner from "@/assets/img/banner-link.jpg";
import { log } from "next/dist/server/typescript/utils";

const bannerStyle = {
  backgroundImage: `url("${banner.src}")`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const BannerLink = (props) => {
  console.log({ banner });
  return (
    <section className="section banner-link__container">
      <div className="container">
        <div className="banner-link" style={bannerStyle}>
          <h3 className="title-banner banner-link__title ex-bold">
            Call-центры в Казахстане
          </h3>
          <Link href="/" className="btn btn-link btn-prime banner-link__link">
            Подробнее
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BannerLink;
