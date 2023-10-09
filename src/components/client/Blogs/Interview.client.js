"use client";
import { DatePicker, Input, Button } from "antd";
const { RangePicker } = DatePicker;
import locale from "antd/es/date-picker/locale/ru_RU";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import NewsService from "@/services/NewsService";
import BlogItem from "@/components/client/Blogs/BlogItem";
import React, { useEffect, useState } from "react";
import * as dayjs from "dayjs";
import kk from "dayjs/locale/kk";
import customParseFormat from "dayjs/plugin/customParseFormat";
import advancedFormat from "dayjs/plugin/advancedFormat";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import { LINK_URLS } from "@/utils/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const { Search } = Input;

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const InterviewClient = ({ lng }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [publishDate, setPublishDate] = useState("");
  const [startEndDate, setStartEndDate] = useState(null);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const link = `/${lng}/${LINK_URLS.interview}`;

  const searchQuery =
    searchParams.get("search") && searchParams.get("search") !== null
      ? searchParams.get("search")
      : "";
  const publishDateQuery =
    searchParams.get("publish_date") &&
    searchParams.get("publish_date") !== null
      ? searchParams.get("publish_date")
      : "";

  useEffect(() => {
    if (searchQuery && searchQuery !== "") {
      setSearch(searchQuery);
    }
    // if (
    //     publishDateQuery &&
    //     publishDateQuery !== "" &&
    // ) {
    //   const dateQueryFirst = dayjs(new Date(startDateQuery));
    //   const dateQuerySecond = dayjs(new Date(endDateQuery));
    //   setPublishDate([dateQueryFirst, dateQuerySecond]);
    // }
  }, [searchQuery]);

  console.log({ publishDateQuery });

  const { data } = useInfiniteQuery({
    queryKey: ["blogInterview", searchQuery, publishDateQuery, lng],
    queryFn: async ({ pageParam = 0 }) => {
      const datesArray = publishDateQuery.split(" ");
      const firstDate =
        datesArray && datesArray.length > 1 ? datesArray[0] : "";
      const secondDate =
        datesArray && datesArray.length > 1 ? datesArray[1] : "";
      const getData = {
        published_date_start: firstDate,
        published_date_end: secondDate,
        search: searchQuery,
        limit: "",
        offset: "",
        lang: lng,
      };
      const { data } = await NewsService.getInterview(getData);
      return data;
    },
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
  });

  const onChangeDate = (value) => {
    if (value) {
      const startDateSrc = dayjs(new Date(value[0]))
        .locale(kk)
        .format("YYYY-MM-DD");
      const endDateSrc = dayjs(new Date(value[1]))
        .locale(kk)
        .format("YYYY-MM-DD");
      const publishDate = `${startDateSrc} ${endDateSrc}`;
      setPublishDate(publishDate);
    } else if (value === null || value === undefined) {
      setPublishDate("");
    }
    setStartEndDate(value);
  };

  console.log({ publishDate });
  console.log({ category });
  console.log({ data });
  console.log({ startEndDate });
  const onSubmitFilter = () => {
    router.push(`${pathname}?search=${search}&publish_date=${publishDate}`);
  };
  const onSearch = (value) => {
    setSearch(value);
    if (publishDateQuery !== "") {
      router.push(`${pathname}?search=${search}&publish_date=${publishDate}`);
    } else {
      router.push(`${pathname}?search=${search}`);
    }
  };

  const onChangeSearch = (e) => {
    const target = e.target.value;
    if (target === "" && searchQuery !== "") {
      setSearch("");
      router.push(pathname);
    }
    setSearch(target);
  };

  return (
    <section className="section section--publish news-world__container">
      <div className="container">
        <div className="news-world">
          <h2 className="title title-left text-low title-h2 publish__title">
            Интервью
          </h2>
          <p className="publish__desc">
            Цикл интервью с нашими соотечественниками, которые добились
            выдающихся успехов за рубежом. Реализуется совместно с Forbes
            Kazakhstan
          </p>
          <div className="publish publish--two">
            <div className="publish-filter publish-item">
              <RangePicker
                locale={locale}
                value={startEndDate}
                onChange={onChangeDate}
              />
              <Button
                type="primary"
                style={{
                  width: "100%",
                }}
                onClick={onSubmitFilter}
              >
                Применить
              </Button>
            </div>
            <div className="publish-grid-wrap">
              <div className="publish-search">
                <Search
                  placeholder="Поиск..."
                  onSearch={onSearch}
                  value={search}
                  onChange={onChangeSearch}
                  className="publish-search__input"
                  style={{
                    width: "100%",
                  }}
                />
              </div>
              <div className="publish-grid publish-grid--two publish-item">
                {data &&
                  data?.pages[0]?.results.map(
                    ({ id, published_date, image, title, subcategory }) => (
                      <BlogItem
                        key={id}
                        id={id}
                        date={published_date}
                        image={image}
                        subcategory={subcategory}
                        title={title}
                        lng={lng}
                        link={link}
                      />
                    ),
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterviewClient;
