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
import { Collapse } from "antd";
import parse from "html-react-parser";

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

const FaqClient = ({ lng }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [publishDate, setPublishDate] = useState("");
  const [startEndDate, setStartEndDate] = useState(null);
  const [direction, setDirection] = useState("");
  const [search, setSearch] = useState("");

  const link = `/${lng}/${LINK_URLS.news}/${LINK_URLS.world}`;

  const searchQuery =
    searchParams.get("search") && searchParams.get("search") !== null
      ? searchParams.get("search")
      : "";
  const directionQuery =
    searchParams.get("direction") && searchParams.get("direction") !== null
      ? searchParams.get("direction")
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
    if (directionQuery && directionQuery !== "") {
      setDirection(+directionQuery);
    }
  }, [searchQuery, directionQuery]);

  const faqDirection = useQuery({
    queryKey: ["faqDirection"],
    queryFn: async () => {
      const { data } = await NewsService.getFaqDirection(lng);
      return data;
    },
    staleTime: Infinity,
  });

  const { data } = useInfiniteQuery({
    queryKey: ["blogFaq", searchQuery, directionQuery, lng],
    queryFn: async ({ pageParam = 0 }) => {
      const getData = {
        direction: directionQuery,
        search: searchQuery,
        published_date: "",
        limit: "",
        offset: "",
        lang: lng,
      };
      const { data } = await NewsService.getFaq(getData);
      return data;
    },
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
  });

  const onChangeDirection = (value) => {
    value && true && true && !isNaN(value)
      ? setDirection(value)
      : setDirection("");
  };

  const getDirectionLabel = (value) => {
    return (
      faqDirection?.data?.length &&
      faqDirection?.data?.filter((i) => i?.id === value)[0]?.name
    );
  };
  const onSubmitFilter = () => {
    router.push(`${pathname}?search=${search}&direction=${direction}`);
  };
  const onSearch = (value) => {
    setSearch(value);
    if (directionQuery !== "") {
      router.push(`${pathname}?search=${search}&direction=${direction}`);
    } else {
      router.push(`${pathname}?search=${search}`);
    }
  };

  console.log("direction", data);

  return (
    <section className="section section--publish faq__container">
      <div className="container">
        <div className="faq">
          <h2 className="title title-left text-low title-h2 publish__title">
            Информационная поддержка
          </h2>
          <p className="publish__desc">
            Уважаемые кандасы! Если вы планируете переехать в Казахстан, мы
            готовы оказать вам информационную поддержку! Ниже вы можете
            ознакомиться с информацией о миграционных процессах в Республике
            Казахстан, правилах и законодательстве, мерах государственной
            поддержки, получении образования и других условиях репатриации. Если
            у вас есть дополнительные вопросы, обращайтесь по телефону
            +77010001404 (whatsapp, telegram).
          </p>
          <div className="publish publish--two">
            <div className="publish-filter publish-item">
              <Select
                allowClear
                placeholder="Категория деятельности"
                value={
                  direction && direction !== ""
                    ? {
                        value: direction,
                        label: getDirectionLabel(direction),
                      }
                    : null
                }
                onChange={onChangeDirection}
                options={
                  faqDirection?.data?.length &&
                  faqDirection?.data.map(({ id, name }) => {
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
              <div className="publish-grid publish-grid--one nogap publish-item">
                {data &&
                  data?.pages[0]?.results.map(
                    ({ id, published_date, body_text, title }) => (
                      <Collapse
                        key={id}
                        size="large"
                        defaultActiveKey={["1"]}
                        items={[
                          {
                            key: id,
                            label: title,
                            children: (
                              <div
                                dangerouslySetInnerHTML={{ __html: body_text }}
                                className="inner-html"
                              />
                            ),
                          },
                        ]}
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

export default FaqClient;

export const YourComponent = (htmlContent) => {
  const handleNode = (node) => {
    if (node.name === "iframe") {
      const iframeSrc = node.attribs.src;
      console.log("Found iframe src:", iframeSrc);
      return iframeSrc;
    }
    return null; // Returning null to prevent rendering this node
  };

  return <div>{parse(htmlContent, { replace: handleNode })}</div>;
};
