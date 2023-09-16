import React from "react";
import Image from "next/image";
import Link from "next/link";
import interview1 from "@/assets/img/interview-1.jpg";

const BlogItem = () => (
  <div className="blog-item">
    <div className="blog-item__img">
      <Image src={interview1} alt="interview1" />
    </div>
    <div className="blog-item__content">
      <div className="blog-item__text bold">
        Тайлер (Талғат) Блоттер: Мың күніме татиды Қазақстандағы бір күнім
      </div>
      <div className="blog-item__date">27 шілде 2023</div>
    </div>
    <Link href="/" className="btn btn-accent blog-item__link">
      Подробнее
    </Link>
  </div>
);

export default BlogItem;
