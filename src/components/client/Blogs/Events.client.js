"use client";
import React, { useEffect, useState } from "react";
import { DatePicker, Select, Input, Button, Skeleton, Pagination } from "antd";
import locale from "antd/es/date-picker/locale/ru_RU";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import * as dayjs from "dayjs";
import kk from "dayjs/locale/kk";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import NewsService from "@/services/NewsService";
import BlogItem from "@/components/client/Blogs/BlogItem";
import { LINK_URLS } from "@/utils/constants";
import { useTranslation } from "@/app/i18n/client";
const { RangePicker } = DatePicker;
const { Search } = Input;

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const EventsClient = ({ lng }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t: tForm } = useTranslation(lng, "form");
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startEndDate, setStartEndDate] = useState([]);
  const [country, setCountry] = useState("");
  const [eventType, setEventType] = useState("");
  const [pagination, setPagination] = useState(1);

  const link = `/${lng}/${LINK_URLS.events}`;

  const searchQuery =
    searchParams.get("search") && searchParams.get("search") !== null
      ? searchParams.get("search")
      : "";
  const startDateQuery =
    searchParams.get("start_date") && searchParams.get("start_date") !== null
      ? searchParams.get("start_date")
      : "";
  const endDateQuery =
    searchParams.get("end_date") && searchParams.get("end_date") !== null
      ? searchParams.get("end_date")
      : "";
  const countryQuery =
    searchParams.get("country") && searchParams.get("country") !== null
      ? searchParams.get("country")
      : "";
  const typeQuery =
    searchParams.get("type") && searchParams.get("type") !== null
      ? searchParams.get("type")
      : "";

  useEffect(() => {
    if (searchQuery && searchQuery !== "") {
      setSearch(searchQuery);
    }
    if (
      startDateQuery &&
      startDateQuery !== "" &&
      endDateQuery &&
      endDateQuery !== ""
    ) {
      const dateQueryFirst = dayjs(new Date(startDateQuery));
      const dateQuerySecond = dayjs(new Date(endDateQuery));
      setStartEndDate([dateQueryFirst, dateQuerySecond]);
    }
    if (countryQuery && countryQuery !== "") {
      setCountry(+countryQuery);
    }
    if (typeQuery && typeQuery !== "") {
      setEventType(+typeQuery);
    }
  }, [searchQuery, startDateQuery, endDateQuery, countryQuery, typeQuery]);

  const eventsCountry = useQuery({
    queryKey: ["eventsCountry"],
    queryFn: async () => {
      const { data } = await NewsService.getEventsCountry(lng);
      return data;
    },
  });

  const eventsType = useQuery({
    queryKey: ["eventsType"],
    queryFn: async () => {
      const { data } = await NewsService.getEventsType(lng);
      return data;
    },
  });

  const { data, isLoading, isSuccess } = useInfiniteQuery({
    queryKey: [
      "blogEvents",
      searchQuery,
      startDateQuery,
      endDateQuery,
      countryQuery,
      typeQuery,
      pagination,
      lng,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      const getData = {
        event_date_start: startDateQuery,
        event_date_end: endDateQuery,
        type_of_event: typeQuery,
        countries: countryQuery,
        search: searchQuery,
        archive: false,
        page: 1,
        lang: lng,
      };
      const { data } = await NewsService.getEvents(getData);
      return data;
    },
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
  });

  const onSearch = (value) => {
    setSearch(value);
    if (
      startDateQuery !== "" ||
      endDateQuery !== "" ||
      countryQuery !== "" ||
      typeQuery !== ""
    ) {
      router.push(
        `${pathname}?search=${search}&start_date=${startDate}&end_date=${endDate}&country=${country}&type=${eventType}`,
      );
    } else {
      router.push(`${pathname}?search=${search}`);
    }
  };

  const onSubmitFilter = () => {
    router.push(
      `${pathname}?search=${search}&start_date=${startDate}&end_date=${endDate}&country=${country}&type=${eventType}`,
    );
  };

  const onChangeDate = (value) => {
    if (value) {
      const startDateSrc = dayjs(new Date(value[0]))
        .locale(kk)
        .format("YYYY-MM-DD");
      const endDateSrc = dayjs(new Date(value[1]))
        .locale(kk)
        .format("YYYY-MM-DD");
      setStartDate(startDateSrc);
      setEndDate(endDateSrc);
    } else if (value === null || value === undefined) {
      setStartDate("");
      setEndDate("");
    }
    setStartEndDate(value);
  };

  const onChangeCountry = (value) => {
    value && true && true && !isNaN(value) ? setCountry(value) : setCountry("");
  };
  const onChangeEventType = (value) => {
    value && true && true && !isNaN(value)
      ? setEventType(value)
      : setEventType("");
  };

  const getCountryLabel = (value) => {
    return (
      eventsCountry?.data?.length &&
      eventsCountry?.data?.filter((i) => i?.id === value)[0]?.name
    );
  };

  const getEventsTypeLabel = (value) => {
    return (
      eventsType?.data?.length &&
      eventsType?.data?.filter((i) => i?.id === value)[0]?.name
    );
  };
  const onChangeSize = (current) => {
    setPagination(current);
  };

  return (
    <div className="publish publish--two">
      <div className="publish-filter publish-item">
        <RangePicker
          locale={locale}
          value={startEndDate}
          onChange={onChangeDate}
        />

        <Select
          allowClear
          placeholder="Страна проведения"
          value={
            country && country !== ""
              ? {
                  value: country,
                  label: getCountryLabel(country),
                }
              : null
          }
          onChange={onChangeCountry}
          options={
            eventsCountry?.data?.length &&
            eventsCountry?.data.map(({ id, name }) => {
              return {
                value: id,
                label: name,
              };
            })
          }
        />
        <Select
          allowClear
          placeholder="Тип мероприятия"
          value={
            eventType && eventType !== ""
              ? {
                  value: eventType,
                  label: getEventsTypeLabel(eventType),
                }
              : null
          }
          onChange={onChangeEventType}
          options={
            eventsType?.data?.length &&
            eventsType?.data.map(({ id, name }) => {
              return {
                value: id,
                label: name,
              };
            })
          }
        />
        <Button
          type="primary"
          style={{
            width: "100%",
          }}
          onClick={onSubmitFilter}
        >
          {tForm("apply")}
        </Button>
      </div>
      <div className="publish-grid-wrap">
        <div className="publish-search">
          <Search
            placeholder={`${tForm("search")}...`}
            onSearch={onSearch}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="publish-search__input"
            style={{
              width: "100%",
            }}
          />
        </div>
        <div className="publish-grid publish-grid--two publish-item">
          {!isLoading && isSuccess && data
            ? data?.pages[0]?.results.map(
                ({ id, event_date, event_date_end, image, slug, title }) => (
                  <BlogItem
                    key={id}
                    id={id}
                    event_date={event_date}
                    event_date_end={event_date_end}
                    image={image}
                    slug={slug}
                    title={title}
                    lng={lng}
                    link={link}
                  />
                ),
              )
            : Array(4)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="skeleton-blogCard">
                    <Skeleton.Image
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      active={true}
                      className="skeleton-blogCard__img"
                    />
                    <Skeleton className="skeleton-blogCard__text" active />
                  </div>
                ))}
        </div>
        <div className="publish-pagination">
          <Pagination
            onChange={onChangeSize}
            defaultCurrent={1}
            total={data?.pages[0].count}
          />
        </div>
      </div>
    </div>
  );
};

export default EventsClient;
