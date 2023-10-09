"use client";
import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ArrowLink from "@/components/arrowLink";
import BlogList from "@/components/layout/BlogList";
import NewsService from "@/services/NewsService";
import Link from "next/link";
import { LINK_URLS } from "@/utils/constants";
import { Skeleton } from "antd";
import MoreLink from "@/components/layout/MoreLink";

const NewsWorldHome = ({ lng }) => {
  const [category, setCategory] = useState("");

  const link = `/${lng}/${LINK_URLS.news}/${LINK_URLS.world}`;

  const newsWorldCategory = useQuery({
    queryKey: ["newsWorldCategory"],
    queryFn: async () => {
      const { data } = await NewsService.getNewsWorldCategory(lng);
      return data;
    },
    staleTime: Infinity,
  });

  const { data, isLoading, isSuccess } = useInfiniteQuery({
    queryKey: ["blogNewsWorld", category, lng],
    queryFn: async ({ limit = 4 }) => {
      const getData = {
        lang: lng,
        subcategory: category,
        published_date: "",
        search: "",
        limit,
        offset: "",
      };
      const { data } = await NewsService.getNewsWorld(getData);
      return data;
    },
  });

  return (
    <>
      <Tabs className="world-news-home__tabs-wrap">
        <div className="tab-list__tabs-wrap">
          <TabList className="tab-list__tabs">
            <Tab className="tab-list__tab" onClick={() => setCategory("")}>
              Все
            </Tab>
            {newsWorldCategory?.data?.length &&
              newsWorldCategory.data.map(({ id, name }) => {
                return (
                  <Tab
                    className="tab-list__tab"
                    key={id}
                    onClick={() => setCategory(id)}
                  >
                    {name}
                  </Tab>
                );
              })}
          </TabList>
          <Link href={link} className="tab-list__link">
            <ArrowLink />
          </Link>
        </div>
        <TabPanel key="default">
          {!isLoading && isSuccess && data?.pages[0]?.results.length > 0 ? (
            <BlogList
              data={data?.pages[0]}
              isLoading={isLoading}
              isSuccess={isSuccess}
              link={link}
            />
          ) : (
            <div className="blog-list">
              {Array(4)
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
          )}
        </TabPanel>
        {newsWorldCategory?.data?.length &&
          newsWorldCategory.data.map(({ id }) => {
            return (
              <TabPanel key={id}>
                <BlogList
                  data={data?.pages[0]}
                  isLoading={isLoading}
                  isSuccess={isSuccess}
                  link={link}
                />
              </TabPanel>
            );
          })}
      </Tabs>
      <MoreLink
        clasName="more-link__mobile"
        link="https://www.gov.kz/memleket/entities/qazalem/activities/30461"
        target
      >
        Все новости
      </MoreLink>
    </>
  );
};

export default NewsWorldHome;
