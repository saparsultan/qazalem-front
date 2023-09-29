import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ArrowLink from "@/components/arrowLink";
import BlogList from "@/components/blogList";
import NewsService from "@/services/NewsService";
import Link from "next/link";
import { LINK_URLS } from "@/utils/constants";

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

  const { data } = useInfiniteQuery({
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
        <BlogList data={data?.pages[0]} link={link} />
      </TabPanel>
      {newsWorldCategory?.data?.length &&
        newsWorldCategory.data.map(({ id }) => {
          return (
            <TabPanel key={id}>
              <BlogList data={data?.pages[0]} link={link} />
            </TabPanel>
          );
        })}
    </Tabs>
  );
};

export default NewsWorldHome;
