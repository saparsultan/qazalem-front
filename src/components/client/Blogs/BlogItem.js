"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import * as dayjs from "dayjs";
import kk from "dayjs/locale/kk";
import { usePathname } from "next/navigation";
const BlogItem = ({ id, image, date, title, subcategory }) => {
  const pathname = usePathname();
  const dateSrc = dayjs(new Date(date)).locale(kk).format("D MMMM, YYYY");
  return (
    <div className="blog-item">
      <div className="blog-item__img">
        <Image src={image} alt="interview1" width={100} height={100} />
      </div>
      <div className="blog-item__content">
        <div className="blog-item__tag">{subcategory?.name}</div>
        <Link href={`${pathname}/${id}`} className="blog-item__text bold">
          {title}
        </Link>
        <div className="blog-item__date">{dateSrc}</div>
      </div>
    </div>
  );
};

export default BlogItem;
