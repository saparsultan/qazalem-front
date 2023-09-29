"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as dayjs from "dayjs";
import LinesEllipsis from "react-lines-ellipsis";
import kk from "dayjs/locale/kk";
import ru from "dayjs/locale/ru";
import en from "dayjs/locale/en";
import zh from "dayjs/locale/zh";
const BlogItem = ({
  id,
  image,
  event_date,
  event_date_end,
  date,
  title,
  subcategory,
  link,
}) => {
  const pathname = usePathname();
  const dateSrc = dayjs(new Date(date)).locale(kk).format("D MMMM, YYYY");
  const startDateSrc = dayjs(new Date(event_date)).locale(kk).format("D MMMM");
  const endDateSrc = dayjs(new Date(event_date_end))
    .locale(kk)
    .format("D MMMM");
  return (
    <div className="blog-item">
      <div
        className={
          subcategory ? "blog-item__img" : "blog-item__img blog-item__img--big"
        }
      >
        <Image
          sizes="(max-width: 768px) 100vw"
          src={image}
          alt="interview1"
          width={100}
          height={100}
          placeholder="empty"
        />
      </div>
      <div className="blog-item__content">
        <div className="blog-item__tag">
          {subcategory ? subcategory?.name : `${startDateSrc} ― ${endDateSrc}`}
        </div>
        <Link href={`${link}/${id}`} className="blog-item__text bold">
          <LinesEllipsis
            text={title}
            maxLine="2"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </Link>
        {date && <div className="blog-item__date">{dateSrc}</div>}
      </div>
    </div>
  );
};

export default BlogItem;
