"use client";
import { useState } from "react";
import Link from "next/link";
import BlogContentPageClient from "@/components/client/Blogs/BlogContentPage.client";

const NewsPage = () => {
  const [title, setTitle] = useState("");
  console.log({ title });
  return (
    <>
      <section className="section publdet__container">
        <div className="container">
          <div className="publdet">
            <h2 className="title title-left title-h2 text-low bold publdet__title">
              {title}
            </h2>
            <div className="publdet-wrap">
              <BlogContentPageClient setTitle={setTitle} />
              <aside className="publdet-aside">
                <h3 className="title title-h3 mdm publdet-aside__title">
                  Последние новости
                </h3>
                <ul className="list-reset publdet-list">
                  <li className="publdet-list__item">
                    <div className="publdet-list__head">
                      <div className="publdet-list__tag blog-item__tag">
                        новости
                      </div>
                      <div className="publdet-list__date">18 сентября 2023</div>
                    </div>
                    <Link href="/" className="publdet-list__link">
                      18 сентября 2023 Казахстанские борцы поборятся за «бронзу»
                      чемпионата мира по вольной борьбе
                    </Link>
                  </li>
                  <li className="publdet-list__item">
                    <div className="publdet-list__head">
                      <div className="publdet-list__tag blog-item__tag">
                        новости
                      </div>
                      <div className="publdet-list__date">18 сентября 2023</div>
                    </div>
                    <Link href="/" className="publdet-list__link">
                      18 сентября 2023 Казахстанские борцы поборятся за «бронзу»
                      чемпионата мира по вольной борьбе
                    </Link>
                  </li>
                  <li className="publdet-list__item">
                    <div className="publdet-list__head">
                      <div className="publdet-list__tag blog-item__tag">
                        новости
                      </div>
                      <div className="publdet-list__date">18 сентября 2023</div>
                    </div>
                    <Link href="/" className="publdet-list__link">
                      18 сентября 2023 Казахстанские борцы поборятся за «бронзу»
                      чемпионата мира по вольной борьбе
                    </Link>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsPage;
