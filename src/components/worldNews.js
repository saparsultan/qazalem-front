import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ArrowLink from "@/components/arrowLink";
import BlogList from "@/components/blogList";
import { useQuery } from "@tanstack/react-query";
import NewsService from "@/services/NewsService";

const WorldNews = (props) => {
  const { data } = useQuery({
    queryKey: ["blogNewsWorld"],
    queryFn: async () => {
      const { data } = await NewsService.getNewsWorld();
      return data;
    },
  });
  return (
    <Tabs className="world-news-home__tabs-wrap">
      <div className="tab-list__tabs-wrap">
        <TabList className="tab-list__tabs">
          <Tab className="tab-list__tab">Спорт</Tab>
          <Tab className="tab-list__tab">Культура</Tab>
          <Tab className="tab-list__tab">Наука и технологий</Tab>
        </TabList>
        <div className="tab-list__link">
          <ArrowLink />
        </div>
      </div>
      <TabPanel>
        <BlogList data={data} />
      </TabPanel>
      <TabPanel>
        <BlogList data={data} />
      </TabPanel>
      <TabPanel>
        <BlogList data={data} />
      </TabPanel>
    </Tabs>
  );
};

export default WorldNews;
