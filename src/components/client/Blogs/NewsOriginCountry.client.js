"use client";
import { DatePicker, Select, Input, Button } from "antd";
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

const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log("search:", value);
};

// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const NewsOriginCountryClient = ({ lng }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [publishDate, setPublishDate] = useState("");
  const [startEndDate, setStartEndDate] = useState(null);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const link = `/${lng}/${LINK_URLS.news}`;

  const searchQuery =
    searchParams.get("search") && searchParams.get("search") !== null
      ? searchParams.get("search")
      : "";
  const publishDateQuery =
    searchParams.get("publish_date") &&
    searchParams.get("publish_date") !== null
      ? searchParams.get("publish_date")
      : "";
  const categoryQuery =
    searchParams.get("category") && searchParams.get("category") !== null
      ? searchParams.get("category")
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
    if (categoryQuery && categoryQuery !== "") {
      setCategory(+categoryQuery);
    }
  }, [searchQuery, categoryQuery]);

  const newsWorldCategory = useQuery({
    queryKey: ["newsOriginCountryCategory"],
    queryFn: async () => {
      const { data } = await NewsService.getNewsOriginCountryCategory(lng);
      return data;
    },
    staleTime: Infinity,
  });

  const { data } = useInfiniteQuery({
    queryKey: [
      "blogNewsOriginCountry",
      searchQuery,
      publishDateQuery,
      categoryQuery,
      lng,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      const datesArray = publishDateQuery.split(" ");
      const firstDate = datesArray ? datesArray[0] : "";
      const secondDate =
        datesArray && datesArray.length > 1 ? datesArray[1] : "";
      const getData = {
        subcategory: categoryQuery,
        published_date_start: firstDate,
        published_date_end: secondDate,
        search: searchQuery,
        limit: "",
        offset: "",
        lang: lng,
      };
      const { data } = await NewsService.getNewsOriginCountry(getData);
      return data;
    },
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
  });

  console.log({ newsWorldCategory });

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

  const onChangeCategory = (value) => {
    value && true && true && !isNaN(value)
      ? setCategory(value)
      : setCategory("");
  };

  const getCategoryLabel = (value) => {
    return (
      newsWorldCategory?.data?.length &&
      newsWorldCategory?.data?.filter((i) => i?.id === value)[0]?.name
    );
  };
  const onSubmitFilter = () => {
    router.push(
      `${pathname}?search=${search}&publish_date=${publishDate}&category=${category}`,
    );
  };
  const onSearch = (value) => {
    setSearch(value);
    if (publishDateQuery !== "" || categoryQuery !== "") {
      router.push(
        `${pathname}?search=${search}&publish_date=${publishDate}&category=${category}`,
      );
    } else {
      router.push(`${pathname}?search=${search}`);
    }
  };

  return (
    <section className="section section--publish news-world__container">
      <div className="container">
        <div className="news-world">
          <h2 className="title title-left text-low title-h2 news-world__title">
            Новости из Казахстана
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
                placeholder="Категория деятельности"
                value={
                  category && category !== ""
                    ? {
                        value: category,
                        label: getCategoryLabel(category),
                      }
                    : null
                }
                onChange={onChangeCategory}
                options={
                  newsWorldCategory?.data?.length &&
                  newsWorldCategory?.data.map(({ id, name }) => {
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
                Применить
              </Button>
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

export default NewsOriginCountryClient;
