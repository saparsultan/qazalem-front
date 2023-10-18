"use client";
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import BlogList from "@/components/layout/BlogList";
import NewsService from "@/services/NewsService";
import { LINK_URLS } from "@/utils/constants";
import MoreLink from "@/components/layout/MoreLink";
import { useTranslation } from "@/app/i18n/client";

const InterviewHome = ({ lng }) => {
  const { t } = useTranslation(lng, "home");
  const link = `/${lng}/${LINK_URLS.interview}`;

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
    <>
      <BlogList
        data={data?.pages[0]}
        isLoading={isLoading}
        isSuccess={isSuccess}
        link={link}
      />
      <MoreLink
        link="https://www.gov.kz/memleket/entities/qazalem/activities/30461"
        target
      >
        {t("allInterview")}
      </MoreLink>
    </>
  );
};

export default InterviewHome;
