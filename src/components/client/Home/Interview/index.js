"use client";
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import BlogList from "@/components/layout/BlogList";
import NewsService from "@/services/NewsService";
import { LINK_URLS } from "@/utils/constants";

const InterviewHome = ({ lng }) => {
  const link = `/${lng}/${LINK_URLS.news}/${LINK_URLS.world}`;

  const { data, isLoading, isSuccess } = useInfiniteQuery({
    queryKey: ["blogInterview", lng],
    queryFn: async ({ limit = 4 }) => {
      const getData = {
        lang: lng,
        published_date_start: "",
        published_date_end: "",
        search: "",
        limit,
        offset: "",
      };
      const { data } = await NewsService.getInterview(getData);
      return data;
    },
  });

  console.log({ data });

  return (
    <BlogList
      data={data?.pages[0]}
      isLoading={isLoading}
      isSuccess={isSuccess}
      link={link}
    />
  );
};

export default InterviewHome;