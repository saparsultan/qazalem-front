import React from "react";
import * as dayjs from "dayjs";
import kk from "dayjs/locale/kk";
import ru from "dayjs/locale/ru";
import en from "dayjs/locale/en";
import zh from "dayjs/locale/zh";

const EventAside = ({ startDate, endDate }) => {
  const startDateSrc = startDate
    ? dayjs(new Date(startDate)).locale(kk).format("D MMMM YYYY")
    : null;

  const endDateSrc = endDate
    ? dayjs(new Date(endDate)).locale(kk).format("D MMMM YYYY")
    : null;

  console.log({ startDateSrc });
  return (
    <aside className="publdet-aside">
      <ul className="list-reset event-date-list">
        <li className="event-date-list__item">
          <small>Дата начала</small>
          <div className="event-date-list__text">{startDateSrc}</div>
        </li>
        <li className="event-date-list__item">
          <small>Дата окончания</small>
          <div className="event-date-list__text">{endDateSrc}</div>
        </li>
      </ul>
    </aside>
  );
};

export default EventAside;
