"use client";
import { useState } from "react";
import Link from "next/link";
import BlogContentPageClient from "@/components/client/Blogs/BlogContentPage.client";

const EventPage = () => {
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
                <ul className="list-reset event-date-list">
                  <li className="event-date-list__item">
                    <small>Дата начала</small>
                    <div className="event-date-list__text">03 июля 2023</div>
                  </li>
                  <li className="event-date-list__item">
                    <small>Дата окончания</small>
                    <div className="event-date-list__text">01 ноября 2023</div>
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

export default EventPage;
