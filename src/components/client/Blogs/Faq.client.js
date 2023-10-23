"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Select, Input, Button } from "antd";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/app/i18n/client";
import NewsService from "@/services/NewsService";

const { Search } = Input;
import { Collapse } from "antd";

const FaqClient = ({ lng }) => {
  const { t } = useTranslation(lng, "form");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [direction, setDirection] = useState("");
  const [search, setSearch] = useState("");

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

  return (
    <div className="publish publish--two">
      <div className="publish-filter publish-item">
        <Select
          allowClear
          placeholder={t("activityCategory")}
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
          {t("apply")}
        </Button>
      </div>
      <div className="publish-grid-wrap">
        <div className="publish-search">
          <Search
            placeholder={`${t("search")}...`}
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
            data?.pages[0]?.results.map(({ id, body_text, title }) => (
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
            ))}
        </div>
      </div>
    </div>
  );
};

export default FaqClient;
