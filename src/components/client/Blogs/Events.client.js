"use client";
import { DatePicker, Select, Input } from "antd";
const { RangePicker } = DatePicker;
import locale from "antd/es/date-picker/locale/ru_RU";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import NewsService from "@/services/NewsService";
import BlogItem from "@/components/client/Blogs/BlogItem";
import React, { useEffect, useState } from "react";
import {
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
} from "next/navigation";
import { log } from "next/dist/server/typescript/utils";
import * as dayjs from "dayjs";
const { Search } = Input;
import kk from "dayjs/locale/kk";
import UserService from "@/services/userService";

import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import AuthService from "@/services/AuthService";
import News from "@/components/news";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const EventsClient = ({ lng }) => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startEndDate, setStartEndDate] = useState([]);
  const [country, setCountry] = useState("");

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
      // const currentCountry = eventsCountry?.data.filter(
      //   (item) => item.id === countryQuery,
      // );
      // console.log({ currentCountry });
      setCountry(countryQuery);
    }
  }, [searchQuery, startDateQuery, endDateQuery, countryQuery]);

  const eventsCountry = useQuery({
    queryKey: ["eventsCountry"],
    queryFn: async () => {
      const { data } = await NewsService.getEventsCountry(lng);
      return data;
    },
    staleTime: Infinity,
  });

  // const dateQuery = startDateQuery

  const dateQuery = dayjs(new Date(startDateQuery));
  // .locale(kk)
  // .format("YYYY-MM-DD");

  const onSearch = (value) => {
    setSearch(value);
    router.push(`${pathname}?search=${search}`);
  };

  const onSubmitFilter = () => {
    router.push(
      `${pathname}?search=${search}&start_date=${startDate}&end_date=${endDate}&country=${country?.value}`,
    );
  };

  const { data } = useInfiniteQuery({
    queryKey: ["blogEvents", searchQuery, startDateQuery, endDateQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const getData = {
        event_date: startDateQuery,
        event_date_end: endDateQuery,
        type_of_event: "",
        countries: "",
        search: searchQuery,
        archive: "",
        limit: "",
        offset: pageParam,
        lang: lng,
      };
      const { data } = await NewsService.getEvents(getData);
      return data;
    },
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
  });

  const onChangeDate = (value) => {
    const startDateSrc = dayjs(new Date(value[0]))
      .locale(kk)
      .format("YYYY-MM-DD");
    const endDateSrc = dayjs(new Date(value[1]))
      .locale(kk)
      .format("YYYY-MM-DD");
    setStartDate(startDateSrc);
    setEndDate(endDateSrc);
    console.log({ value });
    setStartEndDate(value);
  };

  const onChangeCountry = (value, option) => {
    const data = {
      value,
      label: option?.label,
    };
    setCountry(data);
    console.log(`selected: ${value}, option: ${option.label}`);
  };

  return (
    <section className="section section--publish news-world__container">
      <div className="container">
        <div className="news-world">
          <h2 className="title title-left text-low title-h2 news-world__title">
            Анонс мероприятий
          </h2>
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
                value={{
                  value: country?.value,
                  label: country?.label,
                }}
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
                showSearch
                placeholder="Тип мероприятия"
                optionFilterProp="children"
                onSearch={onSearch}
                filterOption={filterOption}
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "lucy",
                    label: "Lucy",
                  },
                  {
                    value: "tom",
                    label: "Tom",
                  },
                ]}
              />
              <button onClick={onSubmitFilter}>Отправить</button>
            </div>
            <div className="publish-grid-wrap">
              <div className="publish-search">
                <Search
                  placeholder="Поиск..."
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
                {data &&
                  data?.pages[0]?.results.map(
                    ({
                      id,
                      event_date,
                      event_date_end,
                      image,
                      slug,
                      title_events,
                    }) => (
                      <BlogItem
                        key={id}
                        id={id}
                        event_date={event_date}
                        event_date_end={event_date_end}
                        image={image}
                        slug={slug}
                        title={title_events}
                        lng={lng}
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

export default EventsClient;
