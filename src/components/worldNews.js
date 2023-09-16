import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ArrowLink from "@/components/arrowLink";
import BlogList from "@/components/blogList";

const WorldNews = (props) => (
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
      <BlogList />
    </TabPanel>
    <TabPanel>
      <BlogList />
    </TabPanel>
    <TabPanel>
      <BlogList />
    </TabPanel>
  </Tabs>
);

export default WorldNews;
