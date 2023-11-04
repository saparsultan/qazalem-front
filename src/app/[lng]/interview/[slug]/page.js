"use client";
import { useParams } from "next/navigation";
import { Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/app/i18n/client";
import NewsService from "@/services/NewsService";
import { LINK_URLS } from "@/utils/constants";
import BlogContentPageClient from "@/components/client/Blogs/BlogContentPage.client";
import LatestBlogsAside from "@/components/client/Blogs/LatestBlogsAside";

const InterviewPage = ({ params: { lng } }) => {
  const { t } = useTranslation(lng, "default");
  const { slug } = useParams();
  const link = LINK_URLS.interview;

  const { data, isLoading } = useQuery({
    queryKey: ["oneInterview"],
    queryFn: async ({ signal }) => {
      const { data } = await NewsService.getOneInterview(slug, lng, signal);
      return data;
    },
  });

  const latestBlogs = useQuery({
    queryKey: ["blogInterviewLatest"],
    queryFn: async ({ signal }) => {
      const getData = {
        published_date_start: "",
        published_date_end: "",
        search: "",
        page: 1,
        page_size: 5,
        lang: lng,
      };
      const { data } = await NewsService.getInterview(getData);
      return data;
    },
  });

  return (
    <>
      <section className="section publdet__container">
        <div className="container">
          <div className="publdet">
            <h2 className="title title-left title-h2 text-low bold publdet__title">
              {isLoading ? (
                <Skeleton
                  paragraph={{
                    rows: 1,
                    width: "100%",
                  }}
                  active
                  round
                />
              ) : (
                data?.title
              )}
            </h2>
            <div className="publdet-wrap">
              <BlogContentPageClient data={data} lng={lng} />
              <aside className="publdet-aside">
                <div className="publdet-aside-wrapper">
                  <h3 className="title title-h3 sm-bold publdet-aside__title">
                    {t("latestInterview")}
                  </h3>
                  <LatestBlogsAside data={latestBlogs} link={link} lng={lng} />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InterviewPage;
